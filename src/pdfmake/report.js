const PdfMakerBuilder = require('pdfmake');
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

const pdfMaker = new PdfMakerBuilder(fonts);

pdfMaker.tableLayouts = {
  formTableLayout: {
    hLineWidth: function (i, node) {
      return (i === 0 || i === 1 || i === node.table.body.length) ? 1 : 0;
    },
    vLineWidth: function (i, node) {
      return (i === 0 || i === node.table.widths.length) ? 1 : 0;
    },
    // hLineColor: function (i, node) {
    //   return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
    // },
    // vLineColor: function (i, node) {
    //   return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
    // },
    // hLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
    // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
    // paddingLeft: function(i, node) { return 4; },
    // paddingRight: function(i, node) { return 4; },
    // paddingTop: function(i, node) { return 2; },
    // paddingBottom: function(i, node) { return 2; },
    fillColor: function (rowIndex, node, columnIndex) { 
      return (rowIndex === 0) ? '#b4e9f0' : 'white'
    }
  }
};


const docDefinition = {
  pageMargins: 20,
  content: [
    // HEADER
      // image is out of first column because image cant have percent width
      // percent width required for centering "Division" text
    {
      image: 'depart_logo',
      width: 100,
      absolutePosition: { x: 20, y: 20 }
    },
    {
      columns: [
        {
          width: '20%',
          text: '',
        },
        {
          alignment: 'center',
          width: '60%',
          text: [
            'Division of Financial Operation',
            '\nNon Public School Payables',
            '\n65 Court Street, Room 1001',
            '\nBrooklyn, NY 11201'
          ]
        },
        {
          alignment: 'right',
          width: '20%',
          text: [
            { text: 'Enhanced', alignment: 'center'},
            { text: '\nRate', alignment: 'center'},
            { text: '\nSETSS', alignment: 'center'},
          ]
        },
      ]
    },

    // TABLES
      // FIRST TABLE
    {
			style: 'tableExample',
			table: {
        headerRows: 1,
        widths: ['*'],
				body: [
          // heading
					[
            {
              text: 'Provider Information',
              style: 'tableHeader',
              // colSpan: 2,
              alignment: 'center',
            },
            // {}
          ],
          // row 1
					[
            { 
              columns: [
                { 
                  width: '50%',
                  columns: [
                    { 
                      width: '40%',
                      text: 'Providers Name:'
                    },
                    { 
                      width: '60%',
                      text: 'Hello world',
                    },
                  ]
                },
                { 
                  width: '50%',
                  columns: [
                    { 
                      width: '40%',
                      text: 'Social Security#:'
                    },
                    { 
                      width: '60%',
                      text: 'Hello world',
                    }
                  ]
                },
              ],
              border: [true, false, true, false]
            }
          ], 
          // row 2
          [
            { 
              columns: [
                { 
                  width: '20%',
                  text: 'Address:'
                },
                { 
                  width: '80%',
                  text: 'Hello world',
                },
              ],
              border: [true, false, true, false]
            }
          ],
          // row 3
          [
            { 
              columns: [
                { 
                  width: '50%',
                  columns: [
                    { 
                      width: '40%',
                      text: 'Telephone#:'
                    },
                    { 
                      width: '60%',
                      text: 'Hello world',
                    },
                  ]
                },
                { 
                  width: '50%',
                  columns: [
                    { 
                      width: '40%',
                      text: 'E-Mail Address:'
                    },
                    { 
                      width: '*',
                      text: 'Hello world',
                    }
                  ]
                },
              ],
              border: [true, false, true, true]
            }
          ]
				]
			}
		},
      // SECOND TABLE
    {
      style: 'tableExample',
      table: {
        headerRows: 1,
        widths: ['*'],
        body: [
          // table heading
          [
            {
              text: 'Student Information',
              alignment: 'center'
            },
          ],
          // row 1
          [
            { 
              columns: [
                { 
                  width: '50%',
                  columns: [
                    { 
                      width: '40%',
                      text: 'Students Name:'
                    },
                    { 
                      width: '60%',
                      text: 'GREENBAUM SARA',
                    },
                  ]
                },
                { 
                  width: '25%',
                  columns: [
                    { 
                      width: '50%',
                      text: 'Date of Birth:'
                    },
                    { 
                      width: '50%',
                      text: '2008-11-11',
                    }
                  ]
                },
                { 
                  width: '25%',
                  columns: [
                    { 
                      width: '35%',
                      text: 'NYC ID#:'
                    },
                    { 
                      width: '65%',
                      text: '043935868',
                    }
                  ]
                },
              ],
            }
          ], 
          // row 2
          [
            { 
              columns: [
                { 
                  width: '30%',
                  columns: [
                    { 
                      width: '50%',
                      text: 'Service District:'
                    },
                    { 
                      width: '50%',
                      text: '',
                    },
                  ]
                },
                { 
                  width: '20%',
                  columns: [
                    { 
                      width: '70%',
                      text: 'Frequency:'
                    },
                    { 
                      width: '30%',
                      text: '11',
                    }
                  ]
                },
                { 
                  width: '20%',
                  columns: [
                    { 
                      width: '60%',
                      text: 'Duration:'
                    },
                    { 
                      width: '40%',
                      text: '60',
                    },
                  ]
                },
                { 
                  width: '30%',
                  columns: [
                    { 
                      width: '50%',
                      text: 'Hourly Rate:'
                    },
                    { 
                      width: '50%',
                      text: '',
                    }
                  ]
                },
              ],
            }
          ], 
        ]
      },
      layout: pdfMaker.tableLayouts.formTableLayout
    },
    // UNDERLINES FOR FIRST FORM
    { 
      absolutePosition: {x: 0, y: 0},
      canvas: [
        {
          type: 'line',
          x1: 125, y1: 135,
          x2: 290, y2: 135,
          lineWidth: 1
        },
        {
          type: 'line',
          x1: 400, y1: 135,
          x2: 565, y2: 135,
          lineWidth: 1
        },
        {
          type: 'line',
          x1: 125, y1: 156,
          x2: 565, y2: 156,
          lineWidth: 1
        },
        {
          type: 'line',
          x1: 125, y1: 178,
          x2: 290, y2: 178,
          lineWidth: 1
        },
        {
          type: 'line',
          x1: 400, y1: 178,
          x2: 565, y2: 178,
          lineWidth: 1
        },
      ]
    }
  ],
  // IMAGES ROUTES
  images: { 
    depart_logo: 'static/images/depart_logo.png',
    underline: 'static/images/underline.png',
  },
  // PDF REUSABLE STYLES
  styles: {
    // TABLE STYLES
    // WHOLE TABLE MARGINS
    tableExample: {
			margin: [0, 5, 0, 15],
      fontSize: 10,
		},
    // TABLE HEADING STYLES 
    tableHeader: {
			bold: true,
			fontSize: 13,
			color: 'black',
      background: '#b4e9f0',
      fillColor: '#b4e9f0',
		},
  },
  // PDF DEFAULT STYLES
  defaultStyle: {
    font: 'Poppins'
  },
};

const options = {
  // ...
}

function generateTestPdf() {
  const pdfDoc = pdfMaker.createPdfKitDocument(docDefinition, options);
  pdfDoc.pipe(fs.createWriteStream(`static/pdfmake/pdfmake_report.pdf`));
  pdfDoc.end();
}

module.exports = generateTestPdf;

