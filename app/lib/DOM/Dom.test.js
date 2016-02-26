'use strict';

import Dom from './DOM.js';

import expect from 'expect.js';

describe('Dom =>', () => {

  describe('ioWindow() ->', () => {
    it('Should return an IO(window)', () => {
      let d = new Dom();
      expect(d.ioWindow.run()).to.be.equal(window);
    });
  });

  describe('ioDocument() ->', () => {
    it('Should return an IO(window.document)', () => {
      let d = new Dom();
      expect(d.ioDocument.run()).to.be.equal(window.document);
    });
  });

  describe('_$() ->', () => {
    it('Should return the HtmlElement by his CSS', () => {
      let div = document.createElement('div');
      div.className = 'CU';
      document.body.appendChild(div);
      expect(Dom._$('div.CU').run()[0]).to.be.equal(div);
    });
  });

  describe('setInnerHtml() ->', () => {
    it('Should set the inner html of the given element', () => {
      let div = document.createElement('div');
      let str = '<h1>CUU</h1>';
      let io = Dom.setInnerHtml(div, str);
      expect(io).to.have.property('effectFn');
      expect(io.run()).to.be.equal(div);
      expect(io.run().innerHTML).to.be.equal(str);
    });
  });

  describe('append() ->', () => {
    it('Should append the child element into the given parent element', () => {
      let div = document.createElement('div');
      let str = document.createElement('h1');
      let io = Dom.append(div, str);
      io.run();
      expect(div.firstChild).to.be.equal(str);
    });
  });

  describe('clone() ->', () => {
    it('Should return a copy of the given element', () => {
      let div = document.createElement('div');
      div.innerHTML = '<h1>CUU</h1>';
      let clone = Dom.clone(div);
      expect(clone.run().constructor.name).to.be.equal('HTMLDivElement');
      expect(clone.run().firstChild.innerHTML).to.be.equal('CUU');
    });
  });

  describe('createShadowDom() ->', () => {
    it('******IMCOMPLETE************', () => {
      let template = document.createElement('template');
      let shadow = Dom.createShadowDom(template);
      let div = document.createElement('div');
      let clone = document.importNode(template.content, true);

      //TODO ver depois como sera testado a funcao
    });
  });

  describe('createHtmlElement() ->', () => {
    it('Should create any given HtmlElement', () => {
      let div = Dom.createHtmlElement('div');
      let h1 = Dom.createHtmlElement('h1');
      let td = Dom.createHtmlElement('td');

      expect(h1.run().constructor.name).to.be.equal('HTMLHeadingElement');
      expect(td.run().constructor.name).to.be.equal('HTMLTableCellElement');
      expect(div.run().constructor.name).to.be.equal('HTMLDivElement');
    });
  });

});
