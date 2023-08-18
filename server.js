import Koa from 'koa';
import bodyParser from '@koa/bodyparser';
import koaLogger from 'koa-logger';
import bouncer from 'koa-bouncer';
import serve from 'koa-static';
import dotenv from 'dotenv';
import render from 'koa-ejs';
import path from 'path';
import { fileURLToPath } from 'url';

import logger from './utils/logger.js';
import rootRoutes from './routes/index.js';

const FILE_NAME = fileURLToPath(import.meta.url);
const DIR_NAME = path.dirname(FILE_NAME);

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 3000;
const app = new Koa();
render(app, {
  root: path.join(DIR_NAME, 'views'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: false,
});

app
  .use(bodyParser({ urlencoded: true }))
  .use(koaLogger((str, args) => {
    logger.info(str, args);
  }))
  .use(serve('public'))
  .use(bouncer.middleware())
  .use(rootRoutes.routes())
  .use(rootRoutes.allowedMethods())
  .listen(SERVER_PORT, () => logger.info(`Listening on port ${SERVER_PORT}`));
