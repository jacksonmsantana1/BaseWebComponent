import expect from 'expect.js';
import Request from './Request.js';

describe('Request =>', () => {
  describe('getJSON() ->', () => {
    var server;
    var getJSON = Request.getJSON;

    beforeEach(function () {
      server = sinon.fakeServer.create();
    });

    afterEach(function () {
      server.restore();
    });

    it('GET 200', (done) => {
      server.respondWith('GET', '/something', [200, {
          'Content-Type': 'application/json',
        },
        '{ "CU": "ANUS", "ANUS": "CU" }',
      ]);

      getJSON('/something').then((data) => {
        expect(data.body.CU).to.be.equal('ANUS');
        expect(data.body.ANUS).to.be.equal('CU');

        done();
      }, (err) => {
        done();
      });

      server.respond();

    });

    it('GET 500', () => {
      server.respondWith('GET', '/something', [500, {
          'Content-Type': 'application/json',
        },
        ' ',
      ]);

      getJSON('/something').then((data) => {
        done();
      }, (err) => {
        expect(err.status).to.be.equal(500);
        expect(err.message).to.be.equal('Internal Server Error');
        expect(err.error).to.be.an(Error);
        done();
      });

      server.respond();

    });

    it('GET 400', () => {
      server.respondWith('GET', '/something', [400, {
          'Content-Type': 'application/json',
        },
        ' ',
      ]);

      getJSON('/something').then((data) => {
        done();
      }, (err) => {
        expect(data.status).to.be.equal(400);
        expect(data.message).to.be.equal('Bad Request');
        expect(data.error).to.be.an(Error);
        done();
      });

      server.respond();

    });

    it('GET 401', () => {
      server.respondWith('GET', '/something', [401, {
          'Content-Type': 'application/json',
        },
        ' ',
      ]);

      getJSON('/something').then((data) => {
        done();
      }, (err) => {
        expect(data.status).to.be.equal(401);
        expect(data.message).to.be.equal('Unauthorized');
        expect(data.error).to.be.an(Error);
        done();
      });

      server.respond();

    });

    it('GET 403', () => {
      server.respondWith('GET', '/something', [403, {
          'Content-Type': 'application/json',
        },
        ' ',
      ]);

      getJSON('/something').then((data) => {
        done();
      }, (err) => {
        expect(data.status).to.be.equal(403);
        expect(data.message).to.be.equal('Unauthorized');
        expect(data.error).to.be.an(Error);
        done();
      });

      server.respond();

    });

    it('GET 404', () => {
      server.respondWith('GET', '/something', [404, {
          'Content-Type': 'application/json',
        },
        ' ',
      ]);

      getJSON('/something').then((data) => {
        done();
      }, (err) => {
        expect(data.status).to.be.equal(404);
        expect(data.message).to.be.equal('Not Found');
        expect(data.error).to.be.an(Error);
        done();
      });

      server.respond();

    });
  });

  describe('postJSON() -> ', () => {
    it('Test should return a Promise', () => {
      let sendJSON = Request.sendJSON;
      let promise = sendJSON('/test', {});

      expect(promise).to.be.a(Promise);
    });

    it('Test should throw an error when there s no reject()', () => {
      let sendJSON = Request.sendJSON;
      let promise = sendJSON('/test', {});

      try {
        promise.then(function () {});
      } catch (e) {
        expect(e.message).to.be.equal('Need add the resolve or the reject fn');
      }
    });
  });
});
