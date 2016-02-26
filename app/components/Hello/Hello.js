/**
 * A component to greet users
 */

import DOM from '../../lib/DOM/DOM.js';
import M from 'monet';
import R from 'ramda';

/**************************Helpers****************************/

// jscs:disable
const compose = R.compose,
  get = R.prop,
  curry = R.curry,
  IO = M.IO,
  map = R.curry((f, container) => (container.map(f))),
  chain = R.curry((f, container) => (container.chain(f)));

// jscs:disable
class Hello extends HTMLElement {

  /*
   * Initial function called when the component is created
   */
  createdCallback() {

    /***********************Pure Functions*************************/

    // createAuxDiv :: [Node] -> IO(HTMLDivElement)
    const createAuxDiv = function (arr) {
      return DOM.createHtmlElement('div')
        .bind((div) => (DOM.setInnerHtml(div, (arr[0] + arr[1]))));
    };

    // getChildNodes :: HTMLDivElement -> [Node]
    const getChildNodes = get('childNodes');

    // copyDivChildsToTemplate :: [Node] -> IO(HTMLTemplateElement)
    const copyDivChildsToTemplate = function copyDivChildsToTemplate(nodes) {
      const arrayNodes = Array.from(nodes);
      return DOM.createHtmlElement('template')
        .bind((template) => (
          IO(() => {
            arrayNodes.map((node) => (template.content.appendChild(node)));
            return template;
          })
        ));
    };

    // getTemplateContent :: HTMLTemplateElement -> HTMLTemplateElement.content
    const getTemplateContent = get('content');

    // cloneTemplateContent :: HTMLTemplateElement.content -> HTLMTemplateElement.content
    const cloneTemplateContent = DOM.clone;

    // appendContentToShadowDom :: (HTMLElement,  HTMLTemplateElement.content) -> IO(void)
    const appendContentToShadowDom = curry((component, content) => (
      DOM.createShadowDom(component)
      .bind((shadow) => (DOM.append(shadow, content)))
    ));

    /**********************Impure Functions*************************/

    const createWebComponent = compose(chain(appendContentToShadowDom(this)),
      chain(cloneTemplateContent),
      map(getTemplateContent),
      chain(copyDivChildsToTemplate),
      map(getChildNodes),
      createAuxDiv);

    //Create Web Components
    createWebComponent([this.getTemplateHtml(), this.getTemplateStyle()])
      .run();
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

