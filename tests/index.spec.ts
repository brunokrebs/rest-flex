import './mocks';
import * as chai from 'chai';
import * as restFlex from  '../src/index';
import * as server from '../src/server';
import * as request from 'request-promise';


describe('tests all the way', () => {
  it('should say hi to Bruno', sayHi);
  it('should be able to handle exceptions', handleErrors);
  it('should not generate errors when shutingdown without starting', checkStoppedShutdown);

  after(() => {
    restFlex.stop();
  })
});

async function sayHi() {
  const options = {
    uri: 'http://localhost:3001/',
    headers: {
      'Authorization': 'Bearer some.access.token'
    },
    json: true
  };

  const result = await request(options);
  chai.assert(result === 'Hi!', 'It should say "Hi!"');
}

async function handleErrors() {
  try {
    await request('http://localhost:3001/forge-error');
  } catch (err) {
    chai.assert(err.statusCode === 400);
    chai.assert(JSON.parse(err.response.body).message === 'Oops! Something went wrong.');
  }
}

async function checkStoppedShutdown() {
  server.shutdown();
}
