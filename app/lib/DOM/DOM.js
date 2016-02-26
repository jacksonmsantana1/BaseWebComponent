import Monet from 'monet';

/*****************Helper Functions*********************/

const IO = Monet.IO;

class DOM {

  /****************Pure Functions***********************/

  // ioWindow :: IO(window)
  get ioWindow() {
    return IO(() => (window));
  }

  // ioDocument :: IO(document)
  get ioDocument() {
    return IO(() => (window.document));
  }

  // $ :: String -> IO [DOM]
  static _$(selector) {
    return IO(() => (document.querySelectorAll(selector)));
  }

  // setInnerHtml :: HtmlElement -> String -> IO
  static setInnerHtml(elem, str) {
    return IO(() => {
      /*eslint no-param-reassign: 1*/
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
    return IO(() => (document.importNode(elem, true)));
  }

  // createHtmlElement :: String -> IO(Html<String>Element)
  static createHtmlElement(str) {
    return IO(() => (document.createElement(str)));
  }

  // createShadowDom :: HTMLElement -> IO(ShadowDom)
  static createShadowDom(elem) {
    return IO(() => (elem.createShadowRoot()));
  }

}

export
default DOM;

