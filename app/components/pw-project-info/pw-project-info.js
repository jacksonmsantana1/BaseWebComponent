/**
 * Component that will be the interface between the front and the backend
 */

//import Request from '../../lib/Request/Request.js';
//import Logger from '../../lib/Logger/Logger.js';
//import R from 'ramda';

//const contain = R.indexOf;
//const get = R.prop;

class PwProjectInfo extends HTMLElement {

  /*******************Inherited Methods*********************/

  createdCallback() {
    this.addEventListener('like', this.liked);
  }

  detachedCallback() {}

  attachedCallback() {}

  attributeChangedCallback() {}

  /************************Methods***************************/

  liked(evt) {
    console.log(evt.target);
  }
}

document.registerElement('pw-project-info', PwProjectInfo);
export
default PwProjectInfo;
