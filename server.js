import Koa from 'koa';
import bodyParser from '@koa/bodyparser';
import koaLogger from 'koa-logger';
import bouncer from 'koa-bouncer';
import serve from "koa-static";
import dotenv from 'dotenv';

import {validateRequest} from './middlewares/validate_request.js';
import logger from './utils/logger.js';
import apiRoutes from './routes/api.js';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 3000;
const app = new Koa();

app
  .use(bodyParser())
  .use(koaLogger())
  .use(serve('public'))
  .use(bouncer.middleware())
  .use(validateRequest)
  .use(apiRoutes.routes())
  .use(apiRoutes.allowedMethods())
  .listen(SERVER_PORT, () => logger.info(`Listening on port ${SERVER_PORT}`));