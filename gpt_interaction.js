import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
  organization: process.env.OPENAI_ORG_ID,
  apiKey: process.env.OPENAI_API_KEY,
});

const MODEL = "gpt-3.5-turbo";
const openai = new OpenAIApi(configuration);

export const chatCompletion = async ({systemMessage, userMessage, functions}) => {
  const response = await openai.createChatCompletion({
    model: MODEL,
    messages: [
      {role: "system", content: systemMessage},
      {role: "user", content: userMessage}
    ],
    functions: functions,
  });

  return response.data.choices[0].message
}