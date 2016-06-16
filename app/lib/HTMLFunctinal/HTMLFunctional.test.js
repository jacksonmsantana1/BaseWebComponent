import expect from 'expect.js';
import IO from '../IO/IO.js';
import HTMLFunctional from './HTMLFunctional.js';
import MockHtmlElement from './MockHtmlElement';

describe('HTMLFunctional =>', () => {
  before(() => {
    document.body.innerHTML = '';
  });

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
      let component = document.createElement('mock-element');
      document.body.appendChild(component);

      expect(component.visible).to.be.equal(false);
      fn(component)('visible')(true);
      expect(component.visible).to.be.equal(true);
    });
  });

  describe('getAttr', () => {
    it('Should get the element attribute', () => {
      let fn = HTMLFunctional.getAttr;
      let component = document.createElement('mock-element');
      document.body.appendChild(component);

      expect(fn('visible', component)).to.be.equal(false);
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

      expect(fn('div', document)).to.be.equal(div);
    });
  });

  describe('getElementsByTagName()', () => {
    it('Should return the elements with the same tag given', () => {
      let fn = HTMLFunctional.getElementsByTagName;
      let div1 = document.createElement('div');
      document.body.appendChild(div1);

      let div2 = document.createElement('div');
      document.body.appendChild(div2);

      expect(fn('div', document).length).to.be.equal(3);
    });
  });
});
