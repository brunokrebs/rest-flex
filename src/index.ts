import {start, shutdown, use} from './server';
import * as middlewares from './middlewares';
import * as cors from 'kcors';
import * as bodyParser from 'koa-bodyparser';

export {
  shutdown
}

use(middlewares.exceptionHandler);
use(middlewares.security());
use(middlewares.sayHi);
use(cors());
use(bodyParser());

// running if called directly (i.e. through `node rest-flex`)
// `global['it']` was used to trigger the server when running tests
if (require.main === module || global['it']) {
  start();
}
