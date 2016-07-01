import R from 'ramda';
import IO from '../../lib/IO/IO.js';
import Maybe from 'data.maybe';
import Helpers from '../../lib/Helpers/Helpers.js';
import HTMLFunctional from '../../lib/HTMLFunctinal/HTMLFunctional.js';

const compose = R.compose;
const concat = R.concat;
const get = R.prop;
const is = R.is;
const nth = R.nth;

const map = Helpers.map;
const getPwProjectInfo = Helpers.getPwProjectInfo;
const emitCustomEvent = Helpers.emitCustomEvent;
const createCustomEvent = Helpers.createCustomEvent;
const event = Helpers.event;

const setInnerHTML = HTMLFunctional.setInnerHTML;
const setAttr = HTMLFunctional.setAttr;
const getAttr = HTMLFunctional.getAttr;
const createShadowDom = HTMLFunctional.createShadowDom;

class PwProjectImg extends HTMLElement {

  /*********************Inherited Methods****************************/

  /*
   * Initial function called when the component is created
   */
  createdCallback() {

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
      IO.of);

    impure(this).runIO();

    // Attributes declaration
    this._projectId = 'VAITOMARNOCU';
    this._path = 'http://img.elo7.com.br/product/main/' +
      '3EF2D7/bolsa-de-patchwork-com-bolso-frontal.jpg';
  }

  /*
   * Function called when the component is attached to the DOM
   */
  attachedCallback() {

    // clickStream :: HTMLElement -> EventStream(HTMLElement)
    const clickStream = compose(map(R.prop('target')), event('click'));

    //onClick :: HTMLElement -> Maybe(EventStream(HTMLElement))
    const onClick = compose(map(clickStream), Maybe.fromNullable);

    // img :: _ -> HTMLELement
    const img = this.getImg(this.shadowRoot);

    // pwProjectItem :: _ -> Maybe(HTMLElement)
    const pwProjectItem = Maybe.fromNullable(this.getPwProjectItem());

    // showPanel :: _ -> IO(Maybe(HTMLElement))
    const showPanel = IO.of(pwProjectItem).map(map(this.emitEvent.bind(this)));

    onClick(img).get().subscribe((elem) => {
      showPanel.runIO();
    });

    /********************Pure Functions*********************/

    // set :: HTMLElement -> _
    const set = setAttr(this);

    // setProjectId :: HTMLElement -> _
    const setProjectId = compose(set('projectId'), getAttr('projectId'));

    // setPath :: String:path -> _
    const setPath = set('path');

    // getProject :: PwProjectInfo -> Promise(Error, Project)
    const getProject = (comp) => comp.getProject();

    // Initial projectId value
    setProjectId(this);

    // Initial path value
    this.getPwProjectInfo()
      .then(getProject)
      .then(get('path'))
      .then(setPath)
      .catch((err) => {
        console.log(err.message);
        setPath(this._path);
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
    if (attrName === 'path') {
      this.getImg(this.shadowRoot).src = newValue;
    }
  }

  /***************************Methods****************************/

  /**
   * Return the valid pw-project-info component
   * @returns {Promise|Promise<T>}
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
   * Return the img component that is in the ShadowRoot
   */
  getImg(shadowRoot) {

    /**********************Pure Function**************************/

    const pure = compose(nth(0), get('childNodes'));

    return pure(shadowRoot);
  }

  /*************************Html and CSS*************************/

  /**
   * Return the component Html in string
   */
  getTemplateHtml() {
    /*eslint quotes:0*/
    return `<img src="">`;
  }

  /**
   * Return the component StyleSheet in String
   */
  getTemplateStyle() {
    /*eslint quotes:0*/
    return `
    <style>
      img {
        width: 100%;
        height:100%;
      }
    </style>`;
  }

  getPwProjectItem() {
    return this.parentNode;
  }

  emitEvent(pwProjectItem) {
    const evt = compose(emitCustomEvent(pwProjectItem),
      createCustomEvent);
    return evt('showPanel', { projectId: this.projectId }, false, false);
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
   * Return the path attribute
   */
  get path() {
    return this._path;
  }

  /**
   * Set the path attribute
   */
  set path(path) {
    this._path = path;
    this.setAttribute('path', path);
  }
}

document.registerElement('pw-project-img', PwProjectImg);
export
  default PwProjectImg;
