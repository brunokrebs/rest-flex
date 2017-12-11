export {
  exceptionHandler, sayHi
}

async function exceptionHandler(ctx, next): Promise<any> {
  try {
    return await next();
  } catch (err) {
    ctx.status = 400;
    ctx.body = { 'message': 'Oops! Something went wrong.' }
  }
}

async function sayHi(ctx) {
  if (ctx.originalUrl === '/forge-error') {
    throw new Error('forging error for tests');
  }
  ctx.body = 'Hi!';
}
