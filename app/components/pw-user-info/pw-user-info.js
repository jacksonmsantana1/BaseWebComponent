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
    this.validateUser(user)
      .then(this.getResponseToken)
      .catch(validationError)
      .then(this.setUserToken);gt
  }

  validationError(err) {
    if (err.status === 401 || err.status === 403) {
      this.emit('ValidationError', err.message);
    } else if (err.status === 400) {
      this.emit('ValidationError', err.message);
    } else if (err.status === 500) {
      this.emit('ValidationError', err.message);
    }
  }

  validateUser(user) {
    return Request.sendJSON('/user', user);
  }

  getResponseToken(res) {
    return Promise.resolve(JSON.parse(res.body).token);
  }

  setUserToken(token) {
    this.token = token;
    return Promise.resolve(this);
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

  pinned(projectId) {
    return Request.sendJSON('/user/projects/pinned', {
      token: this.token,
      projectId: projectId,
    });
  }

}

document.registerElement('pw-user-info', PwInfoUser);
export
default PwInfoUser;
