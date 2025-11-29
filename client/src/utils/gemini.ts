import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyB8TP3yqb0AbHrdA8Ioc6gahFhSpMSRKXU",
});

const callGemini = async (prompt: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text;
};

const getTeacherRolePrompt = (prompt: string) => {
  return `You are a helpful software engineering teacher.
   Answer questions clearly and concisely.
    Use simple explanations with code examples when needed. Keep responses brief but informative.
    This is the question: ${prompt}
    `;
};

export { callGemini, getTeacherRolePrompt };
