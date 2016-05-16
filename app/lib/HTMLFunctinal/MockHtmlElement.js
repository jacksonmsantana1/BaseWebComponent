class MockHtmlElement extends HTMLElement {
  createdCallback() {}

  detachedCallback() {}

  attachedCallback() {
    this._visible = false;
  }

  /*eslint no-unused-vars:1*/
  attributeChangedCallback(attrName, oldValue, newValue) {}

  /**
   * Return the visible attribute
   */
  get visible() {
    return this._visible;
  }

  /**
   * Set the visible attribute
   */
  set visible(visible) {
    this._visible = visible;
    this.setAttribute('visible', visible);
  }
}

document.registerElement('mock-element', MockHtmlElement);
export
  default MockHtmlElement;
