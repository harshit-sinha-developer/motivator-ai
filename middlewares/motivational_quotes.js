import { getMotivationalQuote, getSupportedLanguages } from '../quote_motivation/index.js';

export const validateGetQuote = (ctx) => {
  ctx
    .validateBody('prompt')
    .required('Prompt required')
    .isString()
    .trim()
    .isLength(1, 280, 'Prompt length should be between 1 to 280 characters.');

  ctx
    .validateBody('langCode')
    .optional()
    .isString()
    .trim();

  return { prompt: ctx.vals.prompt, langCode: ctx.vals.langCode };
};

export const getQuote = async (ctx, next) => {
  const { prompt, langCode } = validateGetQuote(ctx);

  const motivationalResponse = await getMotivationalQuote(prompt, { langCode });
  ctx.state.motivationResponse = motivationalResponse;

  return next();
};

export const getLanguages = async (ctx, next) => {
  ctx.state.supportedLanguages = getSupportedLanguages();

  return next();
};
