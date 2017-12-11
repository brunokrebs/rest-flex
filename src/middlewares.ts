export {
  exceptionHandler
}

async function exceptionHandler(ctx, next): Promise<any> {
  try {
    return await next();
  } catch (err) {
    ctx.status = 400;
    ctx.body = { 'message': 'Oops! Something went wrong.' }
  }
}
