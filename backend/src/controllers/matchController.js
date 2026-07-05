const { extractTextFromPDF } = require('../utils/extractText');
const { analyzeMatch } = require('../services/geminiService');
const fs = require('fs');

async function matchResume(req, res) {
    try {
    if (!req.file) {
        return res.status(400).json({ error: 'No resume file uploaded' });
    }

    if (!req.body.jobDescription) {
        return res.status(400).json({ error: 'Job description is required' });
    }

    const resumePath = req.file.path;
    const jobDescription = req.body.jobDescription;

    const resumeText = await extractTextFromPDF(resumePath);

    const result = await analyzeMatch(resumeText, jobDescription);

    fs.unlink(resumePath, (err) => {
        if (err) console.error('Failed to delete temp file:', err);
    });

    return res.status(200).json(result);

    } catch (error) {
    return res.status(500).json({ error: error.message });
    }
}

module.exports = { matchResume };
