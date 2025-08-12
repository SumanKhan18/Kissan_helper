
import { GoogleGenerativeAI, GenerativeModel, GenerateContentResult } from '@google/generative-ai';

const GEMINI_API_KEY: string = 'AIzaSyD3N25WuosvfkiIom9kOwD7ZlJFAWgCtWs';

const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function getFarmingAdvice(question: string): Promise<string> {
  try {
    const model: GenerativeModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt: string = `You are a smart, helpful assistant for farmers, agriculture businesses, and rural users. 
    
    Your role:
    - Understand agricultural topics: crops, planting, fertilizers, irrigation, weather, pests, livestock care, equipment
    - Provide practical, actionable advice in simple English
    - Be friendly, encouraging, and patient
    - Focus on farming productivity and safety
    
    User question: ${question}
    
    Please provide a helpful, detailed response with practical steps and tips. Use emojis and bullet points to make it easy to read.`;

    const result: GenerateContentResult = await model.generateContent(prompt);
    const response = await result.response;
    const text: string = response.text();
    
    return text || "I'm sorry, I couldn't generate a response right now. Please try asking your question again.";
  } catch (error: unknown) {
    console.error('Gemini API Error:', error);
    return "I'm having trouble connecting to get you an answer right now. Please try again in a moment, or ask a different farming question.";
  }
}

export interface StreamChunk {
  text(): string;
}

export interface StreamResult {
  stream: AsyncIterable<StreamChunk>;
}

export async function getFarmingAdviceStream(question: string): Promise<ReadableStream<string>> {
  const model: GenerativeModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
  const prompt: string = `You are a smart, helpful assistant for farmers, agriculture businesses, and rural users. 
  
  Your role:
  - Understand agricultural topics: crops, planting, fertilizers, irrigation, weather, pests, livestock care, equipment
  - Provide practical, actionable advice in simple English
  - Be friendly, encouraging, and patient
  - Focus on farming productivity and safety
  
  User question: ${question}
  
  Please provide a helpful, detailed response with practical steps and tips. Use emojis and bullet points to make it easy to read.`;

  try {
    const result: StreamResult = await model.generateContentStream(prompt) as StreamResult;
    
    return new ReadableStream<string>({
      async start(controller: ReadableStreamDefaultController<string>): Promise<void> {
        try {
          for await (const chunk of result.stream) {
            const chunkText: string = chunk.text();
            if (chunkText) {
              controller.enqueue(chunkText);
            }
          }
          controller.close();
        } catch (error: unknown) {
          controller.error(error);
        }
      }
    });
  } catch (error: unknown) {
    console.error('Gemini Streaming Error:', error);
    return new ReadableStream<string>({
      start(controller: ReadableStreamDefaultController<string>): void {
        controller.enqueue("I'm having trouble connecting to get you an answer right now. Please try again in a moment.");
        controller.close();
      }
    });
  }
}

export interface FarmingQuestion {
  id: string;
  question: string;
  category: string;
  priority: number;
}

export interface FarmingResponse {
  answer: string;
  confidence: number;
  sources?: string[];
  relatedTopics?: string[];
}

export class FarmingAssistant {
  private model: GenerativeModel;

  constructor(apiKey: string = GEMINI_API_KEY) {
    const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async askQuestion(question: string, context?: string): Promise<FarmingResponse> {
    try {
      const contextPrompt: string = context ? `Context: ${context}\n\n` : '';
      const fullPrompt: string = `${contextPrompt}You are an expert farming assistant. Answer this question with practical advice: ${question}`;
      
      const result: GenerateContentResult = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      const answer: string = response.text();

      return {
        answer,
        confidence: 0.9,
        relatedTopics: this.extractRelatedTopics(question)
      };
    } catch (error: unknown) {
      throw new Error(`Failed to get farming advice: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private extractRelatedTopics(question: string): string[] {
    const topics: string[] = [];
    const lowerQuestion: string = question.toLowerCase();
    
    if (lowerQuestion.includes('crop') || lowerQuestion.includes('plant')) {
      topics.push('crop management', 'planting schedules');
    }
    if (lowerQuestion.includes('water') || lowerQuestion.includes('irrigation')) {
      topics.push('irrigation systems', 'water conservation');
    }
    if (lowerQuestion.includes('pest') || lowerQuestion.includes('disease')) {
      topics.push('pest control', 'disease prevention');
    }
    if (lowerQuestion.includes('soil') || lowerQuestion.includes('fertilizer')) {
      topics.push('soil health', 'fertilization');
    }
    
    return topics;
  }
}
