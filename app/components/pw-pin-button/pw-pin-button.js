/**
 * A Component like a Pinterest 'Pin' button
 */

import R from 'ramda';
import IO from '../../lib/IO/IO.js';
import Helpers from '../../lib/Helpers/Helpers.js';
import ClassList from '../../lib/CSSClassList/CSSClassList.js';
import HTMLFunctional from '../../lib/HTMLFunctinal/HTMLFunctional.js';

/**************************Helpers****************************/

// jscs:disable
const compose = R.compose,
  curry = R.curry,
  get = R.prop,
  nth = R.nth;

const map = Helpers.map,
  trace = Helpers.trace;

const setInnerHTML = HTMLFunctional.setInnerHTML,
 setAttr = HTMLFunctional.setAttr;

class PwPinButton extends HTMLButtonElement {

  /*
   * Initial function called when the component is created
   */
  createdCallback() {

    /*********************Pure Functions**********************/

    const pinButton = this;
    const shadow = (elem) => (IO.of(elem.createShadowRoot())),
      strComponent = this.getTemplateHtml() + this.getTemplateStyle();

    /********************Impure Functions*********************/

    const impure = compose(map(setInnerHTML(strComponent)), shadow);
    impure(pinButton).runIO();

  }

  /*
   * Function called when the component is attached to the DOM
   */
  attachedCallback() {
    const eventObs = Helpers.event('click');
    const checkElement = (elem) => (IO.of(this.toggleStatus()));
    const impure = eventObs(this).map(get('target')).map(checkElement);

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
      ClassList(this.getLikeDiv().runIO()).toggle('active');
    }
  }

  toggleStatus() {
   
    this.getAttribute('status') === 'checked' ?
      setAttr(this, 'status', 'not-checked') :
      setAttr(this, 'status', 'checked');
  }

  getLikeDiv() {
    let impure = compose(map(nth(1)),
      map(get('childNodes')),
      map(nth(0)),
      map(get('childNodes')),
      IO.of);
    return impure(this.shadowRoot);
  }

  getTemplateHtml() {
    return `<div class='like'>
              <button class='like-toggle three'>❤</button>
            </div>`;
  }

  getTemplateStyle() {
    return `<style>
      .like {
        display: inline-block;
      }
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
