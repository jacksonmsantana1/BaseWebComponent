import R from 'ramda';
import IO from '../../lib/IO/IO.js';
import Helpers from '../../lib/Helpers/Helpers.js';
import HTMLFunctional from '../../lib/HTMLFunctinal/HTMLFunctional.js';

const compose = R.compose;
const concat = R.concat;

const map = Helpers.map;

const setInnerHTML = HTMLFunctional.setInnerHTML;
const setAttr = HTMLFunctional.setAttr;
const createShadowDom = HTMLFunctional.createShadowDom;

class PwPanelButton extends HTMLButtonElement {

  /*********************Inherited Methods****************************/

  /*
   * Initial function called when the component is created
   */
  createdCallback() {

    /********************Impure Functions*********************/

    const impure = compose(map(createShadowDom), IO.of);

    impure(this).runIO();

    // Attributes declaration
  }

  /*
   * Function called when the component is attached to the DOM
   */
  attachedCallback() {

    /********************Pure Functions*********************/

    // set :: HTMLElement -> _
    const set = setAttr(this);
  }

  /*
   * Function called when the component is detached from the DOM
   */
  detachedCallback() {
  }

  /*
   * Function called when some attribute from the component is changed
   */
  /*eslint no-unused-vars: 0*/
  attributeChangedCallback(attrName, oldValue, newValue) {}
}

document.registerElement('pw-panel-button', PwPanelButton);
export
  default PwPanelButton;
