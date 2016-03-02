/**
 * A component to greet users
 */

import R from 'ramda';
import Monet from 'monet';

/**************************Helpers****************************/

// jscs:disable
const compose = R.compose,
  get = R.prop,
  curry = R.curry,
  tap = R.tap,
  IO = Monet.IO,
  trace = (x) => {
    console.log(x);
    return x;
  },
  map = curry((f, container) => (container.map(f))),
  chain = curry((f, container) => (container.chain(f)));

// jscs:disable
class Hello extends HTMLElement {

  /*
   * Initial function called when the component is created
   */
  createdCallback() {

      /***********************Pure Functions*************************/

      // createAuxDiv :: [String] -> IO(HTMLDivElement)
      const createAuxDiv = function(arr) {
        return IO(() => document.createElement('div')).chain((div) => {
          div.innerHTML = arr[0] + arr[1];
          console.log('createAuxDiv-> ' + div);
          return div;
        });
      };

      // getDivNodes :: HTMLDivElement -> [Node]
      const getDivNodes = get('childNodes');

      // setContentTemplate :: [Node] -> IO(HTMLTemplateElement)
      const setContentTemplate = function(nodes) {
        return IO(() => document.createElement('template')).chain((template) => {
          nodes.map((node) => {
            template.content.appendChild(node);
          });
          console.log('setContentTemplate() -> ' + template);
          return template;
        });
      }

      // getContentTemplate :: HTMLTemplateElement -> HTMLTemplateElement.content
      const getContentTemplate = get('content');

      // cloneContent ::  HTMLTemplateElement.content -> HTMLTemplateElement.content
      const cloneContent = (content) => {
          return () => {
            return document.importNode(content, true);
          }
        }
      // setShadowDom :: HTMLContentElement.content -> _
      const setShadowDom = (content) => {
        return IO(() => document.createShadowRoot()).chain((shadow) => {
          shadow.appendChild(content);
        });
      }

      /**********************Impure Functions*************************/

      let impure = compose(chain(setContentTemplate), map(get('childNodes')), createAuxDiv);

    }
    /*teElement.content
     *
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
