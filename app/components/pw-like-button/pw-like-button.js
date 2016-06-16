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
const indexOf = R.indexOf;
const concat = R.concat;
const nth = R.nth;
const equals = R.equals;
const isEmpty = R.isEmpty;
const length = R.length;
const is = R.is;
const isNil = R.isNil;


const setInnerHTML = HTMLFunctional.setInnerHTML;
const setAttr = HTMLFunctional.setAttr;
const getAttr = HTMLFunctional.getAttr;
const getElementByTagName = HTMLFunctional.getElementByTagName;
const createShadowDom = HTMLFunctional.createShadowDom;

const map = Helpers.map;
const event = Helpers.event;
const createCustomEvent = Helpers.createCustomEvent;
const emitCustomEvent = Helpers.emitCustomEvent;
const getPwProjectInfo = Helpers.getPwProjectInfo;
const getPwUserInfo = Helpers.getPwUserInfo;
const getProjectId = Helpers.getProjectId;

class PwLikeButton extends HTMLButtonElement {

  /*********************Inherited Methods****************************/

  /*
   * Initial function called when the component is created
   */
  createdCallback() {

    // Init Attr
    this._projectId = 'VAITOMARNOCU';
    this._liked = false;
    this._numberOfLikes = 0;
    this._visible = true;

    /*********************Pure Functions**********************/

    // likeButton :: PwPinButton
    const likeButton = this;

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

    impure(likeButton).runIO();
  }

  /*
   * Function called when the component is attached to the DOM
   */
  attachedCallback() {
    // likeButton :: PwPinButton
    const likeButton = this;

    // set :: HTMLElement -> _
    const set = setAttr(likeButton);

    // setProjectId :: HTMLElement -> _
    const setProjectId = compose(set('projectId'), getAttr('projectId'));

    // setLiked :: HTMLElement -> _
    const setLiked = compose(set('liked'), getAttr('liked'));

    // setNumberOfLikes :: HTMLElement -> _
    const setNumberOfLikes = compose(set('numberOfLikes'), getAttr('numberOfLikes'));

    // setVisible :: HTMLElement -> _
    const setVisible = compose(set('visible'), getAttr('visible'));

    // eventObs :: HTMLElement -> EventStream
    const eventObs = event('click');

    // checkElement :: HTMLElement -> IO(_)
    const checkElement = (elem) => (IO.of(this.toggleLiked()));

    /**************************Impure**************************/

    // when component is cliked
    const impure = eventObs(this)
      .map(get('target'))
      .map(get('childNodes'))
      .map(nth(0))
      .map(checkElement);

    impure.subscribe((elem) => {
      //Emit Events
      if (likeButton.liked === 'true') {
        Promise.all([this.getPwProjectInfo(), this.getPwUserInfo()])
          .then((arr) => this.like(arr[0], arr[1]))
          .then(map((io) => { io.runIO(); }))
          .catch(console.log('onClickError'));
      } else {
        Promise.all([this.getPwProjectInfo(), this.getPwUserInfo()])
          .then((arr) => this.dislike(arr[0], arr[1]))
          .then(map((io) => { io.runIO(); }))
          .catch(console.log('onClickError'));
      }

      //Toggle Component attr
      elem.runIO();
    });

    // Updates the liked attribute
    this.getPwUserInfo()
      .then(this.isLiked.bind(this))
      .then(set('liked'))
      .catch((err) => console.log(err));

    // Set Attr
    setProjectId(likeButton);
    setLiked(likeButton);
    setNumberOfLikes(likeButton);
    setVisible(likeButton);
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
    if (attrName === 'visible') {
      this.style.display = (newValue === 'false') ? 'none' : '';
    } else if (attrName === 'liked' && newValue === 'true') {
      this.toggleActive();
      this.getPwProjectInfo()
        .then(this.getNumberOfLikes)
        .then((n) => {
          this.numberOfLikes = n;
          this.innerHTML = n;
        });
    } else if (attrName === 'liked' && newValue === 'false') {
      this.toggleActive();
      this.getPwProjectInfo()
        .then(this.getNumberOfLikes)
        .then((n) => {
          this.numberOfLikes = n;
          this.innerHTML = '';
        });
    }
  }

  /**************************Toggle Functions**********************************/

  /**
   * This function toggles the component attribute visible
   */
  toggleVisible() {

    /********************Pure Functions************************/

    const attrVisible = getAttr('visible');
    const equalToTrue = equals('true');
    const checkVisible = compose(equalToTrue, attrVisible);

    /*********************Impure Function**********************/

    const impure = (component) => {
      (checkVisible(component) ?
        setAttr(component, 'visble', 'false') :
        setAttr(component, 'visible', 'true'));
    };

    impure(this);
  }

  /**
   * This function toggles the component attribute liked
   */
  toggleLiked() {

    /********************Pure Functions************************/

    const attrStatus = getAttr('liked');
    const equalToTrue = equals('true');
    const checkStatus = compose(equalToTrue, attrStatus);

    /*********************Impure Function**********************/

    const impure = (component) => {
      (checkStatus(component) ?
        setAttr(component, 'liked', 'false') :
        setAttr(component, 'liked', 'true'));
    };

    impure(this);
  }

  /**
   * This function toggles the component CSS class active
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

  /**************************Main Functions*****************************/

