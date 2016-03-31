import expect from 'expect.js';
import pwPinButton from './pw-pin-button.js';

describe('pw-pin-button => ', () => {
  let component = document.createElement('pw-pin-button');

  it('Component must be invisible when the attr visible=false', () => {
    component.toggleVisable();
    component.toggleVisable();

    expect(component.getAttribute('visible')).to.be.false;
    expect(component.style.display).to.be.equal('none');
  });

  it('Component must be visible when the attr visible=true', () => {
    component.toggleVisable();
    expect(component.getAttribute('visible')).to.be.true;
  });

});
