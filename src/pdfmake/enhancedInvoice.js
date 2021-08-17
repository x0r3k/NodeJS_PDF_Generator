const PdfMakerBuilder = require('pdfmake');
const fs = require('fs');
const path = require('path');

const fonts = {
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

const certificationText = {
  provider: 'I hereby certify that I have provided related services on the dates ' + 
  'for the duration indicated herein. I understand that when completed and filed, ' + 
  'this for, becomes a record of the Board of Education and that any material ' + 
  'mirepresentation may subject me to criminal, civil and/or administrative action.',
  responsible: 'By my signature I acknowledge that I hhave reviewed this Related ' + 
  'Service billing form and that, to the best of my knowledge, these sessions were ' + 
  'provided as indicated.'
}

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
  },
  nestedTableLayout: {
    hLineWidth: function (i, node) {
      return (i === 0 || i === node.table.body.length) ? 0 : 2;
    },
    vLineWidth: function (i, node) {
      return (i === 0 || i === node.table.widths.length) ? 0 : 2;
    },
    hLineColor: function (i, node) {
      return '#ababab';
    },
    vLineColor: function (i, node) {
      return '#ababab';
    },
    // hLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
    // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
    // paddingLeft: function(i, node) { return 4; },
    // paddingRight: function(i, node) { return 4; },
    // paddingTop: function(i, node) { return 2; },
    // paddingBottom: function(i, node) { return 2; },
  },
  certificationTableLayout: {
    hLineWidth: function (i, node) {
      return (i === 0 || i === 1 || i === node.table.body.length - 1 || i === node.table.body.length) ? 1 : 0;
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
  },
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
              alignment: 'center',
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
                      width: '35%',
                      text: 'Providers Name:'
                    },
                    { 
                      width: '65%',
                      text: 'Hello world',
                    },
                  ]
                },
                { 
                  width: '50%',
                  columns: [
                    { 
                      width: '35%',
                      text: 'Social Security#:'
                    },
                    { 
                      width: '65%',
                      text: 'Hello world',
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
                  width: '20%',
                  text: 'Address:'
                },
                { 
                  width: '80%',
                  text: 'Hello world',
                },
              ],
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
            }
          ]
				]
			},
      layout: pdfMaker.tableLayouts.formTableLayout
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
                      width: '35%',
                      text: 'Students Name:'
                    },
                    { 
                      width: '65%',
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
      // THIRD TABLE
    {
      style: 'tableExample',
      table: {
        headerRows: 1,
        widths: ['*'],
        body: [
          // table heading
          [
            {
              text: 'Agency Information',
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
                      width: '30%',
                      text: 'Agency Name:'
                    },
                    { 
                      width: '65%',
                      text: 'CHILDRENS LEARNING LADDERS CORP',
                    },
                  ]
                },
                { 
                  width: '50%',
                  columns: [
                    { 
                      width: '35%',
                      text: 'Federal Tax ID#:'
                    },
                    { 
                      width: '65%',
                      text: 'tax id number 123-456-789',
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
                  width: '15%',
                  text: 'Address:'
                },
                { 
                  width: '85%',
                  text: 'Hello world',
                },
              ],
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
                      width: '30%',
                      text: 'Telephone#:'
                    },
                    { 
                      width: '65%',
                      text: 'xxxx-xxx-xxx',
                    },
                  ]
                },
                { 
                  width: '50%',
                  columns: [
                    { 
                      width: '35%',
                      text: 'E-Mail Address:'
                    },
                    { 
                      width: '65%',
                      text: 'test_email@mail.com',
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
      // FOURTH TABLE
    {
      style: 'tableExample',
      table: {
        headerRows: 1,
        widths: ['50%', '50%'],
        body: [
          // table heading
          [
            {
              text: 'Service Provision',
              colSpan: 2,
              alignment: 'center'
            },
            {}
          ],
          // row 1
          [
            { 
              table: {
                widths: ['25%', '25%', '25%', '25%'],
                body: [
                  [{text: 'Date', style: 'center'}, {text: 'Frequency', style: 'center'}, {text: 'Time In', style: 'center'}, {text: 'Time Out', style: 'center'}],
                  [{text: '04-01-2021', style: ['center', 'whiteCell']}, {text: '90', style: ['center', 'whiteCell']}, {text: '05:30 PM', style: ['center', 'whiteCell']}, {text: '07:00 PM', style: 'center'}],
                  [{text: '04-06-2021', style: ['center', 'whiteCell']}, {text: '90', style: ['center', 'whiteCell']}, {text: '05:30 PM', style: ['center', 'whiteCell']}, {text: '07:00 PM', style: 'center'}],
                ]
              },
              layout: pdfMaker.tableLayouts.nestedTableLayout,
              style: 'cellNestedTable'
            },
            { 
              table: {
                widths: ['25%', '25%', '25%', '25%'],
                body: [
                  [{text: 'Date', style: 'center'}, {text: 'Frequency', style: 'center'}, {text: 'Time In', style: 'center'}, {text: 'Time Out', style: 'center'}],
                  [{text: '04-01-2021', style: ['center', 'whiteCell']}, {text: '90', style: ['center', 'whiteCell']}, {text: '05:30 PM', style: ['center', 'whiteCell']}, {text: '07:00 PM', style: 'center'}],
                  [{text: '04-06-2021', style: ['center', 'whiteCell']}, {text: '90', style: ['center', 'whiteCell']}, {text: '05:30 PM', style: ['center', 'whiteCell']}, {text: '07:00 PM', style: 'center'}],
                ]
              },
              layout: pdfMaker.tableLayouts.nestedTableLayout,
              style: 'cellNestedTable'
            }
          ]
        ]
      },
      layout: pdfMaker.tableLayouts.formTableLayout
    },
      // TOTAL SESSIONS TABLE
    {
      style: 'tableExample',
      table: {
        widths: ['33%', '33%', '33%'],
        body: [
          [
            {
              columns: [
                { 
                  width: '60%',
                  text: 'Total # of Sessions:'
                },
                { 
                  width: '40%',
                  text: '28.50',
                },
              ],
              border: [true, true, false, true]
            },
            {
              columns: [
                { 
                  width: '50%',
                  text: 'Rate:'
                },
                { 
                  width: '50%',
                  text: '28',
                },
              ],
              border: [false, true, false, true]
            },
            {
              columns: [
                { 
                  width: '60%',
                  text: 'Total Amount Due:'
                },
                { 
                  width: '40%',
                  text: '099',
                },
              ],
              border: [false, true, true, true]
            }
          ]
        ]
      },
    },
      // NOTE TEXT
    {
      text: 'NOTE: All fields must be completed and original invoice be sent monthly to the Bureau of Non Public Schools Payable Office',
      fontSize: 8,
      alignment: 'center',
    },
      // CERTIFICATION TABLE
    {
      style: 'tableExample',
      table: {
        headerRows: 1,
        widths: ['50%', '50%'],
        body: [
          // table heading
          [
            {
              text: 'Student Information',
              alignment: 'center',
              colSpan: 2,
            },
            {},
          ],
          // row 1
          [
            { 
              text: certificationText.provider,
              fontSize: 8,
              alignment: 'justify',
            },
            {
              text: certificationText.responsible,
              fontSize: 8,
              alignment: 'justify',
            },
          ], 
          // row 2
          [
            { 
              // image: '', // signature
              text: '',
              margin: 30,
            },
            {
              // image: '', // signature
              text: '',
              margin: 30,
            }
          ],
          // row 3
          [
            { 
              text: 'Susan Ciment',
              alignment: 'center',
            },
            {
              text: 'Responsible Name',
              alignment: 'center',
            }
          ],
          // row 4
          [
            { 
              fontSize: 9,
              columns: [
                {
                  width: '50%',
                  text: 'Signature of Provider',
                  alignment: 'right',
                  noWrap: true,
                  margin: [0, 0, 8, 0],
                },
                {
                  width: 'auto',
                  text: 'Date:',
                  margin: [5, 0],
                },
                {
                  width: '50%',
                  text: '05-03-2021'
                }
              ]
            },
            {
              fontSize: 9,
              columns: [
                {
                  width: 'auto',
                  text: 'Signature of Parent/Guardian/Principal',
                  noWrap: true,
                  margin: [0, 0, 8, 0],
                },
                {
                  width: 'auto',
                  text: 'Date:',
                  margin: [5, 0],
                },
                {
                  width: '*',
                  text: '05-03-2021'
                }
              ]
            },
          ],
        ]
      },
      layout: pdfMaker.tableLayouts.certificationTableLayout,
    },


    // UNDERLINES
    // UNDERLINES FOR FIRST TABLE
    { 
      absolutePosition: {x: 0, y: 0},
      canvas: [
        {
          type: 'line',
          x1: 115, y1: 128,
          x2: 290, y2: 128,
          lineWidth: 1
        },
        {
          type: 'line',
          x1: 390, y1: 128,
          x2: 565, y2: 128,
          lineWidth: 1
        },
        {
          type: 'line',
          x1: 115, y1: 146,
          x2: 565, y2: 146,
          lineWidth: 1
        },
        {
          type: 'line',
          x1: 115, y1: 164,
          x2: 290, y2: 164,
          lineWidth: 1
        },
        {
          type: 'line',
          x1: 390, y1: 164,
          x2: 565, y2: 164,
          lineWidth: 1
        },
      ]
    },
    // UNDERLINES FOR SECOND TABLE
    { 
      absolutePosition: {x: 0, y: 0},
      canvas: [
        {
          type: 'line', // Students name
          x1: 115, y1: 223,
          x2: 290, y2: 223,
          lineWidth: 1
        },
        {
          type: 'line', // DOB
          x1: 365, y1: 223,
          x2: 425, y2: 223,
          lineWidth: 1
        },
        {
          type: 'line', // NYC ID
          x1: 480, y1: 223,
          x2: 565, y2: 223,
          lineWidth: 1
        },
        {
          type: 'line', // Service District
          x1: 115, y1: 241,
          x2: 185, y2: 241,
          lineWidth: 1
        },
        {
          type: 'line', // Frequency
          x1: 250, y1: 241,
          x2: 290, y2: 241,
          lineWidth: 1
        },
        {
          type: 'line', // Duration
          x1: 350, y1: 241,
          x2: 400, y2: 241,
          lineWidth: 1
        },
        {
          type: 'line', // Hourly Rate
          x1: 470, y1: 241,
          x2: 565, y2: 241,
          lineWidth: 1
        },
      ]
    },
    // UNDERLINES FOR THIRD TABLE
    { 
      absolutePosition: {x: 0, y: 0},
      canvas: [
        {
          type: 'line', // Students name
          x1: 105, y1: 300,
          x2: 290, y2: 300,
          lineWidth: 1
        },
        {
          type: 'line', // Students name
          x1: 385, y1: 300,
          x2: 565, y2: 300,
          lineWidth: 1
        },
        {
          type: 'line',
          x1: 105, y1: 318,
          x2: 565, y2: 318,
          lineWidth: 1
        },
        {
          type: 'line', // Students name
          x1: 105, y1: 336,
          x2: 290, y2: 336,
          lineWidth: 1
        },
        {
          type: 'line', // Students name
          x1: 385, y1: 336,
          x2: 565, y2: 336,
          lineWidth: 1
        },
      ]
    },
    // UNDERLINES FOR SESSIONS TABLE
    { 
      absolutePosition: {x: 0, y: 0},
      canvas: [
        {
          type: 'line', // Students name
          x1: 125, y1: 471,
          x2: 200, y2: 471,
          lineWidth: 1
        },
        {
          type: 'line', // Students name
          x1: 290, y1: 471,
          x2: 380, y2: 471,
          lineWidth: 1
        },
        {
          type: 'line',
          x1: 490, y1: 471,
          x2: 565, y2: 471,
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
    cellNestedTable: {
      fillColor: '#ababab',
      margin: 0,
      fontSize: 8,
    },
    whiteCell: {
      fillColor: '#fff',
    },
    center: {
      alignment: 'center',
    }
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
  pdfDoc.pipe(fs.createWriteStream(`static/pdfmake/pdfmake_enhanced_invoice.pdf`));
  pdfDoc.end();
}

module.exports = generateTestPdf;

