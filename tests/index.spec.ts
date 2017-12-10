import * as chai from 'chai';
import * as restFlex from  '../src/index';
import * as WebRequest from 'web-request';

describe('tests all the way', () => {
  const app = restFlex.app.listen(3001);

  it('should say hi to Bruno', async () => {
    const result = await WebRequest.get('http://localhost:3001/');
    chai.assert(result.content === 'Hi!', 'It should say "Hi!"');
  });

  after(async () => {
    await app.close();
  })
});
