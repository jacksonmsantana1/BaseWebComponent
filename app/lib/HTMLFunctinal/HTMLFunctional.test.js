import expect from 'expect.js';
import IO from '../IO/IO.js';
import HTMLFunctional from './HTMLFunctional.js';

describe('HTMLFunctional =>', () => {
  describe('setInnerHtml() ->', () => {
    it('Should return the modified element', () => {
      let fn = HTMLFunctional.setInnerHTML;
      let div = document.createElement('div');
      let a = '<a>CU</a>';

      expect(fn(a)(div)).to.be.equal(div);
      expect(fn(a, div).firstChild).to.be.equal(div.firstChild);
      expect(fn(a, div).firstChild.textContent).to.be.equal('CU');

    });
  });

  describe('setAttr', () => {
    it('Should set the element attribute with the given value', () => {
      let fn = HTMLFunctional.setAttr;
      let div = document.createElement('div');
      div.setAttribute('checked', 'yes');

      expect(div.getAttribute('checked')).to.be.equal('yes');
      fn(div)('checked')('no');
      expect(div.getAttribute('checked')).to.be.equal('no');
    });
  });

  describe('getAttr', () => {
    it('Should get the element attribute', () => {
      let fn = HTMLFunctional.getAttr;
      let div = document.createElement('div');
      div.setAttribute('checked', 'yes');

      expect(fn(div, 'checked')).to.be.equal('yes');
    });
  });

  describe('createShadowDom()', () => {
    it('Should return the element ShadowRoot', () => {
      let fn = HTMLFunctional.createShadowDom;
      let elem = document.createElement('div');
      let shadowRoot = fn(elem);

      expect(shadowRoot).to.be.equal(elem.shadowRoot);
    });
  });

  describe('getElementByTagName()', () => {
    it('Should return the first element with the same tag given', () => {
      let fn = HTMLFunctional.getElementByTagName;
      let div = document.createElement('div');
      document.body.appendChild(div);

      expect(fn(document, 'div')).to.be.equal(div);
    });
  });
});
