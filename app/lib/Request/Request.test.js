import expect from 'expect.js';
import Request from './Request.js';

describe('Request =>', () => {
  describe('getJSON()', () => {
    it('Should return a Promise', () => {
      let getJSON = Request.getJSON;

      expect(getJSON('/test')).to.be.a(Promise);
    });

    it('Should make a request to the given url', (done) => {
      let getJSON = Request.getJSON;
      let xhr = sinon.useFakeXMLHttpRequest();
      let requests = [];
      xhr.onCreate = function (req) { requests.push(req); };

      getJSON('/test');

      expect(requests.length).to.be.equal(1);
      expect(requests[0].url).to.be.equal('/test');
      done();
    });
  });
});
