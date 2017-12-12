import * as server from './server';
import * as middlewares from './middlewares';

export {
  stop
}

const stop = server.shutdown;

server.use(middlewares.exceptionHandler);
server.use(middlewares.cors);
server.use(middlewares.security);
server.use(middlewares.sayHi);
server.use(middlewares.bodyParser);

// should we run it automatically?
if (require.main === module || global['it']) {
  // yes when called like `node rest-flex` and on automated tests
  server.start();
}
