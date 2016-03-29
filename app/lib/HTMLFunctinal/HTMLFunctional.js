import R from 'ramda';

const curry = R.curry;

const HTMLFunctional = function () {};

// setInnerHTML :: String -> HTMLElement -> HTMLElement
HTMLFunctional.prototype.setInnerHTML = curry((strHtml, elem) => {
  /*eslint no-param-reassign:1*/
  elem.innerHTML = strHtml;
  return elem;
});
HTMLFunctional.setInnerHTML = HTMLFunctional.prototype.setInnerHTML;

// setAttr :: HTMLElement -> String -> String -> _
HTMLFunctional.prototype.setAttr = curry((obj, attr, val) => (obj.setAttribute(attr, val)));
HTMLFunctional.setAttr = HTMLFunctional.prototype.setAttr;

// getAttr :: HTMLElement -> String ->  String
HTMLFunctional.prototype.getAttr = curry((obj, attr) => (obj.getAttribute(attr)));
HTMLFunctional.getAttr = HTMLFunctional.prototype.getAttr;

// createShadowDom :: HTMLElement -> ShadowRoot
HTMLFunctional.prototype.createShadowDom = (elem) => (elem.createShadowRoot());
HTMLFunctional.createShadowDom = HTMLFunctional.prototype.createShadowDom;

export
default HTMLFunctional;
