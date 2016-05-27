import R from 'ramda';
import IO from '../../lib/IO/IO';
import HTMLFunctional from '../../lib/HTMLFunctinal/HTMLFunctional';

const compose = R.compose;
const curry = R.curry;
const map = R.map;
const filter = R.filter;
const isNil = R.isNil;
const isEmpty = R.isEmpty;

const getElementByTagName = HTMLFunctional.getElementByTagName;
const getElementsByTagName = HTMLFunctional.getElementsByTagName;

// _getProjectId :: HTMLElement -> IO(String)
const _getProjectId = compose(map((component) => component.projectId),
  IO.of);

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
