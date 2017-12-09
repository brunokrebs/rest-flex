import * as chai from 'chai';
import * as restFlex from  '../src/index';

describe('tests all the way', () => {
  it('should say hi to Bruno', () => {
    const bruno = 'Bruno';
    const howdy = restFlex.howdy(bruno);
    chai.assert(howdy.indexOf(bruno), 'It should say hi to me.');
  });
});
