import * as parseArgs from 'command-line-args';
import * as Koa from 'koa';

export {
  start, use, shutdown
}

const app = new Koa();
let server;

async function shutdown() {
  if (server) {
    return await server.close();
  }
}

async function start() {
  const argsDefinitions = [
    { name: 'port', type: Number, defaultValue: 3001 }
  ];

  const args = parseArgs(argsDefinitions, { partial: true });

  server = await app.listen(args.port);
}

function use(middleware: Koa.Middleware) {
  app.use(middleware);
}
