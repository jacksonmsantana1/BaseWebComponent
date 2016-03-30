/**
 * Component that will be the interface between the front and the backend
 */

import EventEmitter from 'wolfy87-eventemitter';
import Request from '../../lib/Request/Request.js';

class PwInfoUser extends HTMLElement {
  createdCallback() {
    this.eventEmitter = new EventEmitter();
    this.addEventEmitter('pin', (obj) => (obj));
  }

  detachedCallback() {}

  attachedCallback() {}

  attributeChangedCallback() {}

  validateUser(user) {
    return Request.sendJSON('/user', user);
  }

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

}

document.registerElement('pw-user-info', PwInfoUser);
export default PwInfoUser;
