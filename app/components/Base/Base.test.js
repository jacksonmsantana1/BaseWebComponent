import expect from 'expect.js';
import Base from './Base.js';

describe('Component: Base =>', () => {
  it('Should show a welcoming phrase', () => {
    let component = document.createElement('pw-base');
    component.id = 'nathan';

    document.body.appendChild(component);

    let shadow = document.getElementById('nathan').shadowRoot;
    let nodes = Array.from(shadow.childNodes);
    let mainDiv = nodes[0];
    let boilerplate = mainDiv.childNodes[1];
    let content = mainDiv.childNodes[3].childNodes[1];

    expect(boilerplate.textContent.trim()).to.be.equal('O Nathan é um ...');
    expect(component.textContent).to.be.equal('Viadinho');
    expect(content).to.be.ok();
  });
});
