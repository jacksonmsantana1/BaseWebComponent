import expect from 'expect.js';
import EventEmitter from 'wolfy87-eventemitter';
import PwUserInfo from './pw-user-info.js';

describe('pw-user-info', () => {
  let component;
  let xhr;
  let requests;

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    component = document.createElement('pw-user-info');

    xhr.onCreate = function (xhr) {
      requests.push(xhr);
    };
  });

  afterEach(() => {
    sinon.restore();
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

    it('setUserToken() -> will store the user token', () => {
      let user = {
        email: 'jackson@gmail.com',
        password: 'VAITOMARNOCU',
      };

      component.validateUser(user)
        .then(component.getResponseToken)
        .then(component.setUserToken)
        .then((tk) => {
          expect(tk).to.be.equal(component.getUserToken());
          done();
        });

      requests[0].respond(200, {}, '{"token": "1234567890"}');
    });

    it('validationError() -> will ...', () => {
      //TODO
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
  });

  describe('Pin Event', () => {
    it('Component should send the project pinned by the author', (done) => {
      let data = {
        token: '123456789',
        projectId: '1234097435',
      };

      component.token = data.token;
      component.pinned(data.projecId).then((res) => {
        expect(JSON.parse(res.body).projectId).to.be.equal(data.projectId);
        done();
      });

      requests[0].respond(200, {}, '{"projectId": "1234097435"}');
    });

    it('Component should log an error when the project s id don t exist', () => {
      let data = {
        token: '123456789',
        projectId: 'dontExist',
      };

      component.token = data.token;
      component.pinned(data.projecId).then((res) => {});

    });

    it('Component should log when the user already pinned the project', () => {

    });
  });
});
