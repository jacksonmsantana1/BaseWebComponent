import IO from '../IO/IO.js';
import Helpers from '../Helpers/Helpers.js';
import R from 'ramda';

const curry = R.curry;

let HTMLFunctional = function () {};

HTMLFunctional.prototype.setInnerHTML = curry((strHtml, elem) => {
  elem.innerHTML = strHtml;
  return elem;
});
HTMLFunctional.setInnerHTML = HTMLFunctional.prototype.setInnerHTML;

HTMLFunctional.prototype.setAttr = curry((obj, attr, val) => (obj.setAttribute(attr, val)));
HTMLFunctional.setAttr = HTMLFunctional.prototype.setAttr;

export
default HTMLFunctional;
