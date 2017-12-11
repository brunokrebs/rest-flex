import * as parseArgs from 'command-line-args';
import * as Koa from 'koa';
import * as middlewares from './middlewares';

export {
  app, shutdown
}

const app = new Koa();
app.use(middlewares.exceptionHandler);

let server;

app.use(async function sayHi(ctx) {
  if (ctx.originalUrl === '/forge-error') {
    throw new Error('forging error for tests');
  }
  ctx.body = 'Hi!';
});

async function shutdown() {
  if (server) {
    return await server.close();
  }
}

// running if called directly (i.e. through `node rest-flex`)
// `global['it']` was used to trigger the server when running tests
if (require.main === module || global['it']) {
  const argsDefinitions = [
    { name: 'port', type: Number, defaultValue: 3001 }
  ];

  const args = parseArgs(argsDefinitions, { partial: true });

  server = app.listen(args.port);
}
