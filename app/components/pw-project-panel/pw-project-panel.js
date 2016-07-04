// jscs:disable disallowMixedSpacesAndTabs
import R from 'ramda';
import IO from '../../lib/IO/IO.js';
import Helpers from '../../lib/Helpers/Helpers.js';
import HTMLFunctional from '../../lib/HTMLFunctinal/HTMLFunctional.js';

const compose = R.compose;
const concat = R.concat;

const map = Helpers.map;

const setInnerHTML = HTMLFunctional.setInnerHTML;
const createShadowDom = HTMLFunctional.createShadowDom;

const setAttr = HTMLFunctional.setAttr;
const getAttr = HTMLFunctional.getAttr;

class PwProjectPanel extends HTMLElement {

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

    this._visible = false;
  }

  attachedCallback() {
    // set :: HTMLElement -> _
    const set = setAttr(this);

    // setVisible :: HTMLElement -> _
    const setVisible = compose(set('visible'), getAttr('visible'));

    setVisible(this);
  }

  detachedCallback() {}

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === 'visible' && newValue === 'true') {
      this.toggleVisible();
    }
  }

  /***********************Methods**************************/

  getTemplateHtml() {
    return `<div class="modal">
	    <input class="modal-open" id="modal-one" type="checkbox" hidden>
	    <div class="modal-wrap" aria-hidden="true" role="dialog">
		    <label class="modal-overlay" for="modal-one"></label>
	      <div class="modal-dialog">
			    <div class="modal-header">
				    <h2>Modal in CSS?</h2>
				    <label class="btn-close" for="modal-one" aria-hidden="true">×</label>
			    </div>
			    <div class="modal-body">
				    <p>One modal example here!:D</p>
			    </div>
			    <div class="modal-footer">
				    <label class="btn-btn-primary" for="modal-one">Nice!</label>
			    </div>
		    </div>
	    </div>
    </div>`;
  }

  getTemplateStyle() {
    return `<style>
            @media (max-width:$screen-xs-max){}
            @media (min-width:$screen-sm){}
            @media (min-width:$screen-sm){}

            .modal .btn-close{
              color:#aaa;
              cursor:pointer;
              font-size:3rem;
              position:absolute;
              top:0;
              right:5px;
              text-decoration:none;
            }

            .modal .btn-close:hover,.modal .btn-close:focus{
              color:#999
            }

            .modal-wrap:before{
              content:'';
              display:none;
              background:rgba(0,0,0,0.6);
              position:fixed;
              top:0;
              right:0;
              bottom:0;
              left:0;
              z-index:101
            }

            .modal-overlay{
              display:none;
              position:fixed;
              top:0;
              right:0;
              bottom:0;
              left:0;
              z-index:102
            }

            .modal-open:checked ~ .modal-wrap:before,
            .modal-open:checked ~ .modal-wrap .modal-overlay{
              display:block
            }

            .modal-open:checked ~ .modal-wrap .modal-dialog{
              transform:translate(-50%,-50%);
              position:fixed;top:80%
            }

            .modal-dialog{
              background:#fefefe;
              border:#555 solid 1px;
              border-radius:5px;
              position:fixed;
              left:50%;
              top:-100%;
              transform:translate(-50%,-150%);
              transition:transform .6s ease-in-out;
              width:80%;
              max-width:600px;
              z-index:103
            }

            .modal-body{
              padding:20px;
            }

            .modal-body p{
              margin:0;
            }

            .modal-header,.modal-footer{
              padding:20px 20px;
            }

            .modal-header{
              border-bottom:#eaeaea solid 1px;
            }

            .modal-header h2{
              font-size:2rem;
              margin:0;
            }

            .modal-footer{
              border-top:#eaeaea solid 1px;
              text-align:right;
            }
            </style>`;
  }

  toggleVisible() {
    this.activeButton().checked = !this.activeButton.checked;
  }

  activeButton() {
    return this.shadowRoot.childNodes[0].childNodes[1];
  }

  /*******************Getters/Setters**********************/

  get visible() {
    return this._visible;
  }

  set visible(v) {
    this._visible = v;
    this.setAttribute('visible', v);
  }
}

document.registerElement('pw-project-panel', PwProjectPanel);

export
  default PwProjectPanel;
