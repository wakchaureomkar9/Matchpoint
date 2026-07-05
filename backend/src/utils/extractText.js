const { pdf } = require('pdf-to-img');
const Tesseract = require('tesseract.js');

async function extractTextFromPDF(pdfPath) {
    try {
    const pages = await pdf(pdfPath, { scale: 2 });
    let fullText = '';

    for await (const page of pages) {
        const { data: { text } } = await Tesseract.recognize(page, 'eng');
        fullText += text + '\n';
    }

    return fullText.trim();
    } catch (error) {
    throw new Error('Failed to extract text from PDF: ' + error.message);
    }
}

module.exports = { extractTextFromPDF };