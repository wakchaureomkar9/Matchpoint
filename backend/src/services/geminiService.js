const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeMatch(resumeText, jobDescription) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
You are an expert HR analyst and resume reviewer.

Compare the following resume and job description carefully.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Analyze them and respond ONLY with a valid JSON object in this exact format, no extra text:
{
  "matchScore": <number between 0 and 100>,
  "matchedSkills": [<list of skills/keywords found in both resume and JD>],
  "missingSkills": [<list of skills/keywords required in JD but missing from resume>],
  "suggestions": [<list of 2-3 specific suggestions to improve the resume for this job>]
}
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    const cleaned = response.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleaned);

    return parsed;
  } catch (error) {
    throw new Error('Gemini analysis failed: ' + error.message);
  }
}

module.exports = { analyzeMatch };