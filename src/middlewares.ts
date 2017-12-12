import * as jwt from "koa-jwt";
import {koaJwtSecret} from 'jwks-rsa';
import * as kcors from 'kcors';
import * as kbodyParser from 'koa-bodyparser';

export {
  exceptionHandler, sayHi, security, cors, bodyParser
}

// this should be the last error handler
async function exceptionHandler(ctx, next): Promise<any> {
  try {
    return await next();
  } catch (err) {
    ctx.status = 400;
    ctx.body = {'message': 'Oops! Something went wrong.'};
    console.error(err);
  }
}

// just a dummy for testing purpose
async function sayHi(ctx) {
  if (ctx.originalUrl === '/forge-error') {
    throw new Error('forging error for tests');
  }
  ctx.body = 'Hi!';
}

// the jwt verifier (right now there is a bug on its type definition)
const untypedJwt: any = jwt;
const security = untypedJwt({
  secret: koaJwtSecret({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    cache: true
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`
});

// middleware to support CORS (we should be more restrictive)
const cors = kcors();

// middleware to parse request bodies to JSON objects
const bodyParser = kbodyParser();
