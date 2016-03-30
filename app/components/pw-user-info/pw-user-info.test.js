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

    xhr.onCreate = function(xhr) {
      requests.push(xhr);
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Token Validation', () => {
    it('validate() should validates user info', () => {
      expect(component.validateUser).to.be.an(Function);
    });

    it('validate() should validate the user info and return a valid token', (done) => {
      let user = {
        email: 'jackson@email.com',
        password: 'VAITOMARNOSEUCU',
      };
      let token = '123456789';

      component.validateUser(user).then((res) => {
        expect(JSON.parse(res.body).token).to.be.equal(token);
        done();
      }, (err) => {
        expect(err).to.be.false;
      });

      requests[0].respond(200, {
          'Content-Type': 'application/json'
        },
        '{"token": "123456789", "expires": 100, "user": {}}');
    });

    it('validate() should return an error when the user info is not valid', (done) => {
      let user = {
        email: 'jackson@email.com',
        password: 'VAITOMARNOSEUCU',
      };

      component.validateUser(user).then((res) => {
        expect(res).to.be.false;
      }, (err) => {
        expect(err.status).to.be.equal(401);
        expect(err.message).to.be.equal('Access Forbidden');
        expect(err.error).to.be.an(Error);
        done();
      });

      requests[0].respond(401);
    });

    it('validate() should store the token when the validation is OK', (done) => {
      let user = {
        email: 'jackson@email.com',
        password: 'VAITOMARNOSEUCU',
      };

      component.validateUser(user)
        .then(component.getResponseToken)
        .then(component.setUserToken.bind(component))
        .then((comp) => {
          expect(comp.token).to.be.equal('123456789');
          done();
        });

      requests[0].respond(200, {
          'Content-Type': 'application/json'
        },
        '{"token": "123456789", "expires": 100, "user": {}}');
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
  });
});
