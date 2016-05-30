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
const compose = R.compose;
const curry = R.curry;
const get = R.prop;
const tap = R.tap;
const concat = R.concat;
const nth = R.nth;
const equals = R.equals;
const isNil = R.isNil;
const isEmpty = R.isEmpty;
const is = R.is;

const map = Helpers.map;
const event = Helpers.event;

const setInnerHTML = HTMLFunctional.setInnerHTML;
const setAttr = HTMLFunctional.setAttr;
const getAttr = HTMLFunctional.getAttr;
const getElementByTagName = HTMLFunctional.getElementByTagName;
const createShadowDom = HTMLFunctional.createShadowDom;

const getProjectId = compose(map(getAttr('projectId')), IO.of);
const getPwUserInfo = Helpers.getPwUserInfo;
const getPwProjectInfo = Helpers.getPwProjectInfo;
const emitCustomEvent = Helpers.emitCustomEvent;
const createCustomEvent = Helpers.createCustomEvent;

class PwPinButton extends HTMLButtonElement {

  /*********************Inherited Methods****************************/

  /*
   * Initial function called when the component is created
   */
  createdCallback() {

    /*********************Pure Functions**********************/

    // pinButton :: PwPinButton
    const pinButton = this;

    // templateHtml :: String
    const templateHtml = this.getTemplateHtml();

    // templateStyle :: String
    const templateStyle = this.getTemplateStyle();

    // setInnerShadow :: (String, String) -> Function(ShadowRoot)
    const setInnerShadow = compose(setInnerHTML, concat);

    /********************Impure Functions*********************/

    const impure = compose(map(setInnerShadow(templateHtml, templateStyle)),
      map(createShadowDom),
      IO.of);

    impure(pinButton).runIO();

    // Attributes declaration
    this._projectId = 'VAITOMARNOCU';
    this._visible = true;
    this._status = 'not-checked';
  }

  /*
   * Function called when the component is attached to the DOM
   */
  attachedCallback() {

    /********************Pure Functions*********************/

    // pinButton :: PwPinButton
    const pinButton = this;

    // set :: HTMLElement -> _
    const set = setAttr(pinButton);

    // setProjectId :: HTMLElement -> _
    const setProjectId = compose(set('projectId'), getAttr('projectId'));

    // setVisible :: HTMLElement -> _
    const setVisible = compose(set('visible'), getAttr('visible'));

    // eventObs :: HTMLElement -> EventStream
    const eventObs = event('click');

    // checkElement :: HTMLElement -> IO(_)
    const checkElement = (elem) => (IO.of(this.toggleStatus()));

    /*********************Impure Functions**********************/

    const impure = eventObs(this)
      .map(get('target'))
      .map(checkElement);

    impure.subscribe((elem) => {
      if (this.status === 'checked') {
        Promise.all([this.getPwProjectInfo(), this.getPwUserInfo()])
          .then((arr) => this.pin(arr[0], arr[1]))
          .then(map((io) => { io.runIO(); }))
          .catch(console.log);
      }

      elem.runIO();
    });

    // Setting attributes
    setProjectId(pinButton);
    setVisible(pinButton);
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
      this.style.display = (newValue === 'false') ? 'none' : '';
    } else if (attrName === 'projectId') {
      setAttr(this, 'projectId', newValue);
    }
  }

  /*****************************Toggles*******************************/

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

  /**
   * This function toggles the component attribute active
   */
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

  /****************************Getters*********************************/

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
   * Return the pw-project-info component with the same id with this component
   */
  getPwProjectInfo() {
    return new Promise((resolve, reject) => {
      const component = getPwProjectInfo(this.projectId);

      if (is(Error, component)) {
        reject(component);
      }

      resolve(component);
    });
  }

  /**
   * Return the pw-user-info component
   */
  getPwUserInfo() {
    return new Promise((resolve, reject) => {
      const component = getPwUserInfo(document).runIO();

      if (isNil(component)) {
        reject(new Error('pw-user-info component was not found'));
      }

      resolve(component);
    });
  }

  /*****************************Main Methods***************************/

  /**
   * Warn the other components when it's 'pin' (clicked)
   */
  pin(pwProjectInfo, pwUserInfo) {
    const events = [];

    if (isNil(pwProjectInfo)) {
      return new Error('pwProjectInfo argument is null');
    } else if (isEmpty(pwProjectInfo)) {
      return new Error('pwProjectInfo argument is an empty object');
    } else if (pwProjectInfo.constructor.name !== 'pw-project-info') {
      return new Error('pwProjectInfo argument is from an invalid class');
    } else if (pwProjectInfo.id !== this.projectId) {
      return new Error('Invalid project id');
    }

    if (isNil(pwUserInfo)) {
      return new Error('pwUserInfo argument is null');
    } else if (isEmpty(pwUserInfo)) {
      return new Error('pwUserInfo argument is an empty object');
    } else if (pwUserInfo.constructor.name !== 'pw-user-info') {
      return new Error('pwUserInfo argument is from an invalid class');
    }

    const evt1 = compose(IO.of, emitCustomEvent(pwProjectInfo),
      createCustomEvent('pin', { projectId: this.projectId }));
    events.push(evt1(false, true));

    const evt2 = compose(IO.of, emitCustomEvent(pwUserInfo),
      createCustomEvent('pin', { projectId: this.projectId }));
    events.push(evt2(false, true));

    return events;
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

  /*************************Html and CSS*************************/

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

  /*************************Getters and Setters*************************/

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
    this._projectId = pId;
    this.setAttribute('projectId', pId);
  }

  /**
   * Return the visible attribute
   */
  get visible() {
    return this._visible;
  }

  /**
   * Set the visible attribute
   */
  set visible(visible) {
    this._visible = visible;
    this.setAttribute('visible', visible);
  }

  /**
   * Return the status attribute
   */
  get status() {
    return this._status;
  }

  /**
   * Set the status attribute
   */
  set status(status) {
    this._status = status;
    this.setAttribute('status', status);
  }
}

document.registerElement('pw-pin-button', PwPinButton);
export
default PwPinButton;
