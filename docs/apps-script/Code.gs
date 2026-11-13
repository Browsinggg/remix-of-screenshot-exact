/**
 * #SaRang – Wedding Guest Management · Google Apps Script
 * --------------------------------------------------------
 * Paste this whole file into Extensions → Apps Script of the spreadsheet
 * "#SaRang – Wedding Guest Management". See docs/google-sheets-setup.md.
 *
 * Script property required (Project Settings → Script properties):
 *   SHARED_SECRET = the same value saved as APPS_SCRIPT_SECRET in Lovable.
 */

var TZ = 'Asia/Kolkata';

var TABS = {
  rsvp: 'RSVP Responses',
  functions: 'Function Attendance',
  memories: 'Memories with Couple',
};

var HEADERS = {
  'RSVP Responses': ['Submission timestamp', 'Guest name', 'Family name', 'Contact number', 'Adult count', 'Child count', 'Total attendees', 'RSVP status', 'Submission ID'],
  'Function Attendance': ['Guest name', 'Family name', 'Function name', 'Attendance status', 'Number of attendees', 'Submission ID'],
  'Memories with Couple': ['Submission timestamp', 'Guest name', 'Favourite memory/message', 'Submission ID'],
};

var FUNCTION_NAMES = { 'sagai-sangeet': 'Sagai & Sangeet', 'haldi': 'Haldi', 'wedding': 'Wedding' };

/** Run this ONCE from the editor (▶ Run → setupSheets) to create every tab with headings. */
function setupSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(HEADERS).forEach(function (name) {
    var sh = ss.getSheetByName(name) || ss.insertSheet(name);
    sh.getRange(1, 1, 1, HEADERS[name].length).setValues([HEADERS[name]]).setFontWeight('bold');
    sh.setFrozenRows(1);
  });
}

function nowIST() {
  return Utilities.formatDate(new Date(), TZ, 'dd MMM yyyy, hh:mm:ss a');
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function sheet(name) {
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  if (!sh) throw new Error('Missing tab: ' + name + ' — run setupSheets() first.');
  return sh;
}

function str(v, max) {
  var s = (v === undefined || v === null) ? '' : String(v).trim();
  return s.slice(0, max || 500);
}

/** True if this submission ID was already written to the given tab/column. */
function alreadySaved(tabName, colIndex, id) {
  if (!id) return false;
  var sh = sheet(tabName);
  var last = sh.getLastRow();
  if (last < 2) return false;
  var ids = sh.getRange(2, colIndex, last - 1, 1).getValues();
  for (var i = 0; i < ids.length; i++) if (ids[i][0] === id) return true;
  return false;
}

function doGet() {
  return json({ ok: true, message: '#SaRang Apps Script is running.' });
}

function doPost(e) {
  var body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return json({ ok: false, code: 'invalid', message: 'Invalid request.' });
  }

  var secret = PropertiesService.getScriptProperties().getProperty('SHARED_SECRET');
  if (!secret || body.secret !== secret) {
    return json({ ok: false, code: 'failed', message: 'Not authorised.' });
  }

  var lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) {
    return json({ ok: false, code: 'failed', message: 'The server is busy. Please try again in a moment.' });
  }
  try {
    var p = body.payload || {};
    switch (body.action) {
      case 'rsvp': return json(saveRsvp(p));
      case 'memory': return json(saveMemory(p));
      default: return json({ ok: false, code: 'invalid', message: 'Unknown action.' });
    }
  } catch (err) {
    console.error(err);
    return json({ ok: false, code: 'failed', message: 'Could not save. Please try again.' });
  } finally {
    lock.releaseLock();
  }
}

function saveRsvp(p) {
  var id = str(p.submissionId, 64);
  var name = str(p.guestName, 80), fam = str(p.familyName, 80);
  if (!id || !name || !fam || !str(p.contact, 20)) return { ok: false, code: 'invalid', message: 'Please fill in all required fields.' };
  if (alreadySaved(TABS.rsvp, 9, id)) return { ok: false, code: 'duplicate', message: 'Your RSVP was already received — thank you!' };

  var attending = p.attending === 'yes';
  var adults = Math.max(0, parseInt(p.adults, 10) || 0);
  var children = Math.max(0, parseInt(p.children, 10) || 0);
  var total = attending ? adults + children : 0;

  sheet(TABS.rsvp).appendRow([nowIST(), name, fam, "'" + str(p.contact, 20), adults, children, total, attending ? 'Attending' : 'Not attending', id]);

  var chosen = Array.isArray(p.functions) ? p.functions : [];
  var fnRows = Object.keys(FUNCTION_NAMES).map(function (fid) {
    var yes = attending && chosen.indexOf(fid) !== -1;
    return [name, fam, FUNCTION_NAMES[fid], yes ? 'Attending' : 'Not attending', yes ? total : 0, id];
  });
  var fs = sheet(TABS.functions);
  fs.getRange(fs.getLastRow() + 1, 1, fnRows.length, fnRows[0].length).setValues(fnRows);

  return { ok: true };
}

function saveMemory(p) {
  var id = str(p.submissionId, 64);
  var name = str(p.guestName, 80), msg = str(p.message, 2000);
  if (!id || !name || !msg) return { ok: false, code: 'invalid', message: 'Please add your name and a message.' };
  if (alreadySaved(TABS.memories, 4, id)) return { ok: false, code: 'duplicate', message: 'Your memory was already received.' };
  sheet(TABS.memories).appendRow([nowIST(), name, msg, id]);
  return { ok: true };
}
