import Observable from './Observable.js';
import chai from 'chai';

describe('Observable => ', () => {
  it('Test should store function', () => {
    let observable = new Observable();
    let observers = [function () {}, function () {}, function () {}, function () {}];

    observable.observe('click', observers[0]);
    observable.observe('click', observers[1]);
    observable.observe('mouseover', observers[2]);
    observable.observe('mouseover', observers[3]);

    expect(observers[0]).to.be.equal(observable.observers.click[0]);
    expect(observers[1]).to.be.equal(observable.observers.click[1]);
    expect(observers[2]).to.be.equal(observable.observers.mouseover[0]);
    expect(observers[3]).to.be.equal(observable.observers.mouseover[1]);
  });

  it('Test should return true when has observer', () => {
    let observable = new Observable();
    let observer = function () {
      return 'ANUS';
    };

    observable.observe('event', observer);

    expect(observable.hasObserver('event', observer)).to.be.equal(true);
  });

  it('Test should return false when no observers', () => {
    let observable = new Observable();
    let observer = function () {};

    expect(observable.hasObserver('event', observer)).to.be.equal(false);
  });

  it('Test should call all observers', () => {
    let observable = new Observable();
    let observer1 = function () {
      observer1.called = true;
    };

    let observer2 = function () {
      observer2.called = true;
    };

    observable.observe('event', observer1);
    observable.observe('event', observer2);
    observable.notify('event');

    expect(observer1.called).to.be.true;
    expect(observer2.called).to.be.true;
  });

  it('Test should pass through arguments', () => {
    let observable = new Observable();
    let actual;

    observable.observe('event', (...args) => {
      actual = args;
    });
    observable.notify('event', 'String', 1, 32);

    expect('String').to.be.equal(actual[0]);
    expect(1).to.be.equal(actual[1]);
    expect(32).to.be.equal(actual[2]);
  });

  it('Test should throw for uncallable observer', () => {
    let obs = new Observable();

    try {
      obs.observe('event', {});
    } catch (e) {
      expect(e).to.be.an('error');
      expect(e.message).to.be.equal('Argument should be a Function');
    }
  });

  it('Test should notify all even when some fail', () => {
    let obs = new Observable();
    let observer1 = function () {
      throw new Error('ANUS');
    };

    let observer2 = function () {
      observer2.called = true;
    };

    let observer3 = function () {
      throw new Error('ANUS');
    };

    let observer4 = function () {
      observer4.called = true;
    };

    obs.observe('click', observer1);
    obs.observe('click', observer2);
    obs.observe('mouseover', observer3);
    obs.observe('mouseover', observer4);

    obs.notify('click');
    obs.notify('mouseover');

    expect(observer2.called).to.be.equal(true);
    expect(observer4.called).to.be.equal(true);
  });
});
