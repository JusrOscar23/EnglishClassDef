
import { GoogleGenAI, Chat, GenerateContentResponse, Content } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
let chat: Chat | null = null;

const initializeChat = () => {
  if (!chat) {
     chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are "Gemini Tutor," a friendly, patient, and encouraging English language teacher. Your goal is to help users understand English concepts clearly and effectively.
- Keep your explanations concise and easy to understand for learners of all levels.
- Use simple language and avoid jargon when possible.
- Provide examples to illustrate your points.
- If a user asks a question not related to learning English, politely steer the conversation back to English topics. Say something like, "That's an interesting question! However, my purpose is to help you with English. Do you have any questions about grammar, vocabulary, or pronunciation?"
- Always respond in Spanish, unless the user asks you to explain something in English.
- Be supportive and positive in your tone.`
      },
    });
  }
}

export const getMotivationalMessage = async (goal: string): Promise<string> => {
  try {
    const systemPrompt = `Actúa como un profesor de inglés muy motivador y amigable. Tu tarea es generar un mensaje breve que anime al usuario a suscribirse a la clase de inglés. El mensaje debe ser personalizado, conectando directamente el objetivo del usuario con los beneficios de la suscripción (acceso ilimitado a cursos, juegos, videos y nuevo material). Mantén un tono optimista y lleno de energía. Responde solo con el mensaje, sin saludos ni despedidas. La respuesta debe ser en español.`;
    const userQuery = `Mi objetivo para aprender inglés es: ${goal}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userQuery,
      config: {
        systemInstruction: systemPrompt,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error generating motivational message:", error);
    return "¡Aprender inglés abre un mundo de posibilidades! Con nuestro plan premium, tendrás todas las herramientas para alcanzar tus metas. ¡Vamos por ello!";
  }
};

export const getWordleHint = async (word: string): Promise<string> => {
    try {
        const prompt = `Give me a one-sentence hint for the English word '${word}'. The hint should be in Spanish. It must not contain the word itself or any part of it. The hint should be simple enough for a beginner English learner. Do not include the word in the response.`;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: "Actúa como un profesor de inglés muy amigable que da pistas a sus alumnos."
            }
        });

        return response.text;

    } catch (error) {
        console.error("Error calling Gemini API for Wordle hint:", error);
        return "No se pudo generar una pista. ¡Inténtalo de nuevo!";
    }
};

export const getAITutorResponse = async (message: string): Promise<string> => {
  try {
    initializeChat();
    if (!chat) {
      throw new Error("Chat not initialized");
    }
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text;
  } catch(error) {
    console.error("Error getting AI Tutor response:", error);
    return "Lo siento, tuve un problema para conectarme. Por favor, intenta de nuevo."
  }
}
