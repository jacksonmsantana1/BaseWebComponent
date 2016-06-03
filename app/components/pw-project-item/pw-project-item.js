/**
 * Component that will be like a pinterest card containing the a patchwork project
 * informations
 */

import R from 'ramda';
import Helpers from '../../lib/Helpers/Helpers';

//const contain = R.indexOf;
//const get = R.prop;
const is = R.is;

const getPwProjectInfo = Helpers.getPwProjectInfo;

class PwProjectItem extends HTMLDivElement {

  /******************Inherited Methods*************/

  createdCallback() {
    this._id = 'VAITOMARNOCU';

    this._pwProjectInfo = document.createElement('pw-project-info');
    this.appendChild(this._pwProjectInfo);
  }

  detachedCallback() {}

  attachedCallback() {
    this._pwProjectInfo.id = this.id;
  }

  /*eslint no-unused-vars:1*/
  attributeChangedCallback(attrName, newValue, oldValue) {}

  /********************Getters***********************/

  /**
   * Returns the pw-project-info component
   */
  getPwProjectInfo() {
    return this._pwProjectInfo;
  }

  /******************Getters and setters*************/

  get id() {
    return this._id;
  }

  set id(_id) {
    this._id = _id;
  }
}

document.registerElement('pw-project-item', PwProjectItem);
export
default PwProjectItem;
