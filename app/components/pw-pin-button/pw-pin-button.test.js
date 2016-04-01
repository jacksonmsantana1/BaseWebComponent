import expect from 'expect.js';
import pwPinButton from './pw-pin-button.js';

describe('pw-pin-button => ', () => {
  let component;
  let pwPinButton;
  let pinCalled;
  let despinCalled;

  beforeEach(() => {
    component = document.createElement('pw-pin-button');
    document.body.appendChild(component);

    pwPinButton = document.body.getElementsByTagName('pw-pin-button')[0];
    pwPinButton.pin = () => {
      pinCalled = true;
    };

    pwPinButton.despin = () => {
      despinCalled = true;
    };

    pwPinButton.isPinned = () => {
      return Promise.resolve(true);
    };
  });

  afterEach(() => {
    document.body.removeChild(pwPinButton);
    pinCalled = false;
    despinCalled = false;
  });

  it('Component must be invisible when the attr visible=false', () => {
    pwPinButton.toggleVisable();
    pwPinButton.toggleVisable();

    expect(pwPinButton.getAttribute('visible')).to.be.false;
    expect(pwPinButton.style.display).to.be.equal('none');
  });

  it('Component must be visible when the attr visible=true', () => {
    pwPinButton.toggleVisable();
    expect(pwPinButton.getAttribute('visible')).to.be.true;
  });

  it('Component must have a property status: not-checked', () => {
    pwPinButton.toggleStatus();
    pwPinButton.toggleStatus();

    expect(pwPinButton.getAttribute('status')).to.be.equal('not-checked');
  });

  it('Component must have a property status: not-checked', () => {
    pwPinButton.toggleStatus();

    expect(pwPinButton.getAttribute('status')).to.be.equal('checked');
  });

  it('Component must call pin when is clicked and its status is not-checked', () => {
    expect(pinCalled).to.be.equal(false);
    pwPinButton.toggleStatus();

    expect(pwPinButton.getAttribute('status')).to.be.equal('checked');
    expect(pinCalled).to.be.equal(true);
  });

  it('Component must call despin when is clicked and its status is checked', () => {
    expect(despinCalled).to.be.equal(false);
    pwPinButton.toggleStatus();
    pwPinButton.toggleStatus();

    expect(pwPinButton.getAttribute('status')).to.be.equal('not-checked');
    expect(pinCalled).to.be.equal(true);
    expect(despinCalled).to.be.equal(true);
  });

});
