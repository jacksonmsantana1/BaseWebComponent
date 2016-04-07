import expect from 'expect.js';
import EventEmitter from 'wolfy87-eventemitter';
import PwUserInfo from './pw-user-info.js';
import Token from '../../lib/Token/Token.js';
import Logger from '../../lib/Logger/Logger.js';

describe('pw-user-info', () => {
  let component;
  let xhr;
  let requests;

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    component = document.createElement('pw-user-info');

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
      expect(requests[0].url).to.be.equal('/validation');
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

  describe('EventEmitter Helper', () => {
    it('Component should contain an EventEmitter object', () => {
      expect(component.getEventEmitter()).to.be.an(EventEmitter);
    });

    it('Component can add EventEmitters to itself', () => {
      let spy = sinon.spy();
      let obj = {
        test: 'SPY',
      };

      component.addEventEmitter('pin', spy);
      component.emit('pin', obj);

      expect(spy.called).to.be.equal(true);
      expect(spy.args[0][0]).to.be.equal(obj);
      expect(spy.args[0][0].test).to.be.equal('SPY');
    });

    it('Component should listening to the "pin" event', () => {
      let spy = sinon.spy();
      let listeners = component.getEventEmitter().getListeners('pin');

      listeners[0].listener = spy;
      component.emit('pin', {
        test: 'SPY',
      });

      expect(spy.called).to.be.equal(true);
      expect(spy.args[0][0].test).to.be.equal('SPY');
    });

    it('Component should listening to the "despin" event', () => {
      let spy = sinon.spy();
      let listeners = component.getEventEmitter().getListeners('despin');

      listeners[0].listener = spy;
      component.emit('despin', {
        test: 'SPY',
      });

      expect(spy.called).to.be.equal(true);
      expect(spy.args[0][0].test).to.be.equal('SPY');
    });

    it('Component should listening to the "isPinned" event', () => {
      let spy = sinon.spy();
      let listeners = component.getEventEmitter().getListeners('isPinned');

      listeners[0].listener = spy;
      component.emit('isPinned', {
        test: 'SPY',
      });

      expect(spy.called).to.be.equal(true);
      expect(spy.args[0][0].test).to.be.equal('SPY');
    });
  });

  describe('Pin Event', () => {
    it('pinned() -> Component should save the project s id pinned by the user', (done) => {
      let data = {
        token: '123456789',
        projectId: '1234097435',
      };

      component.pinned(data.token, data.projecId).then((res) => {
        expect(JSON.parse(res.body).projectId).to.be.equal(data.projectId);
        done();
      });

      expect(requests[0].url).to.be.equal('/user/projects/pinned');
      requests[0].respond(200, {}, '{"projectId": "1234097435"}');
    });

    it('pinned() -> Component should warn if any error occured', (done) => {
      let data = {
        token: '123456789',
        projectId: 'dontExist',
      };

      component.pinned(data.token, data.projecId).catch((err) => {
        expect(err.status).to.be.equal(500);
        done();
      });

      requests[0].respond(500);
    });

    it('desPinned() -> Oposite effect of the pin() fn', (done) => {
      let data = {
        token: '123456789',
        projectId: '1234097435',
      };

      component.desPinned(data.token, data.projecId).then((res) => {
        expect(JSON.parse(res.body).projectId).to.be.equal(data.projectId);
        done();
      });

      expect(requests[0].url).to.be.equal('/user/projects/desPinned');
      requests[0].respond(200, {}, '{"projectId": "1234097435"}');
    });

    it('desPinned() -> Component should warn if any error occured', (done) => {
      let data = {
        token: '123456789',
        projectId: 'dontExist',
      };

      component.pinned(data.token, data.projecId).catch((err) => {
        expect(err.status).to.be.equal(500);
        done();
      });

      requests[0].respond(500);
    });

    it('isPinned() ->', (done) => {
      let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
        'eyJwaW5uZWQiOlsiMTIzIiwiMzQ1IiwiNjc4IiwiMTIzNDU2Nzg5MCJdfQ.' +
        'KX7MpEDAVTxo80HvIq7vDZrrgM0CRNPrCj19jT1B-N4';

      component.isPinned(token, '1234097435').then((result) => {
        expect(result).to.be.equal(true);
        done();
      });

      expect(requests[0].url).to.be.equal('/user/projects');
      requests[0].respond(200, {}, '{"pinned": ["1234097435", "345", "678"]}');
    });

    it('isPinned() -> Component should warn if any error occured', (done) => {
      let data = {
        token: '123456789',
        projectId: 'dontExist',
      };

      component.isPinned(data.token, data.projecId).catch((err) => {
        expect(err.status).to.be.equal(500);
        done();
      });

      requests[0].respond(500);
    });
  });
});
