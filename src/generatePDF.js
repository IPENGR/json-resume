const pdf = require('html-pdf');
const fs = require('fs');

const generatePDF = (htmlContent) => {
  return new Promise((resolve, reject) => {
    pdf.create(htmlContent).toBuffer((err, buffer) => {
      if (err) {
        reject(err);
      } else {
        fs.writeFileSync('./public/pdf/generated_resume.pdf', buffer);
        resolve(buffer);
      }
    });
  });
};

module.exports = generatePDF;
