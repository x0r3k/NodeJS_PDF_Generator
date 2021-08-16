const PdfMaker = require('pdfmake');
const fs = require('fs');
const path = require('path');

var fonts = {
  Courier: {
    normal: 'Courier',
    bold: 'Courier-Bold',
    italics: 'Courier-Oblique',
    bolditalics: 'Courier-BoldOblique'
  },
  Helvetica: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique'
  },
  Poppins: { // custom font from /fonts
    normal: 'fonts/Poppins-Regular.ttf',
    bold: 'fonts/Poppins-Bold.ttf',
    italics: 'fonts/Poppins-Italic.ttf',
    bolditalics: 'fonts/Poppins-BoldItalic.ttf',
  }
};

const printer = new PdfMaker(fonts);



const docDefinition = {
  
  content: [
    {
      
      layout: 'lightHorizontalLines', // optional
      table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 3,
        widths: [ '*', 'auto', 100, '*' ],

        body: [
          [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
          [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ],
          [ 'First', 'Second', 'Third', 'The last one' ],
          [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
          [ 'First', 'Second', 'Third', 'The last one' ],
          [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
        ]
      },
      pageBreak: 'after'
    },
    {
      margin: [5,5],
      text: 'Hello world'
    }
  ],
  defaultStyle: {
    font: 'Poppins'
  }
};

const options = {
  // ...
}

function generateTestPdf() {
  const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
  pdfDoc.pipe(fs.createWriteStream(`static/pdfmake/pdfmake_test.pdf`));
  pdfDoc.end();
}

module.exports = generateTestPdf;

