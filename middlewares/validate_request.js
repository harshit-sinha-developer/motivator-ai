import bouncer from 'koa-bouncer'
import { StatusCodes } from 'http-status-codes';

export const validateRequest = async (ctx, next) => {
  try {
    await next();
  } catch(err) {
    if (err instanceof bouncer.ValidationError) {
      ctx.body = {
        message: err.message,
        params: ctx.request.body
      };
      ctx.status = StatusCodes.UNPROCESSABLE_ENTITY
      return;
    }
    throw err;
  }
}