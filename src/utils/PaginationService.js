import { pdf } from '@react-pdf/renderer';
import React from 'react';
import { PDFDocument } from '../components/PDFDocument';

/**
 * Reusable, template-agnostic export engine that generates a true Vector PDF
 * using @react-pdf/renderer.
 *
 * @param {Object} data - The entire resume data model.
 */
export const exportToPDF = async (data) => {
  const fullName = data.personal.fullName || 'Resume';

  try {
    // 1. Create the React-PDF document element
    const doc = React.createElement(PDFDocument, { data });

    // 2. Compile into a standard PDF Blob
    const blob = await pdf(doc).toBlob();

    // 3. Create a temporary download anchor
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fullName.replace(/\s+/g, '_')}_Resume.pdf`;

    // 4. Trigger download and clean up
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Vector PDF Export Error:', err);
  }
};
