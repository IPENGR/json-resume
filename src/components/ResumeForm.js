import React, { useState } from "react";
import axios from "axios";

const ResumeForm = ({ onGenerateJSON }) => {
  const [formData, setFormData] = useState({
    // Existing code
  });

  // Existing handleChange and handleSubmit functions

  const handleGeneratePDF = async () => {
    try {
      const response = await axios.post('/generate-pdf', formData, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'generated_resume.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Existing form fields */}
      <button type="button" onClick={handleGeneratePDF}>Generate PDF</button>
      <button type="submit">Generate JSON</button>
    </form>
  );
};

export default ResumeForm;
