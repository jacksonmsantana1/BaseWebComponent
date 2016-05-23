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

class PwProjectInfo extends HTMLElement {

  constructor() {
    super();
    this._project = {};
  }

  /*******************Inherited Methods*********************/

  createdCallback() {
    this.addEventListener('like', this.liked);
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
      } else if (evt.detail.projectId !== this._project.id) {
        reject(new Error('Invalid Event Detail'));
      }

      url = '/projects/' + evt.detail.projectId + '/liked';
      data = { projectId: evt.detail.projectId }; //FIXME

      putJSON(url, data)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  get project() {
    return this._project;
  }

  set project(project) {
    this._project = project;
  }
}

document.registerElement('pw-project-info', PwProjectInfo);
export
default PwProjectInfo;
