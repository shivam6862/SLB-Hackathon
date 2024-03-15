const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const header = require("./pdf/header");
const language = require("./pdf/language");

module.exports = getPdf = async (pdfid, pdfDatas) => {
  try {
    const pdfFile = pdfid + ".pdf";
    const pdfFilePath = path.join("src", "uploads", pdfFile);
    const pdfDoc = new PDFDocument();
    pdfDoc.pipe(fs.createWriteStream(pdfFilePath));

    const margin = 25;
    pdfDoc.page.margins.left = margin;
    pdfDoc.page.margins.right = margin;
    pdfDoc.page.margins.top = margin * 1.5;
    pdfDoc.page.margins.bottom = margin;
    pdfDoc.font("Helvetica");

    header("SLB HACKTHON", pdfDoc);
    pdfDoc.fontSize(12).moveDown(1);

    pdfDatas.forEach((item, index) => {
      if (index > 0) {
        pdfDoc.addPage();
      }
      language(item, pdfDoc, index + 1);
    });

    pdfDoc.end();
    return pdfDatas;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};
