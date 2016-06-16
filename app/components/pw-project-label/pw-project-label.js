import R from 'ramda';
import IO from '../../lib/IO/IO.js';
import Helpers from '../../lib/Helpers/Helpers.js';
import HTMLFunctional from '../../lib/HTMLFunctinal/HTMLFunctional.js';

const compose = R.compose;
const concat = R.concat;

const map = Helpers.map;
const getPwProjectInfo = Helpers.getPwProjectInfo;

const setInnerHTML = HTMLFunctional.setInnerHTML;
const setAttr = HTMLFunctional.setAttr;
const createShadowDom = HTMLFunctional.createShadowDom;

class PwProjectLabel extends HTMLElement {

  /*********************Inherited Methods****************************/

  /*
   * Initial function called when the component is created
   */
  createdCallback() {

    this._name = '';
    this._type = '';

    /*********************Pure Functions**********************/

    // templateHtml :: String
    const templateHtml = this.getTemplateHtml();

    // templateStyle :: String
    const templateStyle = this.getTemplateStyle();

    // setInnerShadow :: (String, String) -> Function(ShadowRoot)
    const setInnerShadow = compose(setInnerHTML, concat);

    /********************Impure Functions*********************/

    const impure = compose(map(setInnerShadow(templateHtml, templateStyle)),
      map(createShadowDom),
      map(setInnerHTML(this.getInnerHtml())),
      IO.of);

    impure(this).runIO();
  }

  /*
   * Function called when the component is attached to the DOM
   */
  attachedCallback() {

    /********************Pure Functions*********************/

    // set :: HTMLElement -> _
    const set = setAttr(this);

    // setName :: String:name -> _
    const setName = set('name');

    // setType :: String:type -> _
    const setType = set('type');

    // Initial projectId value
    setName(this.name);
    setType(this.type);
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

  /*************************Html and CSS*************************/

  /**
   * Return the component inner html
   */
  getInnerHtml() {
    return `<div id="name">ANUS</div><div id="type">CU</div>`;
  }

  /**
   * Return the component Html in string
   */
  getTemplateHtml() {
    /*eslint quotes:0*/
    return `<div class="name"><content select="#name"></content></div>
            <div class="type"><content select="#type"></content></div>`;
  }

  /**
   * Return the component StyleSheet in String
   */
  getTemplateStyle() {
    /*eslint quotes:0*/
    return `<style>
      * {
        margin: 0;
      }
      .name {
        display: inline-block;
        font-size: 2em;
        padding-right: 20%;
        height: 100%;
      }
      .type {
        display: inline-block;
        font-size: 1.5em;
      }
    </style>`;
  }

  /*************************Getters and Setters*************************/

  /**
   * Return the name attribute
   */
  get name() {
    return this._name;
  }

  /**
   * Set the name attribute
   */
  set name(pId) {
    this._name = pId;
    this.setAttribute('name', pId);
  }

  /**
   * Return the type attribute
   */
  get type() {
    return this._type;
  }

  /**
   * Set the type attribute
   */
  set type(pId) {
    this._type = pId;
    this.setAttribute('type', pId);
  }
}

document.registerElement('pw-project-label', PwProjectLabel);
export
  default PwProjectLabel;
