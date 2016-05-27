import R from 'ramda';
import IO from '../../lib/IO/IO';
import HTMLFunctional from '../../lib/HTMLFunctinal/HTMLFunctional';

const compose = R.compose;
const curry = R.curry;
const map = R.map;

const getElementByTagName = HTMLFunctional.getElementByTagName;

// _getProjectId :: HTMLElement -> IO(String)
const _getProjectId = compose(map((component) => component.projectId),
  IO.of);

// _getPwProjectInfo :: Document -> IO(HTMLElement)
const _getPwProjectInfo =
  compose(map(getElementByTagName('pw-project-info')),
    IO.of);

// _getPwUserInfo :: Document -> IO(HTMLElement)
const _getPwUserInfo =
  compose(map(getElementByTagName('pw-user-info')),
    IO.of);

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

export default {
  getProjectId: _getProjectId,
  getPwProjectInfo: _getPwProjectInfo,
  getPwUserInfo: _getPwUserInfo,
  createCustomEvent: _createCustomEvent,
  emitCustomEvent: _emitCustomEvent,
};
