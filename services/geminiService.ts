import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize the Gemini Client
// Note: We use process.env.API_KEY as strictly required.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are "Phit", the AI ambassador for Phitopolis. 
Phitopolis is a FinTech company based in Taguig, Philippines, supporting global hedge funds.
Mission: "Making tomorrow's technology available today."
Culture: Elite engineering, vibrant, academic, high-performance, Python/React focused.
Your goal is to answer questions about the company, its tech stack (Python, AWS, React, C++), and attract top-tier engineering talent.
Keep answers professional, concise (under 100 words unless asked for details), and enthusiastic about technology.
If asked about specific jobs, encourage them to check the Careers section.
`;

export const sendMessageToGemini = async (history: string[], message: string): Promise<string> => {
  try {
    // We construct a prompt that includes context, though for a simple stateless request 
    // in this demo we will just append the new message to the system instruction context conceptually.
    // Ideally, we would use ai.chats.create for stateful history, but for this stateless service wrapper
    // we will use generateContent with a constructed prompt or just the single turn for simplicity 
    // while keeping the system instruction.
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "I apologize, I'm processing a lot of data right now. Could you ask that again?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our systems are currently calibrating. Please try again in a moment.";
  }
};