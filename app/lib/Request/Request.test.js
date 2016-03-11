import expect from 'expect.js';
import Request from './Request.js';

describe('Request =>', () => {
  describe('getJSON() ->', () => {
    var server;
    var getJSON = Request.getJSON;

    beforeEach(function() {
      server = sinon.fakeServer.create();
    });

    afterEach(function() {
      server.restore();
    });

    it('Test should return an error if none url is given', (done) => {
      getJSON().then(function() {
          expect(true).to.be.equal(false);
          done();
        },
        function(err) {
          expect(err.message).to.be.equal('URL is not defined');
          done();
        });
    });

    it('Test should return an error if an empty url is given', (done) => {
      getJSON('    ').then(function() {
        expect(true).to.be.equal(false);
        done();
      }, function(err) {
        expect(err.message).to.be.equal('URL is not defined');
        done();
      });
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
        expect(true).to.be.equal(false);
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
        expect(true).to.be.equal(false);
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
        expect(false).to.be.equal(true);
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
        expect(true).to.be.equal(false);
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
        expect(true).to.be.equal(false);
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
        expect(true).to.be.equal(false);
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
    var server;
    var sendJSON = Request.sendJSON;

    beforeEach(function() {
      server = sinon.fakeServer.create();
    });

    afterEach(function() {
      server.restore();
    });

    it('Test should return a Promise', () => {
      let promise = sendJSON('/test', {});

      expect(promise).to.be.a(Promise);
    });

    it('Test should return an error when no url is given', (done) => {
      sendJSON().then(function(res) {
        expect(true).to.be.equal(false);
        done();
      }, function(err) {
        expect(err.message).to.be.equal('URL is not defined');
        done();
      });
    });

    it('Test should return an error when no data is given', (done) => {
      sendJSON('/test').then(function(res) {
        expect(true).to.be.equal(false);
        done();
      }, function(err) {
        expect(err.message).to.be.equal('Data is not defined');
        done();
      });
    });

    it('Test should return a 201 status when the request is OK', (done) => {
      server.respondWith('POST', '/test', [201, {
          'Content-Type': 'application/json',
        },
        'CU',
      ]);

      sendJSON('/test', 'CU').then((res) => {
        expect(res).to.be.equal('OK');
        done();
      }, (err) => {
        expect(false).to.be.equal(true);
        done();
      }).catch((e) => {
        expect(false).to.be.equal(true);
        done();
      });

      server.respond();
    });
  });
});
