import expect from 'expect.js';
import EventEmitter from 'wolfy87-eventemitter';
import PwUserInfo from './pw-user-info.js';
import Token from '../../lib/Token/Token.js';
import Logger from '../../lib/Logger/Logger.js';

describe('pw-user-info', () => {
  let component;
  let pwUserInfo;
  let xhr;
  let requests;
  let token;

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    token = 'TOKEN';

    component = document.createElement('pw-user-info');
    document.body.appendChild(component);
    pwUserInfo = document.getElementsByTagName('pw-user-info')[0];
    Token.setUserToken(token);

    xhr.onCreate = (xhr) => {
      requests.push(xhr);
    };
  });

  afterEach(() => {
    sinon.restore();
    Token.setUserToken(null);
  });

  describe('Token Validation => ', () => {
    it('validateUser() -> should return an Promise', () => {
      expect(component.validateUser({})).to.be.an(Promise);
    });

    it('validateUser() -> should receive the user s email and PASSWORD', (done) => {
      let user = {
        email: 'jackson@gmail.com',
      };

      component.validateUser(user).catch((err) => {
        expect(err.message).to.be.equal('Only the email is given');
        done();
      });
    });

    it('validateUser() -> should receive the user s EMAIL and password', (done) => {
      let user = {
        password: 'VAITOMARNOSEUANUS',
      };

      component.validateUser(user).catch((err) => {
        expect(err.message).to.be.equal('Only the password is given');
        done();
      });
    });

    it('validateUser() -> should make an POST to /validation', () => {
      let user = {
        email: 'jackson@gmail.com',
        password: 'VAITOMARNOCU',
      };

      component.validateUser(user);
      expect(requests[0].url).to.be.equal('http://localhost:3000/validation');
      expect(requests[0].method).to.be.equal('POST');
    });

    it('getResponseToken() -> will get from the token from response', (done) => {
      let user = {
        email: 'jackson@gmail.com',
        password: 'VAITOMARNOCU',
      };

      component.validateUser(user)
        .then(component.getResponseToken)
        .then((tk) => {
          expect(tk).to.be.equal('1234567890');
          done();
        });

      requests[0].respond(200, {}, '{"token": "1234567890"}');
    });

    it('logError() -> will be called if any http error occur', (done) => {
      let user = {
        email: 'jackson@gmail.com',
        password: 'VAITOMARNOCU',
      };

      component.validateUser(user)
        .then(component.getResponseToken)
        .then(component.setUserToken)
        .catch(Logger.error('validate()', '/validation'))
        .catch((err) => {
          expect(err.status).to.be.equal(400);
          expect(err.message).to.be.equal('Bad Request');
          done();
        });

      requests[0].respond(400);
    });

    it('validate() -> ERROR', (done) => {
      let user = {
        email: 'jackson@gmail.com',
        password: 'VAITOMARNOCU',
      };

      component.validate(user).catch((res) => {
        expect(res.status).to.be.equal(500);
        done();
      });

      requests[0].respond(500);
    });

    it('validate() -> OK', (done) => {
      let user = {
        email: 'jackson@gmail.com',
        password: 'VAITOMARNOCU',
      };

      component.validate(user).then((token) => {
        expect(token).to.be.equal('1234567890');
        done();
      });

      requests[0].respond(200, {}, '{"token": "1234567890"}');
    });
  });

  describe('Pin Event', () => {
    it('pinned() -> Component should save the project s id pinned by the user', (done) => {
      const evt = new CustomEvent('pin', {
        detail: {
          projectId: '1234097435',
        },
        bubbles: false,
        cancelable: true,
      });

      pwUserInfo.pinned(evt).then((res) => {
        expect(JSON.parse(res.body).projectId).to.be.equal('1234097435');
        done();
      });

      expect(requests[0].url).to.be.equal('http://localhost:3000/user/projects/pinned');
      expect(requests[0].requestHeaders.authorization).to.be.equal('TOKEN');
      requests[0].respond(200, {}, '{"projectId": "1234097435"}');
    });

    it('pinned() -> Component should warn if any error occured', (done) => {
      const evt = new CustomEvent('pin', {
        detail: {
          projectId: '1234097435',
        },
        bubbles: false,
        cancelable: true,
      });

      pwUserInfo.pinned(evt).catch((err) => {
        expect(err.status).to.be.equal(500);
        done();
      });

      requests[0].respond(500);
    });

    it('desPinned() -> Oposite effect of the pin() fn', (done) => {
      const evt = new CustomEvent('despin', {
        detail: {
          projectId: '1234097435',
        },
        bubbles: false,
        cancelable: true,
      });

      pwUserInfo.desPinned(evt).then((res) => {
        expect(res.status).to.be.equal(200);
        expect(JSON.parse(res.body).projectId).to.be.equal('1234097435');
        done();
      });

      expect(requests[0].url).to.be.equal('http://localhost:3000/user/projects/desPinned');
      expect(requests[0].requestHeaders.authorization).to.be.equal('TOKEN');
      requests[0].respond(200, {}, '{"projectId": "1234097435"}');
    });

    it('desPinned() -> Component should warn if any error occured', (done) => {
      const evt = new CustomEvent('despin', {
        detail: {
          projectId: '1234097435',
        },
        bubbles: false,
        cancelable: true,
      });

      pwUserInfo.desPinned(evt).catch((err) => {
        expect(err.status).to.be.equal(500);
        done();
      });

      requests[0].respond(500);
    });

    it('isPinned() ->', (done) => {
      const evt = new CustomEvent('isPinned', {
        detail: {
          projectId: '345',
        },
        bubbles: false,
        cancelable: true,
      });

      pwUserInfo.isPinned(evt).then((result) => {
        expect(result).to.be.equal(true);
        done();
      }, (err) => {
        done(err);
      });

      expect(requests[0].url).to.be.equal('http://localhost:3000/user/projects');
      expect(requests[0].requestHeaders.authorization).to.be.equal('TOKEN');
      requests[0].respond(200, {}, '{"pinned": ["1234097435", "345", "678"]}');
    });

    it('isPinned() -> Component should warn if any error occured', (done) => {
      const evt = new CustomEvent('isPinned', {
        detail: {
          projectId: '1234097435',
        },
        bubbles: false,
        cancelable: true,
      });

      pwUserInfo.isPinned(evt).catch((err) => {
        expect(err.status).to.be.equal(500);
        done();
      });

      requests[0].respond(500);
    });
  });
});
