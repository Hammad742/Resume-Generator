export const analyzeResumeATS = async (resumeData) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API key is missing. Please set VITE_GEMINI_API_KEY in your environment.");
  }

  // 1. Rule-Based Analysis (Hybrid logic)
  let ruleScore = 0;
  const metrics = [];

  // Contact Info Check (max 10)
  let contactScore = 0;
  if (resumeData.personal.email) contactScore += 3;
  if (resumeData.personal.phone) contactScore += 3;
  if (resumeData.personal.linkedin || resumeData.personal.github || resumeData.personal.portfolio) contactScore += 4;
  ruleScore += contactScore;
  if (contactScore < 10) metrics.push("- Missing full contact information (email, phone, professional links).");

  // Summary Check (max 10)
  if (resumeData.personal.summary && resumeData.personal.summary.length > 50) {
    ruleScore += 10;
  } else {
    metrics.push("- Summary is missing or too short.");
  }

  // Experience Check (max 15)
  if (resumeData.experience && resumeData.experience.length > 0) {
    ruleScore += 15;
    // Check descriptions
    const hasShortDesc = resumeData.experience.some(exp => !exp.description || exp.description.length < 30);
    if (hasShortDesc) metrics.push("- Some work experience descriptions lack detail.");
  } else {
    metrics.push("- Missing Work Experience section.");
  }

  // Projects Check (max 10)
  if (resumeData.projects && resumeData.projects.length > 0) {
    ruleScore += 10;
  }

  // Education Check (max 5)
  if (resumeData.education && resumeData.education.length > 0) {
    ruleScore += 5;
  } else {
    metrics.push("- Missing Education section.");
  }

  // Skills Check (max 10)
  if (resumeData.skills && resumeData.skills.length > 4) {
    ruleScore += 10;
  } else {
    ruleScore += (resumeData.skills?.length || 0) * 2;
    metrics.push("- Skills section is weak or missing (recommend at least 5 key skills).");
  }

  // Total rule score is out of 60. AI will provide the remaining 40 points based on qualitative analysis.

  const prompt = `
You are an expert technical recruiter and ATS (Applicant Tracking System) algorithm simulator.
I will provide you with a candidate's parsed resume data in JSON format, along with some pre-calculated rule-based metrics.
Your job is to provide a comprehensive, recruiter-style ATS analysis.

Rule-Based Score calculated so far: ${ruleScore} out of 60 points.
Rule-Based Findings:
${metrics.join('\n')}

Resume Data:
${JSON.stringify(resumeData, null, 2)}

Instructions:
1. Provide an AI quality score out of 40 based on readability, impact of descriptions, grammar, and keyword relevance.
2. Add your AI score to the Rule-Based score (${ruleScore}) to get the final 'atsScore' out of 100.
3. Identify strong points ('strengths').
4. Identify weak points ('weaknesses').
5. Suggest important missing keywords based on the candidate's target title: "${resumeData.personal.title}".
6. Provide actionable 'suggestions' to improve the resume.
7. Provide a short paragraph of 'recruiterFeedback' simulating what a hiring manager would say.

IMPORTANT: Return ONLY a valid JSON object. Do not include markdown formatting or backticks.
The JSON must follow this exact structure:
{
  "atsScore": 84,
  "strengths": ["string", "string"],
  "weaknesses": ["string", "string"],
  "missingKeywords": ["string", "string"],
  "suggestions": ["string", "string"],
  "recruiterFeedback": "string"
}
`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          response_mime_type: "application/json",
        }
      }),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(`API Error: ${errData?.error?.message || response.statusText || "Failed to fetch from Gemini API"}`);
    }

    const data = await response.json();
    let aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!aiText) {
      throw new Error("Received empty or malformed response from the AI.");
    }

    // Strip markdown JSON backticks if Gemini ignores response_mime_type
    aiText = aiText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    let parsedData;
    try {
      parsedData = JSON.parse(aiText);
    } catch (parseError) {
      console.error("Failed to parse AI response:", aiText);
      throw new Error("The AI returned improperly formatted data. Please try again.", { cause: parseError });
    }

    return parsedData;

  } catch (error) {
    console.error("ATS Analysis Error:", error);
    if (error.name === 'AbortError') {
      throw new Error("The analysis request timed out after 30 seconds. Please check your connection and try again.", { cause: error });
    }
    // Re-throw the explicit error messages we set above, otherwise give a generic fallback
    throw new Error(error.message || "Failed to analyze resume. Please try again later.", { cause: error });
  }
};
