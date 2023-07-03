import Router from '@koa/router';

import {getQuote, getLanguages} from '../middlewares/motivational_quotes.js';

const router = new Router({prefix: '/api'});

router.post('/getQuote', getQuote);
router.get('/languages', getLanguages);
router.redirect('/', '/index.html')

export default router;

