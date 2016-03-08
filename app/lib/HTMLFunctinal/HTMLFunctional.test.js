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
});
