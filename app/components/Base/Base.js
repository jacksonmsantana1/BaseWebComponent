/**
 * A component to greet users
 */

import R from 'ramda';
import IO from '../../lib/IO/IO.js';
import Helpers from '../../lib/Helpers/Helpers.js';

/**************************Helpers****************************/

// jscs:disable
const compose = R.compose,
  get = R.prop,
  curry = R.curry,
  tap = R.tap,
  map = Helpers.map,
  chain = Helpers.chain;

// jscs:disable
class Base extends HTMLElement {

  /*
   * Initial function called when the component is created
   */
  createdCallback() {

      /***********************Pure Functions*************************/

      /**********************Impure Functions*************************/

      let impure = '//TODO';

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

  /*
   * Return the component string html
   */
  getTemplateHtml() {

    return `<div class="outer">
              <div class="boilerplate">
                Hi! My name is
              </div>
              <div class="name">
                <content></content>
              </div>
            </div>`;

  }

  /*
   * Return the component string style
   */
  getTemplateStyle() {

    return `<style>
              .outer {
                border: 2px solid brown;
                border-radius: 1em;
                background: red;
                font-size: 20pt;
                width: 12em;
                height: 7em;
                text-align: center;
              }
              .boilerplate {
                color: white;
                font-family: sans-serif;
                padding: 0.5em;
              }
              .name {
                color: black;
                background: white;
                font-family: "Marker Felt", cursive;
                font-size: 45pt;
                padding-top: 0.2em;
              }
          </style>`;

  }
}

document.registerElement('pw-hello', Hello);

export
default Hello;
