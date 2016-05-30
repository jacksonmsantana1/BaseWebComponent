import expect from 'expect.js';
import pwPinButton from './pw-pin-button.js';

describe('pw-pin-button => ', () => {
  let component;
  let pwPinButton;
  let pinCalled;
  let despinCalled;
  let aux;

  beforeEach(() => {
    aux = [];
    component = document.createElement('pw-pin-button');
    document.body.appendChild(component);
    pwPinButton = document.body.getElementsByTagName('pw-pin-button')[0];

    aux.push(pwPinButton.pin);
    pwPinButton.pin = () => {
      pinCalled = true;
    };

    aux.push(pwPinButton.despin);
    pwPinButton.despin = () => {
      despinCalled = true;
    };

    pwPinButton.isPinned = () => {
      return Promise.resolve(true);
    };
  });

  afterEach(() => {
    document.body.removeChild(pwPinButton);

    pwPinButton.pin = aux[0];
    pinCalled = false;

    pwPinButton.despin = aux[1];
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

  it('Component must have a property status: checked', () => {
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

describe('When the component is liked it ', () => {
  let component;
  let component1;
  let component2;

  let spy;
  let event;

  beforeEach(() => {
    component1 = document.createElement('pw-project-info');
    component2 = document.createElement('pw-user-info');
    component = document.createElement('pw-pin-button');

    component1.id = 'VAITOMARNOCU';
  });

  afterEach(() => {
    document.body.removeChild(component);
    document.body.removeChild(component1);
    document.body.removeChild(component2);

    sinon.restore();
  });

  it('Should call the getPwProjectInfo() method', (done) => {
    spy = sinon.spy(component, 'getPwProjectInfo');
    event = new MouseEvent('click');

    document.body.appendChild(component1);
    document.body.appendChild(component2);
    document.body.appendChild(component);
    component.getDivLike(component.shadowRoot).dispatchEvent(event);

    setTimeout(() => {
      expect(spy.called).to.be.equal(true);
      done();
    }, 200);
  });

  it('Should call the getPwUserInfo() method', (done) => {
    spy = sinon.spy(component, 'getPwUserInfo');
    event = new MouseEvent('click');

    document.body.appendChild(component1);
    document.body.appendChild(component2);
    document.body.appendChild(component);
    component.getDivLike(component.shadowRoot).dispatchEvent(event);

    setTimeout(() => {
      expect(spy.called).to.be.equal(true);
      done();
    }, 200);
  });

  it('Should call the pin() method', (done) => {
    spy = sinon.spy(component, 'getPwUserInfo');
    event = new MouseEvent('click');

    document.body.appendChild(component1);
    document.body.appendChild(component2);
    document.body.appendChild(component);
    component.getDivLike(component.shadowRoot).dispatchEvent(event);

    setTimeout(() => {
      expect(spy.called).to.be.equal(true);
      done();
    }, 200);
  });

  it('Should the pin() method receive a not null pw-project-info component', () => {
    document.body.appendChild(component1);
    document.body.appendChild(component2);
    document.body.appendChild(component);

    expect(component.pin(null, null).message).to.be.equal('pwProjectInfo argument is null');
  });

  it('Should the pin() method receive a not empty pw-project-info component', () => {
    document.body.appendChild(component1);
    document.body.appendChild(component2);
    document.body.appendChild(component);

    expect(component.pin({}, {}).message).to.be.equal('pwProjectInfo argument is an empty object');
  });

  it('Should the pin() method receive a valid pw-project-info object', () => {
    document.body.appendChild(component1);
    document.body.appendChild(component2);
    document.body.appendChild(component);

    expect(component.pin(component2, component1).message).to.be.equal('pwProjectInfo argument is from an invalid class');
  });

  it('Should the pin() method receive a valid pw-project-info component', () => {
    document.body.appendChild(component1);
    document.body.appendChild(component2);
    document.body.appendChild(component);
    component1.id = 'WRONG';

    expect(component.pin(component1, component2).message).to.be.equal('Invalid project id');
  });

  it('Should the pin() method receive a not null pw-user-info component', () => {
    document.body.appendChild(component1);
    document.body.appendChild(component2);
    document.body.appendChild(component);

    expect(component.pin(component1, null).message).to.be.equal('pwUserInfo argument is null');
  });

  it('Should the pin() method receive a not empty pw-user-info component', () => {
    document.body.appendChild(component1);
    document.body.appendChild(component2);
    document.body.appendChild(component);

    expect(component.pin(component1, {}).message).to.be.equal('pwUserInfo argument is an empty object');
  });

  it('Should the pin() method receive a valid pw-user-info object', () => {
    document.body.appendChild(component1);
    document.body.appendChild(component2);
    document.body.appendChild(component);

    expect(component.pin(component1, component).message).to.be.equal('pwUserInfo argument is from an invalid class');
  });

  it('Should the pin() method return an Array of IOs', () => {
    document.body.appendChild(component1);
    document.body.appendChild(component2);
    document.body.appendChild(component);

    expect(component.pin(component1, component2).constructor.name).to.be.equal('Array');
    expect(component.pin(component1, component2)[0].constructor.name).to.be.equal('IO');
    expect(component.pin(component1, component2)[1].constructor.name).to.be.equal('IO');
  });

  it('Should after emit a CustomEvent to the pw-project-info', (done) => {
    event = new MouseEvent('click');

    document.body.appendChild(component1);
    document.body.appendChild(component2);
    document.body.appendChild(component);
    component.getDivLike(component.shadowRoot).dispatchEvent(event);

    component1.addEventListener('pin', (evt) => {
      expect(evt.type).to.be.equal('pin');
      expect(evt.detail.projectId).to.be.equal('VAITOMARNOCU');
      done();
    });
  });

  it('Should after emit a CustomEvent to the pw-user-info', (done) => {
    event = new MouseEvent('click');

    document.body.appendChild(component1);
    document.body.appendChild(component2);
    document.body.appendChild(component);
    component.getDivLike(component.shadowRoot).dispatchEvent(event);

    component2.addEventListener('pin', (evt) => {
      expect(evt.type).to.be.equal('pin');
      expect(evt.detail.projectId).to.be.equal('VAITOMARNOCU');
      done();
    });
  });
});