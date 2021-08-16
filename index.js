const { pdfmakeReportPdf, pdfmakeTestPdf } = require('./src/pdfmake');
const { pdfkitTestPdf } = require('./src/pdfkit');

try {
  pdfmakeReportPdf();
  // pdfkitTestPdf();
} catch (error) {
  console.log(error);
}
