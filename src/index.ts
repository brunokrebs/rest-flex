import {start, shutdown, use} from './server';
import * as middlewares from './middlewares';

export {
  shutdown
}

use(middlewares.exceptionHandler);
use(middlewares.sayHi);

// running if called directly (i.e. through `node rest-flex`)
// `global['it']` was used to trigger the server when running tests
if (require.main === module || global['it']) {
  start();
}
