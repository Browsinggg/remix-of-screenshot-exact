# Connecting #SaRang to Google Sheets

Both forms on the website (RSVP and Leave a Memory) save into
**one private Google Spreadsheet** through a small Google Apps Script. Until these steps
are done, the forms politely tell guests that submissions open soon — nothing is lost
or faked.

## 1. Create the spreadsheet
1. Go to <https://sheets.google.com> (use the family's Google account) → **Blank spreadsheet**.
2. Rename it **#SaRang – Wedding Guest Management**.

## 2. Add the script
1. In the spreadsheet: **Extensions → Apps Script**.
2. Delete everything in `Code.gs`, then paste the full contents of `docs/apps-script/Code.gs`.
3. Click 💾 **Save**.

## 3. Create the tabs automatically
1. In the Apps Script toolbar choose the function **setupSheets** and click **▶ Run**.
2. Approve the permissions Google asks for (it is your own script).
3. Back in the spreadsheet you will now see 3 tabs with headings:
   RSVP Responses · Function Attendance · Memories with Couple.

## 4. Choose a shared secret
1. Make up a long random password (e.g. 30+ letters and numbers). Keep it private.
2. In Apps Script: **⚙ Project Settings → Script properties → Add script property**
   - Property: `SHARED_SECRET`
   - Value: your secret

## 5. Deploy as a web app
1. **Deploy → New deployment → ⚙ → Web app**.
2. Execute as: **Me**. Who has access: **Anyone**.
   (Safe: the script refuses any request without your secret.)
3. Click **Deploy** and copy the **Web app URL** (ends with `/exec`).

## 6. Tell the website
In Lovable, ask: *"Add my Apps Script secrets"* and provide:
- `APPS_SCRIPT_URL` – the Web app URL from step 5
- `APPS_SCRIPT_SECRET` – the same secret from step 4

These are stored securely on the server and are never visible on the website.

## 7. Test each form
| Form | Where | Check in the spreadsheet |
|---|---|---|
| RSVP | /rsvp | New row in **RSVP Responses**, 3 rows in **Function Attendance** |
| Memory | /memories | New row in **Memories with Couple** |

Delete your test rows afterwards.

## Updating the script later
After editing `Code.gs`: **Deploy → Manage deployments → ✏ Edit → Version: New version → Deploy**.
The URL stays the same.
