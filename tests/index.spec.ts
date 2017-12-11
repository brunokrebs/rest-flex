import * as chai from 'chai';
import * as restFlex from  '../src/index';
import * as request from 'request-promise';

describe('tests all the way', () => {
  const app = restFlex.app;

  it('should say hi to Bruno', async () => {
    const result = await request('http://localhost:3001/');
    chai.assert(result === 'Hi!', 'It should say "Hi!"');
  });

  it('should be able to handle exceptions', async () => {
    try {
      await request('http://localhost:3001/forge-error');
    } catch (err) {
      chai.assert(err.statusCode === 400);
      chai.assert(JSON.parse(err.response.body).message === 'Oops! Something went wrong.');
    }
  });

  after(async () => {
    await restFlex.shutdown();
  })
});
