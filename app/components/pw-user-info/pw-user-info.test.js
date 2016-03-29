import expect from 'expect.js';
import EventEmitter from 'wolfy87-eventemitter';
import PwUserInfo from './pw-user-info.js';

describe('pw-user-info', () => {
  let component;

  beforeEach(() => {
    component = document.createElement('pw-user-info');
  });

  afterEach(() => {
    sinon.restore();
  });

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
    console.log(listeners);
    component.emit('pin', {
      test: 'SPY',
    });

    expect(spy.called).to.be.equal(true);
    expect(spy.args[0][0].test).to.be.equal('SPY');
  });

});
