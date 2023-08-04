import Router from '@koa/router';

import apiRoutes from './api.js';
import viewsRoutes from './views.js';

const router = new Router();

router.use('/api', apiRoutes.routes(), apiRoutes.allowedMethods());
router.use('/views', viewsRoutes.routes(), viewsRoutes.allowedMethods());
router.all('/', async (ctx) => {
  await ctx.render('index');
});

export default router;
