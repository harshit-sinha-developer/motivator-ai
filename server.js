import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from '@koa/bodyparser';
import koaLogger from 'koa-logger';
import bouncer from 'koa-bouncer';
import serve from "koa-static";
import dotenv from 'dotenv';

import {getMotivationalQuote, SUPPORTED_LANGUAGES} from './quote_motivation/index.js';
import {validateRequest} from './middlewares/validate_request.js';
import logger from './utils/logger.js';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 3000;
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
  .use(koaLogger())
  .use(serve('public'))
  .use(bouncer.middleware())
  .use(validateRequest)
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(SERVER_PORT, () => logger.info(`Listening on port ${SERVER_PORT}`));