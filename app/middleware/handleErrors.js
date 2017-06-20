/**
 * Created by ccc on 6/15/17.
 */

export default function () {
  return async (ctx, next) => {
    try {
      await next();
      if (ctx.status === 404) {
        ctx.throw('resource not found', 404);
      }
    } catch (err) {
      ctx.status = err.status || 500;
      const response = {
        status: ctx.status,
        message: err.message,
      };

      ctx.body = response;
      ctx.app.emit('error', err, ctx);
    }
  };
}
