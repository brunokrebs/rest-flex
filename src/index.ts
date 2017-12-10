import * as parseArgs from 'command-line-args';
import * as Koa from 'koa';

export {
  app, shutdown
}

const app = new Koa();

let server;

app.use(async function sayHi(ctx) {
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
