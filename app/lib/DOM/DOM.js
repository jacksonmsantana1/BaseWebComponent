'use strict';

import Monet from 'monet';
import R from 'ramda';

/*****************Helper Functions*********************/
const IO = Monet.IO;
const curry = R.curry;

class DOM {

  /****************Pure Functions***********************/

  // ioWindow :: IO(window)
  get ioWindow() {
    return IO(() => { return window; });
  }

  // ioDocument :: IO(document)
  get ioDocument() {
    return IO(() => { return window.document; });
  }

  // $ :: String -> IO [DOM]
  static _$(selector) {
    return IO(() => { return document.querySelectorAll(selector); });
  }

  // setInnerHtml :: HtmlElement -> String -> IO
  static setInnerHtml(elem, str) {
    return IO(() => {
      elem.innerHTML = str;
      return elem;
    });
  }

  //append :: HtmlElement -> HtmlElement -> IO
  static append(parent, child) {
    return IO(() => {
      parent.appendChild(child);
      return parent;
    });
  }

  // clone :: HtmlElement -> IO(HtmlElement)
  static clone(elem) {
    return IO(() => { return document.importNode(elem, true); });
  }

  // createHtmlElement :: String -> IO(Html<String>Element)
  static createHtmlElement(str) {
    return IO(() => { return document.createElement(str); });
  }

  // createShadowDom :: HTMLElement -> IO(ShadowDom)
  static createShadowDom(elem) {
    return IO(() => { return elem.createShadowRoot(); });
  }

}

export
default DOM;

