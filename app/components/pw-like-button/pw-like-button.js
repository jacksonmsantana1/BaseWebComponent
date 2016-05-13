// jscs:disable
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
  tap = R.tap,
  concat = R.concat,
  nth = R.nth,
  equals = R.equals;

const map = Helpers.map,
  event = Helpers.event;

const setInnerHTML = HTMLFunctional.setInnerHTML,
  setAttr = HTMLFunctional.setAttr,
  getAttr = HTMLFunctional.getAttr,
  getElementByTagName = HTMLFunctional.getElementByTagName,
  createShadowDom = HTMLFunctional.createShadowDom;

// getProjectId :: HTMLElement -> IO(String)
const getProjectId = compose(map(getAttr('projectId')),
  IO.of);

class PwLikeButton extends HTMLButtonElement {
  /*
   * Initial function called when the component is created
   */
  createdCallback() {

    /*********************Pure Functions**********************/

    // likeButton :: PwPinButton
    const likeButton = this;

    // set :: HTMLElement -> _
    const set = setAttr(likeButton);

    // setProjectId :: HTMLElement -> _
    const setProjectId = compose(set('projectId'), getAttr('projectId'));

    // templateHtml :: String
    const templateHtml = this.getTemplateHtml();

    // templateStyle :: String
    const templateStyle = this.getTemplateStyle();

    // setInnerShadow :: (String, String) -> Function(ShadowRoot)
    const setInnerShadow = compose(setInnerHTML, concat);

    /********************Impure Functions*********************/

    const impure = compose(map(setInnerShadow(templateHtml, templateStyle)),
      map(createShadowDom),
      map(tap(setProjectId)),
      IO.of);

    impure(likeButton).runIO();
  }

  /*
   * Function called when the component is attached to the DOM
   */
  attachedCallback() {
    this._projectId = 'VAITOMARNOCU';
    this._isActive = true;
    this._liked = false;
  }

  /*
   * Function called when the component is detached from the DOM
   */
  detachedCallback() {}

  /*
   * Function called when some attribute from the component is changed
   */
  /*eslint no-unused-vars: 0*/
  attributeChangedCallback(attrName, oldValue, newValue) {}

  /**
   * Return the component Html in string
   */
  getTemplateHtml() {
    return `<div class='like'>
              <button class='like-toggle basic'>❤</button>
              <span class='hidden'>I like this</span>
            </div>`;
  }

  /**
   * Return the component StyleSheet in String
   */
  getTemplateStyle() {
    return `<style>
      *{transition: all 0.3s linear;}

      .hidden{
        font-size: 0;
      }

      .like,p{
        font-family: 'Open Sans';
      }

      .like-toggle{
        outline:none;
        box-shadow:none;
        border: none;
        width: 30px;
        height: 30px;
        font-size: 1.5em;
        border-radius: 100px;
      }

      .like-toggle.basic{
        border: none;
        width: 50px;
        height: 50px;
        font-size: 1.5em;
        border-radius: 100px;
        background: #eee;
        color: #666;
      }

      .like-active.basic{
        background: #F06EA9;
      }

      .like-toggle.basic:not(.like-active):hover{
        background: #438CCA;
        width: 60px;
      }
    </style>`;
  }

  /**
   * Return the active attribute
   */
  get isActive() {
    return this._isActive;
  }

  /**
   * Set the active attribute
   */
  set isActive(active) {
    this.setAttribute('isActive', active);
  }

  /**
   * Return the propertyId attribute
   */
  get projectId() {
    return this._projectId;
  }

  /**
   * Set the propertyId attribute
   */
  set projectId(pId) {
    this.setAttribute('projectId', pId);
  }

  /**
   * Return the liked attribute
   */
  get liked() {
    return this._liked;
  }

  /**
   * Set the liked attribute
   */
  set liked(isLiked) {
    this.setAttribute('liked', isLiked);
  }
}

document.registerElement('pw-like-button', PwLikeButton);
export
default PwLikeButton;
