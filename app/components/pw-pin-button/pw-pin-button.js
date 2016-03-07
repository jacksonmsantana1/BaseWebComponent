/**
 * A Component like a Pinterest 'Pin' button
 */

import R from 'ramda';
import IO from '../../lib/IO/IO.js';
import Helpers from '../../lib/Helpers/Helpers.js';
import ClassList from '../../lib/CSSClassList/CSSClassList.js';

/**************************Helpers****************************/

// jscs:disable
const compose = R.compose,
  curry = R.curry,
  get = R.prop,
  map = Helpers.map,
  trace = Helpers.trace;

class PwPinButton extends HTMLButtonElement {

  /*
   * Initial function called when the component is created
   */
  createdCallback() {

    /*********************Pure Functions**********************/

    const pinButton = this;
    const shadow = (elem) => (IO.of(elem.createShadowRoot())),
      /*eslint no-param-reassign:0*/
      setInnerHtml = curry((strHtml, elem) => {
        elem.innerHTML = strHtml;
        return elem;
      }),
      strComponent = this.getTemplateHtml() + this.getTemplateStyle();

    /********************Impure Functions*********************/

    const impure = compose(map(setInnerHtml(strComponent)), shadow);
    impure(pinButton).runIO();

  }

  /*
   * Function called when the component is attached to the DOM
   */
  attachedCallback() {
    const eventObs = Helpers.event('click');
    const checkElement = (elem) => (IO.of(this.toggleStatus()));
    const impure = eventObs(this).map(get('target')).map(checkElement);

    this.setAttribute('status', 'not-checked');
    impure.subscribe((elem) => {
      elem.runIO();
    });
  }

  /*
   * Function called when the component is detached from the DOM
   */
  detachedCallback() {}

  /*
   * Function called when some attribute from the component is changed
   */
  /*eslint no-unused-vars: 0*/
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === 'status') {
      console.log('oldvalue: ' + oldValue + ' , newValue: ' + newValue);
    }
  }

  toggleStatus() {
    let status = this.getAttribute('status');
    let div = this.shadowRoot.childNodes[0].childNodes[1];
    console.log(div);
    ClassList(div).toggle('active');
    if (status === 'checked') {
      this.setAttribute('status', 'not-checked');
    } else {
      this.setAttribute('status', 'checked');
    }
  }

  getTemplateHtml() {
    return `<div class='like'>
              <button class='like-toggle three'>❤</button>
            </div>`;
  }

  getTemplateStyle() {
    return `<style>
      .like-toggle {
        border: none;
        outline: none;
      }

    .meta {
      color: white;
      font-family: 'Open Sans', sans-serif;
      font-size: 24px;
      margin: 0;
      color: #111;
    }

    .meta.hidden {
      margin-bottom: 28px;
    }

    .hidden {
      font-size: 0;
    }

    .three {
      width: 50px;
      height: 50px;
      border-radius: 100px;
      background: #eee;
      color: #666;
      font-size: 25px;
    }

    .three.active {
      width: 80px;
      color: #F26D7D;
      font-size: 30px;
      animation: expand 0.7s ease;
      -webkit-animation: expand 0.7s ease;
    }

    @keyframes beat {
      0% {font-size: 25px;}
        25% {font-size: 1px;}
        50% {font-size: 25px;}
      75% {font-size: 1px;}
      100% {font-size: 25px;}
    }

    @-webkit-keyframes beat {
      0% {font-size: 25px;}
        25% {font-size: 1px;}
        50% {font-size: 25px;}
      75% {font-size: 1px;}
      100% {font-size: 25px;}
    }

    @keyframes expand {
      0% {width: 50px;}
      100% {width: 80px;}
    }

    .like-toggle:hover {
      background: #ddd;
    }
    `;
  }
}

document.registerElement('pw-pin-button', PwPinButton);
export
default PwPinButton;
