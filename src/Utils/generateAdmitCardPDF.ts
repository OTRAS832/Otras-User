import jsPDF from "jspdf";

export const generateAdmitCardPDF = async (card: any) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Admit Card", 85, 20);
  doc.setFontSize(12);

  const yStart = 40;
  const lineHeight = 10;

  const details = [
    ["Candidate Name", card.candidateName],
    ["Father’s Name", card.fatherName],
    ["Gender", card.gender === "M" ? "Male" : "Female"],
    ["Date of Birth", card.dateOfBirth],
    ["Exam Roll No", card.examRollNo],
    ["Exam Center", card.examCenter],
    ["College Name", card.collegeName],
    ["University", card.universityName],
    ["Job Post", card.jobPostName],
    ["Vacancy Name", card.vacancyName],
    ["OTR ID", card.otrasId],
  ];

  details.forEach(([label, value], index) => {
    doc.text(`${label}:`, 20, yStart + index * lineHeight);
    doc.text(`${value || "N/A"}`, 90, yStart + index * lineHeight);
  });

  doc.save(`${card.candidateName || "AdmitCard"}.pdf`);
};
