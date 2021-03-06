import expect from 'expect.js';
import Request from './Request.js';

describe('Request =>', () => {
  describe('getJSON() ->', () => {
    var getJSON = Request.getJSON;
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

    it('Test should return an error if none url is given', (done) => {
      getJSON().then(() => {}, (err) => {
        expect(err.message).to.be.equal('URL is not defined');
        done();
      });
    });

    it('Test should return an error if an empty url is given', (done) => {
      getJSON('    ').then(() => {}, (err) => {
        expect(err.message).to.be.equal('URL is not defined');
        done();
      });
    });

    it('Test should confirm that a GET request is called', () => {
      var data = {
        hello: 'world 200',
      };
      var dataJson = JSON.stringify(data);
      var res = getJSON('/test', data);

      requests[0].respond(200, {
        'Content-Type': 'text/json',
      }, dataJson);
      res.then((obj) => {
        expect(requests[0].method).to.be.equal('GET');
        expect(requests[0].url).to.be.equal('http://localhost:3000/test');
        done();
      });
    });

    it('GET 200', (done) => {
      var data = {
        hello: 'world 200',
      };
      var dataJson = JSON.stringify(data);
      var res = getJSON('/test');

      requests[0].respond(200, {
        'Content-Type': 'text/json',
      }, dataJson);

      res.then((data) => {
        expect(data.body.hello).to.be.equal('world 200');
        done();
      }, (err) => {});
    });

    it('GET 500', (done) => {
      getJSON('/test').then(() => {}, (err) => {
        expect(err.status).to.be.equal(500);
        done();
      });

      requests[0].respond(500);
    });

    it('GET 400', (done) => {
      getJSON('/test').then(() => {}, (err) => {
        expect(err.status).to.be.equal(400);
        expect(err.message).to.be.equal('Bad Request');
        expect(err.error.message).to.be.equal('ERROR 400');
        done();
      });

      requests[0].respond(400);
    });

    it('GET 401', (done) => {
      getJSON('/test').then(() => {}, (err) => {
        expect(err.status).to.be.equal(401);
        expect(err.message).to.be.equal('Access Forbidden');
        expect(err.error.message).to.be.equal('ERROR 401');
        done();
      });

      requests[0].respond(401);
    });

    it('GET 403', (done) => {
      getJSON('/test').then((data) => {}, (err) => {
        expect(err.status).to.be.equal(403);
        expect(err.message).to.be.equal('Access Forbidden');
        expect(err.error.message).to.be.equal('ERROR 403');
        done();
      });

      requests[0].respond(403);
    });

    it('GET 404', (done) => {
      getJSON('/test').then((data) => {}, (err) => {
        expect(err.status).to.be.equal(404);
        expect(err.message).to.be.equal('Not Found');
        expect(err.error.message).to.be.equal('ERROR 404');
        done();
      });

      requests[0].respond(404);
    });

    it('Test should send a request with an autorization header if a toke is provided', (done) => {
      getJSON('/test', 'token')
      .then((res) => {
        done();
      }, (err) => {
        done(err);
      });

      expect(requests[0].requestHeaders.authorization).to.be.equal('token');
      requests[0].respond(200);
    });

    it('Unknown Error', () => {
      getJSON('/test').then(() => {}, (err) => {
        expect(err.message).to.be.equal('Unknown Error');
        expect(err.status).to.be.equal(0);
        done();
      });

      requests[0].respond(402);
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

    it('Test should confirm that a POST request is called', () => {
      var data = {
        hello: 'world 200',
      };
      var dataJson = JSON.stringify(data);
      var res = sendJSON('/test', data);

      requests[0].respond(200, {
        'Content-Type': 'text/json',
      }, dataJson);
      res.then((obj) => {
        expect(requests[0].method).to.be.equal('POST');
        expect(requests[0].url).to.be.equal('http://localhost:3000/test');
        done();
      });
    });

    it('Test should send given data as JSON body', () => {
      var data = {
        hello: 'world',
      };
      var dataJson = JSON.stringify(data);

      sendJSON('/test', data).then(function() {});

      expect(requests[0].requestBody).to.equal(dataJson);
    });

    it('Test should send send a status of 200 when completed ', (done) => {
      var data = {
        hello: 'world 200',
      };
      var dataJson = JSON.stringify(data);
      var res = sendJSON('/test', data);

      requests[0].respond(200, {
        'Content-Type': 'text/json',
      }, dataJson);
      res.then((obj) => {
        expect(obj.status).to.be.equal(200);
        done();
      });
    });

    it('Test should return an error when 500 occurred', (done) => {
      var data = {
        hello: 'world 500',
      };
      var dataJson = JSON.stringify(data);
      var res = sendJSON('/test', data);
      requests[0].respond(500);

      res.then(() => {}, (err) => {
        expect(err.status).to.be.equal(500);
        expect(err.message).to.be.equal('Internal Server Error');
        done();
      });
    });

    it('Test should return an error when is a bad request', () => {
      var data = {
        hello: 'world 400',
      };

      sendJSON('/test', data).then(() => {}, (err) => {
        expect(err.status).to.be.equal(400);
        expect(err.message).to.be.equal('Bad Request');
        expect(err.error.message).to.be.equal('ERROR 400');
        done();
      });

      requests[0].respond(400);

    });

    it('Test shold return an error when the url is not found', (done) => {
      var data = {
        hello: 'world 404',
      };
      var dataJson = JSON.stringify(data);

      sendJSON('/test', data).then(() => {}, (err) => {
        expect(err.status).to.be.equal(404);
        expect(err.message).to.be.equal('Not Found');
        expect(err.error.message).to.be.equal('ERROR 404');
        done();
      });
      requests[0].respond(404);
    });

    it('Test should return an error when the access is forbidden', (done) => {
      var data = {
        hello: 'world 403',
      };
      var dataJson = JSON.stringify(data);

      sendJSON('/test', data).then(() => {}, (err) => {
        expect(err.status).to.be.equal(403);
        expect(err.message).to.be.equal('Access Forbidden');
        expect(err.error.message).to.be.equal('ERROR 403');
        done();
      });
      requests[0].respond(403);
    });

    it('Test should return some info about an unknown error that occured', (done) => {
      var data = {
        hello: 'Unkown Error',
      };
      var dataJson = JSON.stringify(data);

      sendJSON('/test', data).then(() => {}, (err) => {
        expect(err.status).to.be.equal(0);
        expect(err.message).to.be.equal('Unknown Error');
        done();
      });
      requests[0].respond(402);
    });

    it('Test should send a request with an autorization header if a token is given', (done) => {
      sendJSON('/test', { cu: 'ANUS' }, 'token').then((res) => {
        done();
      }, (err) => {
        done(err);
      });

      requests[0].respond(200);
      expect(requests[0].requestHeaders.authorization).to.be.equal('token');
    });

  });

  describe('putJSON() -> ', () => {
    var putJSON = Request.putJSON;
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
      let promise = putJSON('/test', {});

      expect(promise).to.be.a(Promise);
    });

    it('Test should confirm that a PUT request is called', () => {
      var data = {
        hello: 'world 200',
      };
      var dataJson = JSON.stringify(data);
      var res = putJSON('/test', data);

      requests[0].respond(200, {
        'Content-Type': 'text/json',
      }, dataJson);
      res.then((obj) => {
        expect(requests[0].method).to.be.equal('PUT');
        expect(requests[0].url).to.be.equal('http://localhost:3000/test');
        done();
      });
    });

    it('Test should return an error when no url is given', (done) => {
      putJSON().then(function(res) {
        expect(true).to.be.equal(false);
        done();
      }, function(err) {

        expect(err.url).to.be.equal(undefined);
        done();
      });
    });

    it('Test should return an error when no data is given', (done) => {
      putJSON('/test').then(function(res) {
        expect(true).to.be.equal(false);
        done();
      }, function(err) {

        expect(err.message).to.be.equal('Data is not defined');
        done();
      });
    });

    it('Test should return an error when the data is an empty obejct', (done) => {
      putJSON('/test', {}).then(function() {
        expect(true).to.be.equal(false);
        done();
      }, function(err) {

        expect(err.message).to.be.equal('Data is an empty object');
        done();
      });
    });

    it('Test should send given data as JSON body', () => {
      var data = {
        hello: 'world',
      };
      var dataJson = JSON.stringify(data);

      putJSON('/test', data).then(function() {});

      expect(requests[0].requestBody).to.equal(dataJson);
    });

    it('Test should send send a status of 200 when completed ', (done) => {
      var data = {
        hello: 'world 200',
      };
      var dataJson = JSON.stringify(data);
      var res = putJSON('/test', data);

      requests[0].respond(200, {
        'Content-Type': 'text/json',
      }, dataJson);
      res.then((obj) => {
        expect(obj.status).to.be.equal(200);
        expect(requests[0].method).to.be.equal('PUT');
        done();
      });
    });

    it('Test should return an error when 500 occurred', (done) => {
      var data = {
        hello: 'world 500',
      };
      var dataJson = JSON.stringify(data);
      var res = putJSON('/test', data);
      requests[0].respond(500);

      res.then(() => {}, (err) => {
        expect(err.status).to.be.equal(500);
        expect(err.message).to.be.equal('Internal Server Error');
        done();
      });
    });

    it('Test should return an error when is a bad request', () => {
      var data = {
        hello: 'world 400',
      };

      putJSON('/test', data).then(() => {}, (err) => {
        expect(err.status).to.be.equal(400);
        expect(err.message).to.be.equal('Bad Request');
        expect(err.error.message).to.be.equal('ERROR 400');
        done();
      });

      requests[0].respond(400);

    });

    it('Test shold return an error when the url is not found', (done) => {
      var data = {
        hello: 'world 404',
      };
      var dataJson = JSON.stringify(data);

      putJSON('/test', data).then(() => {}, (err) => {
        expect(err.status).to.be.equal(404);
        expect(err.message).to.be.equal('Not Found');
        expect(err.error.message).to.be.equal('ERROR 404');
        done();
      });
      requests[0].respond(404);
    });

    it('Test should return an error when the access is forbidden', (done) => {
      var data = {
        hello: 'world 403',
      };
      var dataJson = JSON.stringify(data);

      putJSON('/test', data).then(() => {}, (err) => {
        expect(err.status).to.be.equal(403);
        expect(err.message).to.be.equal('Access Forbidden');
        expect(err.error.message).to.be.equal('ERROR 403');
        done();
      });
      requests[0].respond(403);
    });

    it('Test should return some info about an unknown error that occured', (done) => {
      var data = {
        hello: 'Unkown Error',
      };
      var dataJson = JSON.stringify(data);

      putJSON('/test', data).then(() => {}, (err) => {
        expect(err.status).to.be.equal(0);
        expect(err.message).to.be.equal('Unknown Error');
        done();
      });
      requests[0].respond(402);
    });

    it('Test should send a request with an autorization header if a token is given', (done) => {
      putJSON('/test', { cu: 'ANUS' }, 'token').then((res) => {
        done();
      }, (err) => {
        done(err);
      });

      requests[0].respond(200);
      expect(requests[0].requestHeaders.authorization).to.be.equal('token');
    });
  });
});
