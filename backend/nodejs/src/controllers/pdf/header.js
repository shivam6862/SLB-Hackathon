module.exports = header = (heading, pdfDoc) => {
  pdfDoc
    .font("Helvetica", 900)
    .fontSize(28)
    .text(heading, pdfDoc.page.margins.left, pdfDoc.y, {
      align: "center",
    });
};
