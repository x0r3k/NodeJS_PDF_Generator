const pdfmakeEnhancedInvoicePdf = require('./enhancedInvoice');
const pdfmakeIHIOUInvoicePdf = require('./ihiouInvoice');
const pdfmakeTestPdf = require('./test');

module.exports = {
  pdfmakeTestPdf,
  pdfmakeEnhancedInvoicePdf,
  pdfmakeIHIOUInvoicePdf
};
