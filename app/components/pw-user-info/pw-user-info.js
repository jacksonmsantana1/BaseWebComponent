/**
 * Component that will be the interface between the front and the backend
 */

import EventEmitter from 'wolfy87-eventemitter';
import Request from '../../lib/Request/Request.js';
import Logger from '../../lib/Logger/Logger.js';
import R from 'ramda';
import Token from '../../lib/Token/Token.js';

const contain = R.indexOf;
const get = R.prop;

class PwInfoUser extends HTMLElement {
  createdCallback() {
    this.eventEmitter = new EventEmitter();
    this.addEventEmitter('pin', this.pinned);
    this.addEventEmitter('despin', this.desPinned);
    this.addEventEmitter('isPinned', this.isPinned);
  }

  detachedCallback() {}

  attachedCallback() {}

  attributeChangedCallback() {}

  /***************Token Validation**********************/

  validate(user) {
    return this.validateUser(user)
      .then(this.getResponseToken)
      .then(Token.setUserToken)
      .catch(Logger.error('validate()', '/validation'));
  }

  validateUser(user) {
    if (!!user && !user.password) {
      return Promise.reject(new Error('Only the email is given'));
    } else if (!!user && !user.email) {
      return Promise.reject(new Error('Only the password is given'));
    }

    return Request.sendJSON('/validation', user);
  }

  getResponseToken(res) {
    return Promise.resolve(JSON.parse(res.body).token);
  }

  /****************Event Emitter*************************/

  getEventEmitter() {
    return this.eventEmitter;
  }

  addEventEmitter(name, handler) {
    this.eventEmitter.addListener(name, handler);
    return this.eventEmitter;
  }

  emit(name, obj) {
    this.eventEmitter.emit(name, obj);
    return this.eventEmitter;
  }

  /*****************Pin Event*****************************/

  // pinned :: (Token, String) -> Promise(String, Error)
  pinned(token, id) {
    return Request.sendJSON('/user/projects/pinned', {
      [token]: token,
      projectId: id,
    }).catch(Logger.error('pinned()', '/user/projects/pinned'));
  }

  // desPinned :: (Token, String) -> Promise(String, Error)
  desPinned(token, id) {
    return Request.sendJSON('/user/projects/desPinned', {
      [token]: token,
      projectId: id,
    }).catch(Logger.error('desPinned()', '/user/projects/desPinned'));
  }

  // isPinned :: (Token, String) -> Boolean
  isPinned(token, projectId) {

    /************************Pure Functions**********************/

    // getUserProjects :: Token -> Promise(Object, Error)
    const getUserProjects = (tk) => Request.getJSON('/user/projects', tk);

    // getPinnedProjects :: Object -> Promise(Array)
    const getPinnedProjects = (obj) => Promise.resolve(get('pinned', obj.body));

    // containProject :: Array -> Promise(Number)
    const containProject = R.curry((id, arr) => (Promise.resolve(contain(id, arr))));

    // result :: Number -> Promise(Boolean)
    const result = (n) => (Promise.resolve(n !== -1));

    /************************Impure Functions*********************/

    const impure = getUserProjects(token)
      .then(getPinnedProjects)
      .then(containProject(projectId))
      .then(result)
      .catch(Logger.error('isPinned()', '/user/projects'));

    return impure;
  }

}

document.registerElement('pw-user-info', PwInfoUser);
export
default PwInfoUser;
