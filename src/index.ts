import * as parseArgs from 'command-line-args';
import * as Koa from 'koa';

const app = new Koa();

export {
  app
}

app.use(async function sayHi(ctx) {
  ctx.body = 'Hi!';
});

// running if called directly (i.e. through `node rest-flex`)
if (require.main === module) {
  const argsDefinitions = [
    { name: 'port', type: Number, defaultValue: 3001 }
  ];

  const args = parseArgs(argsDefinitions, { partial: true });

  app.listen(args.port);
}
