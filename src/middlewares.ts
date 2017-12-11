import * as jwt from "koa-jwt";
import {koaJwtSecret} from 'jwks-rsa';
import Application = require("koa");

export {
  exceptionHandler, sayHi, security
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

function security(): Application.Middleware {
  // koa-jwt type definition does not know `audience` and `issuer`
  // gotta open an issue
  const untypedJwt: any = jwt;
  return untypedJwt({
    secret: koaJwtSecret({
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
      cache: true
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`
  })
}
