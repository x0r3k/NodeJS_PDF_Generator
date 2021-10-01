const PdfMakerBuilder = require('pdfmake');
const fs = require('fs');

const fonts = {
  Times: {
    normal: 'Times-Roman',
    bold: 'Times-Bold',
    italics: 'Times-Italic',
    bolditalics: 'Times-BoldItalic'
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
  nestedTableLayout_IHIOU: {
    fillColor: function (rowIndex, node, columnIndex) { 
      return (rowIndex === 0) ? '#b4e9f0' : 'white'
    }
  }
};

const docDefinition = {
  pageMargins: [25, 40],
  content: [
    // HEADER
      // image is out of first column because image cant have percent width
      // percent width required for centering "Division" text
    {
      image: 'depart_logo',
      width: 70,
      absolutePosition: { x: 30, y: 40 }
    },
    {
      columns: [
        {
          // space for image
          width: 90,
          text: '',
        },
        { 
          margin: [0, 10],
          alignment: 'left',
          lineHeight: 1.3,
          width: '*',
          bold: true,
          text: [
            'Impartial Hearing Order Implementation Unit',
            '\nDivision of Specialized Instruction and Student Support',
          ]
        },
      ]
    },

    // TITLE
    {
      text: 'VENDOR MONTHLY SERVICE INVOICE FORM',
      style: ['heading', 'center'],
      margin: [0, 0, 0, 20]
    },

    // CASE INFORMATION BLOCK
    {
      text: 'CASE INFORMATION',
      style: ['subheading', 'center'],
      margin: [0, 10, 0, 10]
    },
    {
      columns: [
        {
          width: '30%',
          columns: [
            {
              width: 'auto',
              noWrap: true,
              style: 'mr_5',
              text: 'Case Number:'
            },
            {
              width: '*',
              text: 'case number #456-99'
            },
          ]
        },
        {
          width: '40%',
          columns: [
            {
              width: 'auto',
              noWrap: true,
              style: 'mr_5',
              text: 'Service Period:'
            },
            {
              text: 'Month'
            },
            {
              text: ''
            },
            {
              text: 'Year'
            },
            {
              text: ''
            }
          ]
        },
        {
          width: '30%',
          columns: [
            {
              style: 'mr_5',
              text: 'Today\'s Date:'
            },
            {
              text: ''
            }
          ]
        }
      ],
      style: 'mb_5'
    },
    {
      keyword: 'caseInfo_2',
      columns: [
        {
          width: '30%',
          columns: [
            {
              width: 'auto',
              noWrap: true,
              style: 'mr_5',
              text: 'Service Type:'
            },
            {
              width: '*',
              text: 'SETSS'
            },
          ]
        },
        {
          width: '40%',
          columns: [
            {
              width: 'auto',
              noWrap: true,
              style: 'mr_5',
              text: 'Service Location:'
            },
            {
              text: ''
            },
          ]
        },
        {
          width: '30%',
          columns: [
            {
              style: 'mr_5',
              text: 'Invoice Number:'
            },
            {
              text: ''
            }
          ]
        }
      ]
    },

    // STUDENT INFORMATION BLOCK
    {
      text: 'STUDENT INFORMATION',
      style: ['subheading', 'center'],
      margin: [0, 10, 0, 10]
    },
    {
      identificator: 'studInfo_1',
      columns: [
        {
          width: '65%',
          columns: [
            {
              width: 'auto',
              noWrap: true,
              style: 'mr_5',
              text: 'Name:'
            },
            {
              width: '*',
              text: ''
            },
          ]
        },
        {
          width: '35%',
          columns: [
            {
              width: 'auto',
              noWrap: true,
              style: 'mr_5',
              text: 'Student ID/OSIS#:'
            },
            {
              text: ''
            },
          ]
        },
      ],
      style: 'mb_5'
    },
    {
      identificator: 'studInfo_2',
      columns: [
        {
          width: '100%',
          columns: [
            {
              width: 'auto',
              noWrap: true,
              style: 'mr_5',
              text: 'Home Address:'
            },
            {
              width: '*',
              text: ''
            },
          ]
        }
      ],
      style: 'mb_5'
    },

    // AGENCY INFORMATION BLOCK
    {
      text: 'AGENCY/INDEPENDENT PROVIDER INFORMATION',
      style: ['subheading', 'center'],
      margin: [0, 10, 0, 10]
    },
    {
      identificator: 'providerInfo_1',
      columns: [
        {
          width: '65%',
          columns: [
            {
              width: 'auto',
              noWrap: true,
              style: 'mr_5',
              text: 'Name:'
            },
            {
              width: '*',
              text: ''
            },
          ]
        },
        {
          width: '35%',
          columns: [
            {
              width: 'auto',
              noWrap: true,
              style: 'mr_5',
              text: 'TIN #/SSN#:'
            },
            {
              text: ''
            },
          ]
        },
      ],
      style: 'mb_5'
    },
    {
      identificator: 'providerInfo_2',
      columns: [
        {
          width: '100%',
          columns: [
            {
              width: 'auto',
              noWrap: true,
              style: 'mr_5',
              text: 'Address:'
            },
            {
              width: '*',
              text: ''
            },
          ]
        }
      ],
      style: 'mb_5'
    },
    {
      identificator: 'providerInfo_3',
      columns: [
        {
          width: '60%',
          columns: [
            {
              width: 'auto',
              noWrap: true,
              style: 'mr_5',
              text: 'Email Address:'
            },
            {
              width: '*',
              text: ''
            },
          ]
        },
        {
          width: '40%',
          columns: [
            {
              text: 'Telephone Number:',
              width: 'auto',
              noWrap: true,
              style: 'mr_5',
            },
            {
              text: ' (',
              width: 'auto',
            },
            { 
              text: '097',
              width: 35,
              alignment: 'center',
            },
            {
              text: ') ',
              width: 'auto',
            },
            {
              text: '766',
              width: 35,
              alignment: 'center',
            },
            {
              text: '-',
              width: 'auto',
            },
            {
              text: '2779',
              width: 45,
              alignment: 'center',
            },
          ]
        },
      ],
      style: 'mb_5'
    },
    {
      identificator: 'providerInfo_4',
      columns: [
        {
          width: '100%',
          columns: [
            {
              width: 'auto',
              noWrap: true,
              style: 'mr_5',
              text: ['Service Provider Name ', { text: '(FOR AGENCIES ONLY):', bold: true }]
            },
            {
              width: '*',
              text: ''
            },
          ]
        }
      ],
      style: 'mb_5'
    },

    // SESSION TABLE
    {
      style: 'defaultTable',
      columns: [
        {
          width: '34%',
          headerRows: 1,
          widths: ['30%', '20%', '20%', '30%'],
          table: {
            body: [
              [{text: 'DATE OF SERVICE', style: 'tableHeader'}, {text: 'START TIME', style: 'tableHeader'}, {text: 'END TIME', style: 'tableHeader'}, {text: 'NO. OF SESSION', style: 'tableHeader'}],
              ['1', '', '', ''], ['2', '', '', ''], ['3', '', '', ''], ['4', '', '', ''], ['5', '', '', ''], 
              ['6', '', '', ''], ['7', '', '', ''], ['8', '', '', ''], ['9', '', '', ''], ['10', '', '', ''], 
            ]
          },
          layout: pdfMaker.tableLayouts.nestedTableLayout_IHIOU
        },
        {
          width: '33%',
          headerRows: 1,
          widths: ['30%', '20%', '20%', '30%'],
          table: {
            body: [
              [{text: 'DATE OF SERVICE', style: 'tableHeader'}, {text: 'START TIME', style: 'tableHeader'}, {text: 'END TIME', style: 'tableHeader'}, {text: 'NO. OF SESSION', style: 'tableHeader'}],
              [' ', '', '', ''], [' ', '', '', ''], [' ', '', '', ''], [' ', '', '', ''], [' ', '', '', ''], 
              [' ', '', '', ''], [' ', '', '', ''], [' ', '', '', ''], [' ', '', '', ''], [' ', '', '', ''], 
            ]
          },
          layout: pdfMaker.tableLayouts.nestedTableLayout_IHIOU
        },
        {
          width: '33%',
          headerRows: 1,
          widths: ['30%', '20%', '20%', '30%'],
          table: {
            body: [
              [{text: 'DATE OF SERVICE', style: 'tableHeader'}, {text: 'START TIME', style: 'tableHeader'}, {text: 'END TIME', style: 'tableHeader'}, {text: 'NO. OF SESSION', style: 'tableHeader'}],
              [' ', '', '', ''], [' ', '', '', ''], [' ', '', '', ''], [' ', '', '', ''], [' ', '', '', ''], 
              [' ', '', '', ''], [' ', '', '', ''], [' ', '', '', ''], [' ', '', '', ''], [' ', '', '', ''], 
            ]
          },
          layout: pdfMaker.tableLayouts.nestedTableLayout_IHIOU
        }
      ],
    },

    // SESSION CHARACTERISTICS
    {
      bold: true,
      columns: [
        {
          width: 'auto',
          columns: [
            {
              width: 'auto',
              noWrap: true,
              text: 'Mandated Session Length:',
              margin: [0, 0, 2, 0]
            },
            {
              width: 31,
              text: 'fffff'
            },
          ]
        },
        {
          width: 'auto',
          columns: [
            {
              width: 'auto',
              noWrap: true,
              text: 'Total Number of Sessions:',
              margin: [2, 0]
            },
            {
              width: 31,
              text: 'fffff'
            },
          ]
        },
        {
          width: 'auto',
          columns: [
            {
              width: 'auto',
              noWrap: true,
              text: 'Rate Per Session: $',
              margin: [2, 0]
            },
            {
              width: 31,
              text: 'fffff'
            },
          ]
        },
        {
          width: 'auto',
          columns: [
            {
              width: 'auto',
              noWrap: true,
              text: 'Total Amount Due: $',
              margin: [2, 0, 0, 0]
            },
            {
              width: 50,
              text: 'ffff'
            },
          ]
        }
      ],
    },
    {
      bold: true,
      text: '(e.g. 30/45/60 minutes)',
      style: 'mb_10',
    },

    // PROVIDER AUTHENTICATION
    {
      text: certificationText.provider,
      lineHeight: 1.5,
      style: 'mb_10',
    },
    {
      identificator: 'providerForm_1',
      columns: [
        { 
          width: 'auto',
          noWrap: true,
          text: ['Provider Full Name ', {text: '(please print)', decoration: 'underline'}, ':'],
          style: 'mr_5'
        },
        {
          width: '*',
          text: '11111111111111111111'
        }
      ],
      style: 'mb_10',
    },
    {
      identificator: 'providerForm_2',
      columns: [
        {
          width: '75%',
          columns: [
            { 
              width: 'auto',
              noWrap: true,
              text: 'Provider Signature:',
              style: 'mr_5'
            },
            {
              width: '*',
              text: '11111111111111111111'
            }
          ]
        },
        {
          width: '25%',
          columns: [
            { 
              width: 'auto',
              noWrap: true,
              text: 'Date:',
              style: 'mr_5'
            },
            {
              width: '*',
              text: '2021-08-17'
            }
          ]
        }
      ],
      style: 'mb_10',
    },
    {
      text: certificationText.responsible,
      lineHeight: 1.5,
    },

    // HOME/AGENCY SIGNATURES
    {
      text: 'FOR SERVICES PROVIDED AT HOME/AGENCY',
      style: ['subheading'],
    },
    {
      identificator: 'home_agency_signature_1',
      columns: [
        {
          width: 'auto',
          noWrap: true,
          text: ['Parent Full Name (', {text: 'please print', decoration: 'underline'}, '):'],
          style: 'mr_5',
        },
        {
          width: '*',
          text: 'wwwwwwwwwww',
        }
      ],
      style: 'mb_10',
    },
    {
      identificator: 'home_agency_signature_2',
      columns: [
        {
          width: 'auto',
          noWrap: true,
          text: 'Parent Signature:',
          style: 'mr_5',
        },
        {
          width: '*',
          text: 'wwwwwwwwwwwwwwwwwwwww',
        }
      ],
      style: 'mb_10',
    },
    {
      identificator: 'home_agency_signature_3',
      columns: [
        {
          width: 'auto',
          noWrap: true,
          text: 'Date:',
          style: 'mr_5',
        },
        {
          width: '*',
          text: '',
        }
      ],
    },

    // SCHOOL SIGNATURES
    {
      text: 'FOR SERVICES PROVIDED AT SCHOOL',
      style: ['subheading'],
    },
    {
      identificator: 'school_signature_1',
      columns: [
        {
          width: 'auto',
          noWrap: true,
          text: ['Principal Full Name (', {text: 'please print', decoration: 'underline'}, '):'],
          style: 'mr_5',
        },
        {
          width: '*',
          text: 'wwwwwwwwwww',
        }
      ],
      style: 'mb_10',
    },
    {
      identificator: 'school_signature_2',
      columns: [
        {
          width: 'auto',
          noWrap: true,
          text: 'Principal Signature:',
          style: 'mr_5',
        },
        {
          width: '*',
          text: 'wwwwwwwwwwwwwwwwwwwww',
        }
      ],
      style: 'mb_10',
    },
    {
      identificator: 'school_signature_3',
      columns: [
        {
          width: 'auto',
          noWrap: true,
          text: 'Date:',
          style: 'mr_5',
        },
        {
          width: '*',
          text: '',
        }
      ],
    },

   
    // UNDERLINES
    // UNDERLINES FOR FIRST FORM
    { 
      absolutePosition: {x: 0, y: 0},
      canvas: [
        {
          type: 'line', // Case Number
          x1: 85, y1: 155,
          x2: 175, y2: 155,
          lineWidth: 1
        },
        {
          type: 'line', // Service Period Moth
          x1: 285, y1: 155, 
          x2: 330, y2: 155,
          lineWidth: 1
        },
        {
          type: 'line', // Service Period Year
          x1: 350, y1: 155,
          x2: 380, y2: 155,
          lineWidth: 1
        },
        {
          type: 'line', // Todays Date
          x1: 465, y1: 155,
          x2: 565, y2: 155,
          lineWidth: 1
        },
        {
          type: 'line', // Service Type
          x1: 85, y1: 169,
          x2: 175, y2: 169,
          lineWidth: 1
        },
        {
          type: 'line', // Service Location
          x1: 265, y1: 169,
          x2: 380, y2: 169,
          lineWidth: 1
        },
        {
          type: 'line', // Invoice Number
          x1: 480, y1: 169,
          x2: 565, y2: 169,
          lineWidth: 1
        },
      ]
    },
    // UNDERLINES FOR SECOND FORM
    { 
      absolutePosition: {x: 0, y: 0},
      canvas: [
        {
          type: 'line', // Name
          x1: 55, y1: 209,
          x2: 340, y2: 209,
          lineWidth: 1
        },
        {
          type: 'line', // ID OSIS
          x1: 460, y1: 209,
          x2: 565, y2: 209,
          lineWidth: 1
        },
        {
          type: 'line', // Address
          x1: 90, y1: 223,
          x2: 565, y2: 223,
          lineWidth: 1
        },
      ]
    },
    // UNDERLINES FOR THIRD FORM
    { 
      absolutePosition: {x: 0, y: 0},
      canvas: [
        {
          type: 'line', // Name
          x1: 55, y1: 268,
          x2: 340, y2: 268,
          lineWidth: 1
        },
        {
          type: 'line', // TIN SSN
          x1: 437, y1: 268,
          x2: 565, y2: 268,
          lineWidth: 1
        },
        {
          type: 'line', // Address
          x1: 65, y1: 282,
          x2: 565, y2: 282,
          lineWidth: 1
        },
        {
          type: 'line', // Email
          x1: 90, y1: 296,
          x2: 330, y2: 296,
          lineWidth: 1
        },
        {
          type: 'line', // Phone #1
          x1: 440, y1: 296,
          x2: 475, y2: 296,
          lineWidth: 1
        },
        {
          type: 'line', // Phone #2
          x1: 480, y1: 296,
          x2: 511, y2: 296,
          lineWidth: 1
        },
        {
          type: 'line', // Phone #3
          x1: 519, y1: 296,
          x2: 565, y2: 296,
          lineWidth: 1
        },
        {
          type: 'line', // Service Name for Agencies
          x1: 238, y1: 310,
          x2: 565, y2: 310,
          lineWidth: 1
        },
      ]
    },
    // UNDERLINES FOR SESSION BILLS
    { 
      absolutePosition: {x: 0, y: 0},
      canvas: [
        {
          type: 'line', // Name
          x1: 140, y1: 508,
          x2: 172, y2: 508,
          lineWidth: 1
        },
        {
          type: 'line', // Name
          x1: 287, y1: 508,
          x2: 317, y2: 508,
          lineWidth: 1
        },
        {
          type: 'line', // Name
          x1: 403, y1: 508,
          x2: 435, y2: 508,
          lineWidth: 1
        },
        {
          type: 'line', // Name
          x1: 528, y1: 508,
          x2: 565, y2: 508,
          lineWidth: 1
        },
      ]
    },
    // UNDERLINES FOR PROVIDER AUTHENTICATION
    { 
      absolutePosition: {x: 0, y: 0},
      canvas: [
        {
          type: 'line', // Name
          x1: 165, y1: 587,
          x2: 565, y2: 587,
          lineWidth: 1
        },
        {
          type: 'line', // Name
          x1: 105, y1: 606,
          x2: 400, y2: 606,
          lineWidth: 1
        },
        {
          type: 'line', // Name
          x1: 458, y1: 606,
          x2: 565, y2: 606,
          lineWidth: 1
        },
      ]
    },
    // UNDERLINES FOR HOME/AGENCY SIGNATURES
    { 
      absolutePosition: {x: 0, y: 0},
      canvas: [
        {
          type: 'line', // Name
          x1: 157, y1: 683,
          x2: 300, y2: 683,
          lineWidth: 1
        },
        {
          type: 'line', // Name
          x1: 97, y1: 702,
          x2: 300, y2: 702,
          lineWidth: 1
        },
        {
          type: 'line', // Name
          x1: 50, y1: 721,
          x2: 300, y2: 721,
          lineWidth: 1
        },
      ]
    },
    // UNDERLINES FOR SCHOOL SIGNATURES
    { 
      absolutePosition: {x: 0, y: 0},
      canvas: [
        {
          type: 'line', // Name
          x1: 168, y1: 761,
          x2: 300, y2: 761,
          lineWidth: 1
        },
        {
          type: 'line', // Name
          x1: 110, y1: 780,
          x2: 300, y2: 780,
          lineWidth: 1
        },
        {
          type: 'line', // Name
          x1: 50, y1: 798,
          x2: 300, y2: 798,
          lineWidth: 1
        },
      ]
    },
  ],

  images: { 
    depart_logo: 'static/images/depart_logo.png',
  },
  // PDF REUSABLE STYLES
  styles: {
    // TABLE STYLES
    // WHOLE TABLE MARGINS
    defaultTable: {
			margin: [0, 5],
      fontSize: 10,
		},
    tableHeader: {
      alignment: 'center',
      bold: true,
      fontSize: 10,
      lineHeight: 1.6
    },
    heading: {
      fontSize: 14,
      bold: true,
      decoration: 'underline'
    },
    subheading: {
      fontSize: 12,
      bold: true,
      decoration: 'underline',
      margin: [0, 10, 0, 10]
    },
    center: {
      alignment: 'center',
    },
    mb_5: {
      margin: [0, 0, 0, 5]
    },
    mr_5: {
      margin: [0, 0, 5, 0]
    },
    mb_10: {
      margin: [0, 0, 0, 10]
    },
  },
  // PDF DEFAULT STYLES
  defaultStyle: {
    font: 'Times',
    fontSize: 10, 
  },
};

const options = {
  // ...
};

function generatePdf() {
  const pdfDoc = pdfMaker.createPdfKitDocument(docDefinition, options);
  pdfDoc.pipe(fs.createWriteStream(`static/pdfmake/pdfmake_IHIOU_invoice.pdf`));
  pdfDoc.end();
}

module.exports = generatePdf;