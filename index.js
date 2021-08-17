const { pdfmakeEnhancedInvoicePdf, pdfmakeIHIOUInvoicePdf, pdfmakeTestPdf } = require('./src/pdfmake');
const { pdfkitTestPdf } = require('./src/pdfkit');

try {
  pdfmakeIHIOUInvoicePdf();
  // pdfmakeEnhancedInvoicePdf();
  // pdfkitTestPdf();
} catch (error) {
  console.log(error);
}
