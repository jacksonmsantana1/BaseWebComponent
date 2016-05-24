/**
 * Component that will be the interface between the front and the backend
 */

//import Request from '../../lib/Request/Request.js';
//import Logger from '../../lib/Logger/Logger.js';
import R from 'ramda';
import Request from './../../lib/Request/Request';
import Token from './../../lib/Token/Token';

//const contain = R.indexOf;
//const get = R.prop;
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
  }

  detachedCallback() {}

  attachedCallback() {}

  attributeChangedCallback() {}

  /************************Methods***************************/

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
      data = { projectId: evt.detail.projectId }; //FIXME

      putJSON(url, data)
        .then(resolve)
        .catch(reject);
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
      data = { projectId: evt.detail.projectId }; //FIXME

      putJSON(url, data)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  getProject() {
    let url;
    return new Promise((resolve, reject) => {
      url = '/projects/' + this.id;
      getJSON(url)
        .then(resolve)
        .catch(reject);
    });
  }

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
