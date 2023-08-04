import Router from '@koa/router';
import { getQuote, getLanguages } from '../middlewares/motivational_quotes.js';

const router = new Router();

router.post('/getQuote', getQuote, async (ctx) => {
  await ctx.render('components/quote_section', { motivationResponse: ctx.state.motivationResponse });
});

router.get('/languages', getLanguages, async (ctx) => {
  await ctx.render('components/language_menu', { supportedLanguages: ctx.state.supportedLanguages });
});

export default router;
