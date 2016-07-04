/**
 * Component that will be like a pinterest card containing the a patchwork project
 * informations
 */

import R from 'ramda';
import Helpers from '../../lib/Helpers/Helpers';
import IO from '../../lib/IO/IO';
import Maybe from 'data.maybe';
import HTMLFunctional from '../../lib/HTMLFunctinal/HTMLFunctional';

//const contain = R.indexOf;
//const get = R.prop;
const is = R.is;
const compose = R.compose;
const concat = R.concat;
const get = R.prop;
const nth = R.nth;

const getPwProjectInfo = Helpers.getPwProjectInfo;
const map = Helpers.map;

const setInnerHTML = HTMLFunctional.setInnerHTML;
const createShadowDom = HTMLFunctional.createShadowDom;

class PwProjectItem extends HTMLDivElement {

  /******************Inherited Methods*************/

  createdCallback() {
    this._id = '';
    this._pwProjectInfo = document.createElement('pw-project-info');
    this._pwProjectImg = document.createElement('pw-project-img');
    this._pwLikeButton = document.createElement('pw-like-button');
    this._pwPinButton = document.createElement('pw-pin-button');
    this._pwProjectLabel = document.createElement('pw-project-label');
    this._pwPanelButton = document.createElement('pw-panel-button');

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
  }

  detachedCallback() {}

  attachedCallback() {
    //Inner components
    this._pwProjectInfo.id = this.id;
    this.appendChild(this._pwProjectInfo);
    this.shadowRoot.childNodes[0].childNodes[1].appendChild(this._pwProjectImg);
    this.shadowRoot.childNodes[0].childNodes[5].appendChild(this._pwProjectLabel);
    this.shadowRoot.childNodes[0].childNodes[7].appendChild(this._pwPanelButton);
    this.shadowRoot.childNodes[0].childNodes[3].childNodes[3].appendChild(this._pwPinButton);
    this.shadowRoot.childNodes[0].childNodes[3].childNodes[1].appendChild(this._pwLikeButton);

    //Events
    this.addEventListener('showPanel', this.showPanel);
    this.getInnerComponent().get().addEventListener('mouseover', this.showButton.bind(this));
    this.getInnerComponent().get().addEventListener('mouseout', this.hideButton.bind(this));

    //Init Components
    this._pwPanelButton.visible = false;

  }

  /*eslint no-unused-vars:1*/
  attributeChangedCallback(attrName, newValue, oldValue) {}

  /********************Methods***********************/

  showPanel(evt) {
    this.getPwProjectPanel().map((input) => {
      input.toggleVisible();
      return evt;
    });
  }

  showButton(evt) {
    if (evt.type === 'mouseover') {
      this.getPwPanelButton().visible = true;
    }
  }

  hideButton(evt) {
    if (evt.type === 'mouseout') {
      this.getPwPanelButton().visible = false;
    }
  }

  /********************Getters***********************/

  /**
   * Returns the component visible by the brownser
   */
  getInnerComponent() {
    const fn = compose(Maybe.of, nth(0), get('childNodes'), get('shadowRoot'));
    return fn(this);
  }

  /**
   * Returns the pw-project-info component
   */
  getPwProjectInfo() {
    return this._pwProjectInfo;
  }

  /**
   * Returns the pw-pin-button
   */
  getPwPinButton() {
    return this._pwPinButton;
  }

  /**
   * Returns the pw-like-button
   */
  getPwLikeButton() {
    return this._pwLikeButton;
  }

  /**
   * Returns the pw-project-img
   */
  getPwProjectImg() {
    return this._pwProjectImg;
  }

  /**
   * Returns the pw-project-label
   */
  getPwProjectLabel() {
    return this._pwProjectLabel;
  }

  /**
   * Returns the pw-project-label
   */
  getPwPanelButton() {
    return this._pwPanelButton;
  }

  /**
   * Returns the pw-project-panel
   */
  getPwProjectPanel() {
    return Maybe.of(document.body.getElementsByTagName('pw-project-panel')[0]);
  }

  /**
   * Return the component Html in string
   */
  getTemplateHtml() {
    /*eslint quotes:1*/
    return `<div class="item">
              <div class="item-img"></div>
              <div class="item-buttons">
                <div class="like-button"></div>
                <div class="pin-button"></div>
              </div>
              <div class="item-label"></div>
              <div class="item-view-button"></div>
            </div>`;
  }

  /**
   * Return the component StyleSheet in String
   */
  getTemplateStyle() {
    return `<style>
      *{transition: all 0.3s linear;}

      .item {
        width: 200px;
        border-radius: 12%;
        padding:0.8%;
        background-color: #006666;
        display: inline-block;
      }

      .item-img {
        width: 100%;
        height: 69%;
        display:inline-block;
      }

      .item-label {
        width: 100%;
        height: 12%;
        background-color: #528CE0;
      }

      .item-buttons {
        background-color: #0b97c4;
        width: 100%;
        height: 6%;
      }

      .item-view-button {
        background-color: #0b97c4;
        width: 100%;
        height: 12%;
      }

      .like-button {
        width: 49%;
        display: inline-block;
      }

      .pin-button {
        widht: 49%;
        display: inline-block;
      }
      </style>`;
  }

  /******************Getters and setters*************/

  get id() {
    return this._id;
  }

  set id(_id) {
    this._id = _id;
  }
}

document.registerElement('pw-project-item', PwProjectItem);
export
default PwProjectItem;
