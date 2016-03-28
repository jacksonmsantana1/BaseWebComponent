import expect from 'expect.js';
import pwPinButton from './pw-pin-button.js';

describe('pw-pin-button => ', () => {
  let component;

  beforeEach(() => {
    component = document.createElement('pw-pin-button');
    component.id = 'componentTested';
    document.body.appendChild(component);
  });

  afterEach(() => {
    document.body.removeChild(component);
  });

  it('Component must be invisible when the attr visible=false', () => {
    var comp = document.getElementById('componentTested');
    comp.toggleVisable();
    comp.toggleVisable();

    expect(comp).to.be.equal(component);
    expect(comp.getAttribute('visible')).to.be.false;
    expect(comp.style.display).to.be.equal('none');
  });

  it('Component must be visible when the attr visible=true', () => {
    var comp = document.getElementById('componentTested');
    comp.toggleVisable();

    expect(comp).to.be.equal(component);
    expect(comp.getAttribute('visible')).to.be.true;
  });

  it('Component must be able to check from outside (Outer component) which is its status', () => {
    let event = new MouseEvent('click');
    let comp = document.getElementById('componentTested');

    !comp.dispatchEvent(event);
    expect(comp.isPinned()).to.be.equal(true);

    !comp.dispatchEvent(event);
    expect(comp.isPinned()).to.be.equal(false);
  });

  it('Component should sign when is pinned', () => {
    let event = new MouseEvent('click');
    let comp = document.getElementById('componentTested');
    let clicked = !comp.dispatchEvent(event);
    let pinFn = sinon.spy(comp, 'pin');

    expect(comp.getAttribute('status')).to.be.equal('checked');
    expect(comp.isPinned()).to.be.equal(true);
    expect(pinFn.called).to.be.true;
  });

  it('Component sohuld sign when is des-pinned', () => {
    let event = new MouseEvent('click');
    let comp = document.getElementById('componentTested');
    let clicked = !comp.dispatchEvent(event);
    let clicked2 = !comp.dispatchEvent(event);
    let pinFn = sinon.spy(comp, 'despin');

    expect(comp.getAttribute('status')).to.be.equal('not-checked');
    expect(comp.isPinned()).to.be.equal(false);
    expect(pinFn.called).to.be.true;
  });

});
