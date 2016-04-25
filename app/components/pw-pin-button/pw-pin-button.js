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
  trace = Helpers.trace,
  event = Helpers.event;

const setInnerHTML = HTMLFunctional.setInnerHTML,
  setAttr = HTMLFunctional.setAttr,
  getAttr = HTMLFunctional.getAttr,
  getElementByTagName = HTMLFunctional.getElementByTagName,
  createShadowDom = HTMLFunctional.createShadowDom;

// getProjectId :: HTMLElement -> IO(String)
const getProjectId = compose(map(getAttr('projectId')),
  IO.of);

// getPwUserInfo :: Document -> IO(HTMLElement)
const getPwUserInfo =
  compose(map(getElementByTagName('pw-user-info')),
    IO.of);

class PwPinButton extends HTMLButtonElement {

  /*
   * Initial function called when the component is created
   */
  createdCallback() {

    /*********************Pure Functions**********************/

    // pinButton :: PwPinButton
    const pinButton = this;

    // set :: HTMLElement -> _
    const set = setAttr(pinButton);

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

    impure(pinButton).runIO();
  }

  /*
   * Function called when the component is attached to the DOM
   */
  attachedCallback() {

    /********************Pure Functions*********************/

    // eventObs :: HTMLElement -> EventStream
    const eventObs = event('click');

    // checkElement :: HTMLElement -> IO(_)
    const checkElement = (elem) => (IO.of(this.toggleStatus()));

    /*********************Impure Functions**********************/

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
    if (attrName === 'status' && newValue === 'not-checked') {
      this.toggleActive();
      this.despin();
    } else if (attrName === 'status' && newValue === 'checked') {
      this.toggleActive();
      this.pin();
    } else if (attrName === 'visible') {
      this.style.display = !!newValue ? 'none' : '';
    }
  }

  /**
   * This function toggles the component attribute visible
   */
  toggleVisable() {

    /********************Pure Functions************************/

    const attrVisible = getAttr('visible');
    const equalToTrue = equals('true');
    const checkVisible = compose(equalToTrue, attrVisible);

    /*********************Impure Function**********************/

    const impure = (component) => {
      (checkVisible(component)) ? setAttr(component, 'visible', 'false') :
        setAttr(component, 'visible', 'true');
    };

    impure(this);
  }

  /**
   * This function toggles the component attribute status
   */
  toggleStatus() {

    /********************Pure Functions************************/

    const attrStatus = getAttr('status');
    const equalToChecked = equals('checked');
    const checkStatus = compose(equalToChecked, attrStatus);

    /*********************Impure Function**********************/

    const impure = (component) => {
      (checkStatus(component) ?
        setAttr(component, 'status', 'not-checked') :
        setAttr(component, 'status', 'checked'));
    };

    impure(this);
  }

  toggleActive() {

    /**************************Pure Functions***********************/

    // component :: HTMLElement
    const component = this;

    // getShadowRoot :: HTMLElement -> ShadowRoot
    const getShadowRoot = get('shadowRoot');

    // getDivLike :: ShadowRoot -> HTMLDivElement
    const getDivLike = component.getDivLike;

    // getDivStyleClass :: HTMLDivElement -> StyleClass
    const getDivStyleClass = ClassList;

    //toggleStyleClassProp :: String -> StyleClass -> _
    const toggleStyleClassProp = R.curry((str, styleClass) => {
      styleClass.toggle(str);
    });

    /**************************Impure Functions**********************/

    const impure = R.compose(map(toggleStyleClassProp('active')),
      map(getDivStyleClass),
      map(getDivLike),
      map(getShadowRoot),
      IO.of);

    impure(component).runIO();
  }

  /**
   * Return the div with class like that is in the ShadowRoot
   */
  getDivLike(shadowRoot) {

    /**********************Pure Function**************************/

    const pure = compose(nth(1),
      get('childNodes'),
      nth(0),
      get('childNodes'));

    return pure(shadowRoot);
  }

  /**
   * Warn the other components when it's 'pin' (clicked)
   */
  pin() {

    /***********************Pure Functions***********************/

    // pinned :: HTMLElement -> String -> _
    const pinned = curry((obj, pId) => {
      const evt = new CustomEvent('pin', {
        detail: {
          projectId: pId,
        },
        bubbles: false,
        cancelable: true,
      });
      obj.dispatchEvent(evt);
    });

    /***********************Impure Functions********************/

    IO.of(pinned).ap(getPwUserInfo(document)).ap(getProjectId(this)).runIO();
  }

  /**
   * Warn the others components when it's 'des' pin
   */
  despin() {

    /***********************Pure Functions***********************/

    // desPinned :: HTMLElement -> String -> _
    const desPinned = curry((obj, pId) => {
      const evt = new CustomEvent('despin', {
        detail: {
          projectId: pId,
        },
        bubbles: false,
        cancelable: true,
      });
      obj.dispatchEvent(evt);
    });

    /***********************Impure Functions********************/

    IO.of(desPinned).ap(getPwUserInfo(document)).ap(getProjectId(this)).runIO();
  }

  /**
   * Check the component status
   */
  isPinned() {

    /***********************Pure Functions***********************/

    // desPinned :: HTMLElement -> String -> _
    const isPinned = curry((obj, pId) => {
      const evt = new CustomEvent('isPin', {
        detail: {
          projectId: pId,
        },
        bubbles: false,
        cancelable: true,
      });

      obj.dispatchEvent(evt);
    });

    /***********************Impure Functions********************/

    IO.of(isPinned).ap(getPwUserInfo(document)).ap(getProjectId(this)).runIO();
  }

  /**
   * Return the component Html in string
   */
  getTemplateHtml() {
    return `<div class='like' >
              <button class='like-toggle three'>❤</button>
            </div>`;
  }

  /**
   * Return the component StyleSheet in String
   */
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
