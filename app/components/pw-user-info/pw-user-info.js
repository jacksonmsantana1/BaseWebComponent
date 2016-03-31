/**
 * Component that will be the interface between the front and the backend
 */

import EventEmitter from 'wolfy87-eventemitter';
import Request from '../../lib/Request/Request.js';

class PwInfoUser extends HTMLElement {
  createdCallback() {
    this.eventEmitter = new EventEmitter();
    this.addEventEmitter('pin', this.pinned);
    this.token = '';
  }

  detachedCallback() {}

  attachedCallback() {}

  attributeChangedCallback() {}

  /***************Token Validation**********************/

  validate(user) {
    return this.validateUser(user)
      .then(this.getResponseToken)
      .then(this.setUserToken)
      .catch(this.logError('validate()', '/validation'));
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

  setUserToken(token) {
    window.localStorage.setItem('token', token);
    return Promise.resolve(token);
  }

  getUserToken() {
    return window.localStorage.getItem('token');
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

  pinned(id) {
    return Request.sendJSON('/user/projects/pinned', {
      token: this.token,
      projectId: id,
    });
  }

  /****************LOGGER*********************************/

  logError(fn, urlRequest) {
    return function (err) {
      console.log('/****************ERROR******************/\n');
      console.log('-> Function: ' + fn + '\n');
      console.log('-> -> Url Request: ' + urlRequest + '\n');
      console.log('-> -> -> Request Status: ' + err.status + '\n');
      console.log('-> -> -> Message: ' + err.message);
      return Promise.reject(err);
    };
  }

}

document.registerElement('pw-user-info', PwInfoUser);
export
default PwInfoUser;
