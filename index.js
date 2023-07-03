import dotenv from 'dotenv';
import promptSync from 'prompt-sync'

import { getMotivationalQuote } from './quote_motivation/index.js'
import logger from './utils/logger.js';

dotenv.config();

const prompt = promptSync({sigint: true});
const input = prompt("Say something: ")

logger.info(await getMotivationalQuote(input))





