Matchpoint
AI-powered resume vs. job description matcher with gap analysis, built using the Gemini API.
What it does
Matchpoint analyzes how well a resume matches a given job description. Upload a resume (PDF) and paste in a job description — Matchpoint returns:

A match score (0–100)
Skills/keywords found in both the resume and the JD
Skills/keywords missing from the resume
AI-generated suggestions to improve the resume's match

Tech Stack

Backend: Node.js, Express
Text extraction: Tesseract.js (OCR), pdf-to-img
AI: Google Gemini API
File handling: Multer
Frontend: React (planned)

Status
🚧 In active development — backend scaffolding is complete, core matching logic is in progress.