  /**
   * Update the component with backend info
   */
  update(pwProjectInfo) {
    return new Promise((resolve, reject) => {
      if (isNil(pwProjectInfo)) {
        reject(new Error('pwProjectInfo argument is null'));
      } else if (isEmpty(pwProjectInfo)) {
        reject(new Error('pwProjectInfo argument is empty'));
      } else if (pwProjectInfo.constructor.name !== 'pw-project-info') {
        reject(new Error('pwProjectInfo argument is from an invalid class'));
      } else if (pwProjectInfo.id !== this.projectId) {
        reject(new Error('Invalid project id'));
      }

      this.getProject(pwProjectInfo)
        .then((project) => {
          this.numberOfLikes = project.liked.length;
          return project;
        })
        .then(get('liked'))
        .then(indexOf(this.projectId))
        .then(equals(-1))
        .then((isLiked) => {
          this.liked = !isLiked;
          resolve(true);
        })
        .catch(reject);
    });
  }

  /**
   * This function 'warn' the pw-project-info component that this component
   * was 'liked'
   */
  like(pwProjectInfo, pwUserInfo) {
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
      createCustomEvent('like', { projectId: this.projectId }));
    events.push(evt1(false, true));

    const evt2 = compose(IO.of, emitCustomEvent(pwUserInfo),
      createCustomEvent('like', { projectId: this.projectId }));
    events.push(evt2(false, true));

    return events;
  }

  /**
   * This function 'warn' the others components that this component
   * was 'disliked'
   */
  dislike(pwProjectInfo, pwUserInfo) {
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
      createCustomEvent('dislike', { projectId: this.projectId }));
    events.push(evt1(false, true));

    const evt2 = compose(IO.of, emitCustomEvent(pwUserInfo),
      createCustomEvent('dislike', { projectId: this.projectId }));
    events.push(evt2(false, true));

    return events;
  }

  /**
   * Checks with the pwUserInfo component to 'see'
   * if the project was already liked by the user
   */
  isLiked(pwUserInfo) {
    const pId = this.projectId;
    return new Promise((resolve, reject) => {
      if (isNil(pwUserInfo)) {
        reject(new Error('pwUserInfo argument is null'));
      } else if (isEmpty(pwUserInfo)) {
        reject(new Error('pwUserInfo argument is an empty object'));
      } else if (pwUserInfo.constructor.name !== 'pw-user-info') {
        reject(new Error('pwUserInfo argument is from an invalid class'));
      }

      pwUserInfo.isLiked(pId)
        .then(resolve)
        .catch(reject);
    });
  }

  /**************************Getters Functions***************************/

  /**
   * Returns the complete project objects
   */
  getProject(pwProjectInfo) {
    return new Promise((resolve, reject) => {
      if (isNil(pwProjectInfo)) {
        reject(new Error('pwProjectInfo argument is null'));
      } else if (isEmpty(pwProjectInfo)) {
        reject(new Error('pwProjectInfo argument is empty'));
      } else if (pwProjectInfo.constructor.name !== 'pw-project-info') {
        reject(new Error('pwProjectInfo argument is from an invalid class'));
      } else if (pwProjectInfo.id !== this.projectId) {
        reject(new Error('Invalid project id'));
      }

      pwProjectInfo.getProject()
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Checks with the pw-project-info component how many updated likes this
   * project have.
   */
  getNumberOfLikes(pwProjectInfo) {
    return new Promise((resolve, reject) => {
      if (isNil(pwProjectInfo)) {
        reject(new Error('pwProjectInfo argument is null'));
      } else if (isEmpty(pwProjectInfo)) {
        reject(new Error('pwProjectInfo argument is empty'));
      } else if (pwProjectInfo.constructor.name !== 'pw-project-info') {
        reject(new Error('pwProjectInfo argument is from an invalid class'));
      } else if (pwProjectInfo.id !== this.projectId) {
        reject(new Error('Invalid project id'));
      }

      pwProjectInfo.getProject()
        .then(get('liked'))
        .then(length)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Returns the pw-user-info component
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

  /**
   * Returns the pw-project-info component
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

  /*************************Html and CSS*******************************/

  /**
   * Return the component inner html
   */
  getInnerHtml() {
    /*eslint quotes:1*/
    return `<span id="numberLikes">0</span>`;
  }

  /**
   * Return the component Html in string
   */
  getTemplateHtml() {
    return `<div class="like">
              <button class="like-toggle active">❤<content select="#numberLikes"></content></button>
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
        display: inline-block;
      }

      .like-toggle {
        outline: none;
        box-shadow: none;
        border: none;
        width: 70px;
        height: 100%;
        font-size: 1.3em;
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
   * Return the liked attribute
   */
  get liked() {
    return this._liked;
  }

  /**
   * Set the liked attribute
   */
  set liked(isLiked) {
    this._liked = isLiked;
    this.setAttribute('liked', isLiked);
  }

  /**
   * Return the liked attribute
   */
  get numberOfLikes() {
    return this._numberOfLikes;
  }

  /**
   * Set the liked attribute
   */
  set numberOfLikes(n) {
    this._numberOfLikes = n;
    this.setAttribute('numberOfLikes', n);
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
}

document.registerElement('pw-like-button', PwLikeButton);
export
default PwLikeButton;
