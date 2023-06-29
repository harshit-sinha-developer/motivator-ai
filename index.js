import dotenv from 'dotenv';
import promptSync from 'prompt-sync'
import { getMotivationalQuote } from './quote_motivation/index.js'

dotenv.config();

const prompt = promptSync({sigint: true});
const input = prompt("Say something: ")

console.log(await getMotivationalQuote(input))





