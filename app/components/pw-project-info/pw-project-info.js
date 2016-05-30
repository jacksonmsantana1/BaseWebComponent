/**
 * Component that will be the interface between the front and the backend
 */

//import Logger from '../../lib/Logger/Logger.js';
import R from 'ramda';
import Request from './../../lib/Request/Request';
import Logger from '../../lib/Logger/Logger';
import Token from './../../lib/Token/Token';

//const contain = R.indexOf;
const get = R.prop;
const isNil = R.isNil;

//
const putJSON = (url, data) =>
  Request.putJSON(url, data, Token.getUserToken());

const getJSON = (url) => Request.getJSON(url, Token.getUserToken());

class PwProjectInfo extends HTMLElement {

  constructor(id) {
    super();
    this._id = id || '';
  }

  /*******************Inherited Methods*********************/

  createdCallback() {
    this.addEventListener('like', this.liked);
    this.addEventListener('dislike', this.disliked);
    this.addEventListener('pin', this.pinned);
  }

  detachedCallback() {}

  attachedCallback() {}

  attributeChangedCallback() {}

  /************************Main Methods***************************/

  liked(evt) {
    let url;
    let data;

    return new Promise((resolve, reject) => {
      if (!evt || evt.type !== 'like') {
        reject(new Error('Invalid Event'));
      } else if (isNil(evt.detail)) {
        reject(new Error('Missing Event Detail'));
      } else if (evt.detail.projectId !== this.id) {
        reject(new Error('Invalid Event Detail'));
      }

      url = '/projects/' + evt.detail.projectId + '/liked';
      data = { projectId: evt.detail.projectId }; //FIXME - Dont need the data object

      putJSON(url, data)
        .then(resolve)
        .catch(Logger.error('liked()', '/projects/{id}/liked'));
    });
  }

  disliked(evt) {
    let url;
    let data;

    return new Promise((resolve, reject) => {
      if (!evt || evt.type !== 'dislike') {
        reject(new Error('Invalid Event'));
      } else if (isNil(evt.detail)) {
        reject(new Error('Missing Event Detail'));
      } else if (evt.detail.projectId !== this.id) {
        reject(new Error('Invalid Event Detail'));
      }

      url = '/projects/' + evt.detail.projectId + '/disliked';
      data = { projectId: evt.detail.projectId }; //FIXME - Dont need the data object

      putJSON(url, data)
        .then((res) => resolve(res))
        .catch(Logger.error('liked()', '/projects/{id}/disliked'));
    });
  }

  pinned(evt) {
    let url;
    let data;

    return new Promise((resolve, reject) => {
      if (!evt || evt.type !== 'pin') {
        reject(new Error('Invalid Event'));
      } else if (isNil(evt.detail)) {
        reject(new Error('Missing Event Detail'));
      } else if (evt.detail.projectId !== this.id) {
        reject(new Error('Invalid Event Detail'));
      }

      url = '/projects/' + evt.detail.projectId + '/pinned';
      data = { projectId: evt.detail.projectId }; //FIXME - Dont need the data object

      putJSON(url, data)
        .then((res) => resolve(res))
        .catch(Logger.error('pinned()', '/projects/{id}/pinned'));
    });
  }

  /*****************************Getters*******************************/

  getProject() {
    let url;
    return new Promise((resolve, reject) => {
      url = '/projects/' + this.id;
      getJSON(url)
        .then(get('body'))
        .then(resolve)
        .catch(reject);
    });
  }

  /***************************Getters and Setters*********************/

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }
}

document.registerElement('pw-project-info', PwProjectInfo);
export
default PwProjectInfo;
