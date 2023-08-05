import Router from '@koa/router';

import { getQuote, getLanguages } from '../middlewares/motivational_quotes.js';
import { validateRequest } from '../middlewares/validate_request.js';

const router = new Router();

const generateResponseFromState = (state, responseKey) => {
  const response = { data: {} };
  response.data[responseKey] = state[responseKey];

  return response;
};

router.use(validateRequest);

router.post('/getQuote', getQuote, (ctx, next) => {
  ctx.body = generateResponseFromState(ctx.state, 'motivationResponse');
  return next();
});

router.get('/languages', getLanguages, (ctx, next) => {
  ctx.body = generateResponseFromState(ctx.state, 'supportedLanguages');
  return next();
});

export default router;
