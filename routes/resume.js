const express = require('express');
const router = express.Router();
const resumeData = require('../data/resume.json');
const generatePDF = require('../src/generatePDF');
const generateJSON = require('../src/generateJSON');

router.post('/generate', (req, res) => {
  const { theme } = req.body;
  res.render(theme, { resume: resumeData });
});

router.post('/generate-pdf', async (req, res) => {
  const htmlContent = res.render('resume-pdf', { resume: req.body });
  try {
    const pdfBuffer = await generatePDF(htmlContent);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=generated_resume.pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Error generating PDF');
  }
});

module.exports = router;
