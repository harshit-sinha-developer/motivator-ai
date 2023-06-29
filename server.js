import Koa from 'koa'
import Router from '@koa/router'
import bodyParser from "@koa/bodyparser"
import logger from 'koa-logger'
import bouncer from 'koa-bouncer'
import serve from "koa-static";
import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { getMotivationalQuote, SUPPORTED_LANGUAGES } from './quote_motivation/index.js'

import {validateRequest} from './server/validate_request.js'

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config();
const app = new Koa();
const router = new Router({prefix: '/api'});

router.post('/getQuote', async (ctx, next) => {
  ctx
    .validateBody('prompt')
    .required('Prompt required')
    .isString()
    .trim();
  
  ctx
    .validateBody('langCode')
    .optional()
    .isString()
    .trim()

  const prompt = ctx.vals.prompt;
  const langCode = ctx.vals.langCode;

  const motivationalResponse = await getMotivationalQuote(prompt, {langCode});

  ctx.body = {data: { motivationalResponse }};

  return await next();
});

router.get('/languages', async (ctx, next) => {
  ctx.body = {data: {supportedLanguages: SUPPORTED_LANGUAGES}}
  return await next();
});

router.redirect('/', '/index.html')

app
  .use(bodyParser())
  .use(logger())
  .use(serve('public'))
  .use(bouncer.middleware())
  .use(validateRequest)
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000, () => console.log("Listening on port 3000"));