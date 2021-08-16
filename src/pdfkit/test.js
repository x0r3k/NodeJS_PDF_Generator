const PDFDocument = require('pdfkit');
const doc = new PDFDocument({ autoFirstPage: false });
const fs = require('fs');

const defaultOptions = {
  margins: { top: 10, left: 50, right: 100, bottom: 10 },
  size: 'A4',
  layout: 'landscape'
};

doc.addPage(defaultOptions);

function generateTestPdf() {
  doc.pipe(fs.createWriteStream(`static/pdfkit/pdfkit_test.pdf`)); // write to PDF
  doc.end();
}

module.exports = generateTestPdf;