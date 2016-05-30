import R from 'ramda';
import IO from '../IO/IO';
import Rx from 'rx';
import HTMLFunctional from '../HTMLFunctinal/HTMLFunctional';

const isNil = R.isNil;
const isEmpty = R.isEmpty;
const curry = R.curry;
const compose = R.compose;
const filter = R.filter;

const getElementByTagName = HTMLFunctional.getElementByTagName;
const getElementsByTagName = HTMLFunctional.getElementsByTagName;

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

// _getPwProjectInfo :: Document -> IO(HTMLElement)
const _getPwProjectInfo = (id) => {
  if (isNil(id)) {
    return new Error('Missing ID argument');
  }

  const compareId = curry((cId, component) => (component.id === cId));
  const impure = compose(map(filter(compareId(id))),
    map(getElementsByTagName('pw-project-info')),
    IO.of);
  const result = impure(document).runIO();

  if (isEmpty(result)) {
    return new Error('pw-project-info not found');
  }

  return result[0];
};

// _getPwUserInfo :: Document -> IO(HTMLElement)
const _getPwUserInfo = compose(map(getElementByTagName('pw-user-info')), IO.of);

// _createCustomEvent :: String -> Object -> Boolean -> Boolean -> CustomEvent
const _createCustomEvent = curry((_name, _detail, _bubbles, _cancelable) =>
  new CustomEvent(_name, {
    detail: _detail,
    bubbles: _bubbles,
    cancelable: _cancelable,
  }));

// _emitCustomEvent :: Component -> Event -> _
const _emitCustomEvent = curry((obj, evt) => {
  obj.dispatchEvent(evt);
});

const Helpers = function () {};

Helpers.prototype.getPwProjectInfo = _getPwProjectInfo;
Helpers.getPwProjectInfo = Helpers.prototype.getPwProjectInfo;

Helpers.prototype.getPwUserInfo = _getPwUserInfo;
Helpers.getPwUserInfo = Helpers.prototype.getPwUserInfo;

Helpers.prototype.createCustomEvent = _createCustomEvent;
Helpers.createCustomEvent = Helpers.prototype.createCustomEvent;

Helpers.prototype.emitCustomEvent = _emitCustomEvent;
Helpers.emitCustomEvent = Helpers.prototype.emitCustomEvent;

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
