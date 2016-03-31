import expect from 'expect.js';
import Logger from './Logger.js';

describe('Logger =>', () => {
  it('error() -> ', (done) => {
    let err = new Error('Some Error');
    Logger.error('function()', '/test')(err).catch((err) => {
      expect(err.message).to.be.equal('Some Error');
      done();
    });
  });
});
