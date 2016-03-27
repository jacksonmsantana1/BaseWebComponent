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
    var sendJSON = Request.sendJSON;
    var xhr;
    var requests;

    beforeEach(() => {
      xhr = sinon.useFakeXMLHttpRequest();
      requests = [];
      xhr.onCreate = (xhr) => {
        requests.push(xhr);
      };
    });

    afterEach(function() {
      xhr.restore();
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
        expect(err.url).to.be.equal(undefined);
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

    it('Test should return an error when the data is an empty obejct', (done) => {
      sendJSON('/test', {}).then(function() {
        expect(true).to.be.equal(false);
        done();
      }, function(err) {
        expect(err.message).to.be.equal('Data is an empty object');
        done();
      });
    });

    it('Test should send given data as JSON body', () => {
      var data = {
        hello: 'world'
      };
      var dataJson = JSON.stringify(data);

      sendJSON('/test', data).then(function() {});
      expect(requests[0].requestBody).to.equal(dataJson);
    });

    it('Test should send send a status of 201 when completed ', (done) => {
      var data = {
        hello: 'world 201'
      };
      var dataJson = JSON.stringify(data);
      var res = sendJSON('/test', data);

      requests[0].respond(201, {
        'Content-Type': 'text/json'
      }, dataJson);
      res.then((obj) => {
        expect(obj.body).to.be.equal(data);
        expect(obj.status).to.be.equal(201);
        expect(obj.message).to.be.equal('OK 201');
        done();
      });
    });

    it('Test should return an error when 500 occurred', (done) => {
      var data = {
        hello: 'world 201'
      };
      var dataJson = JSON.stringify(data);

      sendJSON('/test', data).then(() => {
        expect(true).to.be.equal(false);
        done();
      }, (err) => {
        expect(err.status).to.be.equal(500);
        expect(err.message).to.be.equal('Internal Server Error');
        done();
      });
      requests[0].respond(500);
    });

    it('Not found 404', () => {
      //TODO
    });

    it('Not permitted 403', () => {
      //TODO
    });

  });
});
