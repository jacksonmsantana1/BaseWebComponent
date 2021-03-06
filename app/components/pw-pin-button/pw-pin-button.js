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

    // Attributes declaration
    this._projectId = 'VAITOMARNOCU';
    this._visible = true;
    this._status = 'not-checked';

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

    // setStatus :: HTMLElement -> _
    const setStatus = compose(set('status'), getAttr('status'));

    // eventObs :: HTMLElement -> EventStream
    const eventObs = event('click');

    // checkElement :: HTMLElement -> IO(_)
    const checkElement = (elem) => (IO.of(this.toggleStatus()));

    /*********************Impure Functions**********************/

    const impure = eventObs(this)
      .map(get('target'))
      .map(checkElement);

    // Updates the liked attribute
    this.getPwUserInfo()
      .then(pinButton.isPinned.bind(pinButton))
      .then((isPin) => {
        if (isPin) {
          pinButton.status = 'checked';
        }
      })
      .catch(console.log);

    impure.subscribe((elem) => {
      if (pinButton.status === 'checked') {
        Promise.all([pinButton.getPwProjectInfo(), pinButton.getPwUserInfo()])
          .then((arr) => pinButton.pin(arr[0], arr[1]))
          .then(map((io) => { io.runIO(); }))
          .catch(console.log);
      } else {
        Promise.all([pinButton.getPwProjectInfo(), pinButton.getPwUserInfo()])
          .then((arr) => pinButton.despin(arr[0], arr[1]))
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
    if (attrName === 'status') {
      this.toggleActive();
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
  despin(pwProjectInfo, pwUserInfo) {
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
      createCustomEvent('despin', { projectId: this.projectId }));
    events.push(evt1(false, true));

    const evt2 = compose(IO.of, emitCustomEvent(pwUserInfo),
      createCustomEvent('despin', { projectId: this.projectId }));
    events.push(evt2(false, true));

    return events;
  }

  /**
   * Check the component status
   */
  isPinned(pwUserInfo) {
    const pId = this.projectId;
    return new Promise((resolve, reject) => {
      if (isNil(pwUserInfo)) {
        reject(new Error('pwUserInfo argument is null'));
      } else if (isEmpty(pwUserInfo)) {
        reject(new Error('pwUserInfo argument is an empty object'));
      } else if (pwUserInfo.constructor.name !== 'pw-user-info') {
        reject(new Error('pwUserInfo argument is from an invalid class'));
      }

      pwUserInfo.isPinned(pId)
        .then(resolve)
        .catch(reject);
    });
  }

  /*************************Html and CSS*************************/

  /**
   * Return the component Html in string
   */
  getTemplateHtml() {
    return `<div class="like">
              <button class="like-toggle">❤</button>
            </div>`;
  }

  /**
   * Return the component StyleSheet in String
   */
  getTemplateStyle() {
    return `<style>
      *{transition: all 0.3s linear;}

      .like {
        font-family: 'Open Sans';
        display:inline-block;
      }

      .like-toggle {
        outline:none;
        box-shadow:none;
        border: none;
        width: 70px;
        height: 100%;
        font-size: 1em;
        border-radius: 10px;
        background: #eee;
        color: #666;
      }

      .like-toggle:hover {
        background: #ddd;
      }

      .active {
        width: 95px;
        background: #eee;
        color: #F26D7D;
      }

      .active:hover {
        background: #ddd;
      }

      .like-toggle.basic:not(.like-active):hover {
        background: #ddd;
      }
    </style>`;
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
