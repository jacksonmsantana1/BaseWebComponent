/**
 * A Component like a Pinterest 'Pin' button
 */

import R from 'ramda';
import IO from '../../lib/IO/IO.js';
import Helpers from '../../lib/Helpers/Helpers.js';

/**************************Helpers****************************/

// jscs:disable
const compose = R.compose,
  curry = R.curry,
  map = Helpers.map;

class PwPinButton extends HTMLButtonElement {

  /*
   * Initial function called when the component is created
   */
  createdCallback() {

    /*********************Pure Functions**********************/

    /********************Impure Functions*********************/
  }

  /*
   * Function called when the component is attached to the DOM
   */
  attachedCallback() {}

  /*
   * Function called when the component is detached from the DOM
   */
  detachedCallback() {}

  /*
   * Function called when some attribute from the component is changed
   */
  /*eslint no-unused-vars: 0*/
  attributeChangedCallback(attrName, oldValue, newValue) {}

  getTemplateHtml() {
    return '';
  }

  getTemplateStyle() {
    return '';
  }
}

document.registerElement('pw-pin-button', PwPinButton);
export
default PwPinButton;
