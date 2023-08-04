import Router from '@koa/router';
import { getQuote, getLanguages } from '../middlewares/motivational_quotes.js';

const router = new Router();

router.get('/languages', getLanguages, async (ctx) => {
  await ctx.render('components/language_menu', { supportedLanguages: ctx.state.supportedLanguages });
});

router.post('/motivation_quote', getQuote, async (ctx) => {
  await ctx.render('components/quote_section', { motivationResponse: ctx.state.motivationResponse });
});

export default router;
