import { chatCompletion } from '../gpt/interaction.js';

export const SUPPORTED_LANGUAGES = {
  HINDI: 'Hindi (Devanagari)',
  CHINESE: 'Simplified Chinese',
  JAPANESE: 'Japanese',
  BANGLA: 'Bangla',
  ENGLISH: 'English (US)',
};

const responseFormat = {
  name: 'parseMotivationalResponse',
  description: 'Gets motivational quote info and returns it correctly',
  parameters: {
    type: 'object',
    properties: {
      quote: {
        type: 'string',
        description: 'Non translated quote in original language',
      },
      quotee: {
        type: 'string',
        description: "Non translated quotee's name",
      },
      translatedQuote: {
        type: 'string',
        description: 'Translated quote in English',
      },
      translatedQuotee: {
        type: 'string',
        description: "Translated quotee's name in English",
      },
      explanation: {
        type: 'string',
        description: 'Quote explained in simple language',
      },
      motivation: {
        type: 'string',
        description: 'Motivation derived from the quote',
      },
    },
    required: ['quote', 'quotee', 'translatedQuote', 'translatedQuotee', 'motivation'],
  },
};

const getGPTSystemInput = ({ language = SUPPORTED_LANGUAGES.HINDI }) => `
  You are a chat bot that finds relatable quotes said by famous individuals originally in ${language}. 
  You can provide a message or topic in and I will fetch a quote, translate it to English, 
  provide the quotee's name, explain it in simple words, and motivate you with it. 
  Please share your message or topic below:`;

const parseMotivationalResponse = (rawResponse) => {
  const result = JSON.parse(rawResponse);

  return {
    quote: result.quote,
    quotee: result.quotee,
    translatedQuote: result.translatedQuote,
    translatedQuotee: result.translatedQuotee,
    explanation: result.explanation,
    motivation: result.motivation,
  };
};

export const getMotivationalQuote = async (prompt, { langCode } = { langCode: 'HINDI' }) => {
  const language = SUPPORTED_LANGUAGES[langCode] || SUPPORTED_LANGUAGES.HINDI;
  const response = await chatCompletion({
    systemMessage: getGPTSystemInput({ language }),
    userMessage: `Generate a response for following user prompt: ${prompt}`,
    functions: [responseFormat],
  });

  return parseMotivationalResponse(response.function_call.arguments);
};

export const getSupportedLanguages = () => SUPPORTED_LANGUAGES;
