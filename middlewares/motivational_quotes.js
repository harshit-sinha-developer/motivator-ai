import {getMotivationalQuote, getSupportedLanguages} from '../quote_motivation/index.js';

export const getQuote = async (ctx, next) => {
  const {prompt, langCode} = validateGetQuote(ctx);

  const motivationalResponse = await getMotivationalQuote(prompt, {langCode});
  ctx.body = {data: { motivationalResponse }};

  return await next();
};

export const getLanguages = async (ctx, next) => {
  ctx.body = {data: {supportedLanguages: getSupportedLanguages()}};

  return await next();
}

const validateGetQuote = (ctx) => {
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

  return {prompt: ctx.vals.prompt, langCode: ctx.vals.langCode};
}
