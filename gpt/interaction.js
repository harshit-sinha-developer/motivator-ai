import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

import logger from '../utils/logger.js';

dotenv.config();

const configuration = new Configuration({
  organization: process.env.OPENAI_ORG_ID,
  apiKey: process.env.OPENAI_API_KEY,
});

const MODEL = 'gpt-3.5-turbo';
const openai = new OpenAIApi(configuration);

export const chatCompletion = async ({ systemMessage, userMessage, functions }) => {
  logger.info(`Sending request to Open AI with userMessage ${userMessage}`);
  const response = await openai.createChatCompletion({
    model: MODEL,
    messages: [
      { role: 'system', content: systemMessage },
      { role: 'user', content: userMessage },
    ],
    functions,
  });

  if (response.data) {
    logger.info('Received response from Open AI');
  } else {
    logger.error(`Error while fetching response from Open AI ${JSON.stringify(response)}`);
  }

  return response.data.choices[0].message;
};
