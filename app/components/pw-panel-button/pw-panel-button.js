import R from 'ramda';
import IO from '../../lib/IO/IO.js';
import Maybe from 'data.maybe';
import Check from 'core.check';
import Validation from 'data.validation';
import Helpers from '../../lib/Helpers/Helpers.js';
import HTMLFunctional from '../../lib/HTMLFunctinal/HTMLFunctional.js';

const compose = R.compose;
const concat = R.concat;

const map = Helpers.map;
const event = Helpers.event;
const emitCustomEvent = Helpers.emitCustomEvent;
const createCustomEvent = Helpers.createCustomEvent;

const setInnerHTML = HTMLFunctional.setInnerHTML;
const setAttr = HTMLFunctional.setAttr;
const _createShadowDom = HTMLFunctional.createShadowDom;

const str = Check.String;

class PwPanelButton extends HTMLElement {

  /*********************Inherited Methods****************************/

  /*
   * Initial function called when the component is created
   */
  createdCallback() {
    this._visible = false;

    // component :: _ -> IO(HTMLElement)
    const component = IO.of(this);

    // inner :: String -> String -> String
    const inner = R.curry((html, style) => (html + style));

    // innerShadowDom String -> String -> Validation(String, Error)
    const innerShadowDom = (h, s) =>
      Validation.Success(inner)
        .ap(Check.String(h))
        .ap(Check.String(s));

    // shadowDom :: HTMLElement -> IO(HTMLElement)
    const shadowDom = component.map(_createShadowDom);

    const impure = innerShadowDom(this.getTemplateHtml(), this.getTemplateStyle())
      .cata({
        Success(strHtml) {
          return shadowDom.map(setInnerHTML(strHtml));
        }, Failure(err) {

          return Validation.Failure(err);
        },
      });

    if (impure.isFailure) {
      /*eslint no-console:1*/
      console.log(impure);
    } else {
      impure.runIO();
    }
  }

  /*
   * Function called when the component is attached to the DOM
   */
  attachedCallback() {

    // clickStream :: HTMLElement -> EventStream(HTMLElement)
    const clickStream = compose(map(R.prop('target')), event('click'));

    //onClick :: HTMLElement -> Maybe(EventStream(HTMLElement))
    const onClick = compose(map(clickStream), Maybe.fromNullable);

    // button :: _ -> HTMLELement
    const button = this.getButton();

    // pwProjectItem :: _ -> Maybe(HTMLElement)
    const pwProjectItem = Maybe.fromNullable(this.getPwProjectItem());

    // showPanel :: _ -> IO(Maybe(HTMLElement))
    const showPanel = IO.of(pwProjectItem).map(map(this.emitEvent));

    onClick(button).get().subscribe((elem) => {
      showPanel.runIO();
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
    if (attrName === 'visible') {
      this.style.display = (newValue === 'false') ? 'none' : '';
    }
  }

/************************HTML and CSS*****************************/

  // getTemplateHtml :: _ -> Validation(String, Error)
  getTemplateHtml() {
    /*eslint quotes:0*/
    return `<button class="main">VIEW</button>`;
  }

  // getTemplateStyle :: _ -> Validation(String, Error)
  getTemplateStyle() {
    return `<style>
      .main {
        font-family: 'Open Sans';
        display: inline-block;
        width: 200px;
        height: 40px;
        font-size: 1.3em;
        border-radius: 10px;
        background: #eee;
        color: #666;
      }
    </style>`;
  }

  // getButton :: _ -> HTMLButtonElement
  getButton() {
    const impure = compose(R.nth(0),
      R.prop('childNodes'),
      R.prop('shadowRoot'));

    return impure(this);
  }

  getPwProjectItem() {
    return this.parentNode;
  }

  emitEvent(pwProjectItem) {
    const evt = compose(emitCustomEvent(pwProjectItem),
      createCustomEvent);
    return evt('showPanel', null, false, false);
  }

  /************************Getters and Setters************************/

  /**
   * Return the visible attribute
   */
  get visible() {
    return this._visible;
  }

  /**
   * Set the visible attribute
   */
  set visible(v) {
    this._visible = v;
    this.setAttribute('visible', v);
  }

}

document.registerElement('pw-panel-button', PwPanelButton);
export
  default PwPanelButton;
