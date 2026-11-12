import { events, family, wedding } from "@/config/wedding";

/** Builds the itinerary PDF in the browser from the central config, then downloads it. */
export async function downloadItineraryPdf() {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const espresso: [number, number, number] = [74, 59, 50];
  const rose: [number, number, number] = [163, 74, 94];
  const gold: [number, number, number] = [197, 160, 89];

  doc.setFillColor(250, 244, 235);
  doc.rect(0, 0, W, H, "F");
  doc.setDrawColor(...gold);
  doc.setLineWidth(1.2);
  doc.rect(24, 24, W - 48, H - 48);
  doc.setLineWidth(0.5);
  doc.rect(32, 32, W - 64, H - 64);

  let y = 90;
  doc.setFont("times", "italic");
  doc.setTextColor(...rose);
  doc.setFontSize(34);
  doc.text(wedding.hashtag, W / 2, y, { align: "center" });
  y += 36;
  doc.setFont("times", "normal");
  doc.setTextColor(...espresso);
  doc.setFontSize(22);
  doc.text(`${wedding.bride} & ${wedding.groom}`, W / 2, y, { align: "center" });
  y += 22;
  doc.setFontSize(11);
  doc.text("WEDDING ITINERARY  ·  ALL TIMES IN IST", W / 2, y, { align: "center" });
  y += 18;
  doc.setDrawColor(...gold);
  doc.line(W / 2 - 80, y, W / 2 + 80, y);
  y += 40;

  for (const e of events) {
    doc.setFont("times", "bold");
    doc.setTextColor(...rose);
    doc.setFontSize(18);
    doc.text(e.name, 70, y);
    doc.setFont("times", "normal");
    doc.setTextColor(...espresso);
    doc.setFontSize(12);
    doc.text(`${e.dayLabel}, ${e.dateLabel}`, W - 70, y, { align: "right" });
    y += 20;
    for (const t of e.timings) {
      doc.text(`${t.label}  —  ${t.time}`, 70, y);
      y += 16;
    }
    doc.text(`Venue: ${e.venueName}, ${e.venueArea}`, 70, y);
    y += 16;
    doc.setFont("times", "italic");
    const lines = doc.splitTextToSize(e.description, W - 140);
    doc.text(lines, 70, y);
    y += lines.length * 14 + 22;
    doc.setDrawColor(...gold);
    doc.line(70, y - 12, W - 70, y - 12);
    y += 14;
  }

  y += 10;
  doc.setFont("times", "normal");
  doc.setFontSize(10);
  doc.text("WITH BEST COMPLIMENTS FROM", W / 2, y, { align: "center" });
  y += 18;
  doc.setFontSize(16);
  doc.setTextColor(...rose);
  doc.text(family.compliments, W / 2, y, { align: "center" });

  doc.save("SaRang-Wedding-Itinerary.pdf");
}
