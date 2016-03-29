import R from 'ramda';
import Rx from 'rx';

/**
 *  Helpers Functions
 *
 *  ps: Don't need unit test.Functions already
 *  tested in others projects
 */

// map :: (ObjectA -> ObjectB), M -> M[ObjectB]
const map = R.curry((f, container) => (container.map(f)));

// chain :: (ObjectA -> ObjectB), M -> ObjectB
const chain = R.curry((f, container) => (container.chain(f)));

// join :: M -> M[M[ObjectA]] -> M[ObjectA]
const join = function (container) {
  return container.join();
};

// trace :: String -> Object -> Object
const trace = R.curry((tag, x) => {
  console.log(tag, x);
  return x;
});

// event :: String -> HTLMElement -> Observable
const event = R.curry((evt, el) => (Rx.Observable.fromEvent(el, evt)));

const Helpers = function () {};

Helpers.prototype.chain = chain;
Helpers.chain = Helpers.prototype.chain;

Helpers.prototype.map = map;
Helpers.map = Helpers.prototype.map;

Helpers.prototype.join = join;
Helpers.join = Helpers.prototype.join;

Helpers.prototype.trace = trace;
Helpers.trace = Helpers.prototype.trace;

Helpers.prototype.event = event;
Helpers.event = Helpers.prototype.event;

export
default Helpers;
