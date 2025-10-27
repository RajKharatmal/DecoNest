import { GoogleGenAI, Modality } from "@google/genai";
import type { Feature } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getPrompt = (feature: Feature, color?: string | null): string => {
  switch (feature.id) {
    case 'style':
      return "Given this image of a room, perform a style transfer on the furniture. Change the texture and color scheme to be more modern and minimalist, with light wood and neutral fabrics. Generate a new, photorealistic image showing the result.";
    case 'furnish':
      return "This is an image of a room. Analyze the space and suggest furniture that would fit well in a Scandinavian design style. Generate a new, photorealistic image showing the room with the recommended furniture added. The room should look stylish and inviting.";
    case 'repaint':
      return `Given this image of a room, repaint the walls with the color "${color || 'a warm, neutral color like greige'}". The lighting should be preserved. Generate a new, photorealistic image showing the repainted room.`;
    case 'floor':
      return `This is an image of a room. Change the flooring to "${color || 'light-colored, wide-plank hardwood'}". Ensure the perspective and lighting on the new floor are realistic. Generate a new, photorealistic image showing the new flooring.`;
    default:
      return "Analyze this image and suggest an interior design improvement.";
  }
};

export const generateDesign = async (feature: Feature, imageBase64: string, mimeType: string, color?: string | null): Promise<string | null> => {
  const prompt = getPrompt(feature, color);
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: imageBase64,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating design:", error);
    throw new Error("Failed to generate image from AI.");
  }
};
