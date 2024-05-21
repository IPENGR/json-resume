const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Route to serve the form
app.get('/', (req, res) => {
  res.render('index');
});

// Route to handle theme selection and show resume form UI
app.post('/generate', (req, res) => {
  const theme = req.body.theme;
  
  // Check if a valid theme is selected
  if (theme !== 'theme1' && theme !== 'theme2') {
    res.status(400).send('Invalid theme selected');
    return;
  }

  // Render the resume form UI based on the selected theme
  res.render('resume-form', { theme });
});

// Route to handle form submission and generate resume.json or generate PDF
app.post('/generate-resume', (req, res) => {
  const resumeData = req.body;

  // Save resume data to resume.json if needed
  // fs.writeFileSync('resume.json', JSON.stringify(resumeData, null, 2));

  const theme = req.body.theme;

  // Render the appropriate theme view for PDF generation
  if (theme === 'theme1') {
    res.render('theme1', { resume: resumeData });
  } else if (theme === 'theme2') {
    res.render('theme2', { resume: resumeData });
  } else {
    res.status(400).send('Invalid theme selected');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
