import expect from 'expect.js';
import Maybe from 'data.maybe';
import PwProjectItem from './pw-project-item';

describe('pw-project-item', () => {
  describe('Component should contain the ', () => {
    let pwProjectItem;
    let pwProjectPanel;

    beforeEach(() => {
      pwProjectPanel = document.createElement('pw-project-panel');
      pwProjectItem = document.createElement('pw-project-item');
      pwProjectItem.id = 'VAITOMARNOCU';

      document.body.appendChild(pwProjectPanel);
      document.body.appendChild(pwProjectItem);
    });

    afterEach(() => {
      document.body.removeChild(pwProjectPanel);
    });

    it('id attribute', () => {
      expect(pwProjectItem.id).to.be.equal('VAITOMARNOCU');
      pwProjectItem.id = 'VAITOMARNOANUS';
      expect(pwProjectItem.id).to.be.equal('VAITOMARNOANUS');
    });

    it('getPwProjectPanel() method which returns the page s pw-project-panel component', () => {
      expect(pwProjectItem.getPwProjectPanel() instanceof Maybe).to.be.equal(true);
      expect(pwProjectItem.getPwProjectPanel().get().constructor.name).to.be.equal('pw-project-panel');
    });

    it('getInnerComponent() ', () => {
      const actual = pwProjectItem.getInnerComponent().get();
      const expected = pwProjectItem.shadowRoot.childNodes[0];

      expect(actual).to.be.equal(expected);
    });
  });

  describe('Component should contain the inner', () => {
    let pwProjectItem;
    let pwProjectPanel;

    beforeEach(() => {
      pwProjectItem = document.createElement('pw-project-item');
      pwProjectItem.id = 'VAITOMARNOCU';

      document.body.appendChild(pwProjectItem);
    });

    it('pw-project-info component', () => {
      expect(pwProjectItem.getPwProjectInfo().constructor.name).to.be.equal('pw-project-info');
      expect(pwProjectItem.getPwProjectInfo().id).to.be.equal('VAITOMARNOCU');
    });

    it('pw-pin-button component', () => {
      expect(pwProjectItem.getPwPinButton().constructor.name).to.be.equal('pw-pin-button');
    });

    it('pw-like-button component', () => {
      expect(pwProjectItem.getPwLikeButton().constructor.name).to.be.equal('pw-like-button');
    });

    it('pw-project-id component', () => {
      expect(pwProjectItem.getPwProjectImg().constructor.name).to.be.equal('pw-project-img');
    });

    it('pw-panel-button component', () => {
      expect(pwProjectItem.getPwPanelButton().constructor.name).to.be.equal('pw-panel-button');
    });

    it('pw-project-label component', () => {
      expect(pwProjectItem.getPwProjectLabel().constructor.name).to.be.equal('pw-project-label');
    });
  });

  describe('When event ', () => {
    let pwProjectItem;
    let pwProjectPanel;

    beforeEach(() => {
      pwProjectPanel = document.createElement('pw-project-panel');
      pwProjectItem = document.createElement('pw-project-item');
      pwProjectItem.id = 'VAITOMARNOCU';

    });

    afterEach(() => {
      document.body.removeChild(pwProjectPanel);
      sinon.restore();
    });

    it('showPanel is called, it must show call the showPanel() method', (done) => {
      const spy = sinon.spy(pwProjectItem, 'showPanel');
      const evt = new CustomEvent('showPanel', {});

      document.body.appendChild(pwProjectPanel);
      document.body.appendChild(pwProjectItem);

      setTimeout(() => {
        expect(spy.called).to.be.equal(true);
        done();
      }, 100);

      pwProjectItem.dispatchEvent(evt);
    });
  });

  describe('When the mouse is out the component, it', () => {
    let pwProjectItem;

    beforeEach(() => {
      pwProjectItem = document.createElement('pw-project-item');
      pwProjectItem.id = 'VAITOMARNOCU';
      document.body.appendChild(pwProjectItem);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('Should hide the pw-panel-button', (done) => {
      const mouseout = new MouseEvent('mouseout');
      const button = pwProjectItem.getPwPanelButton();

      setTimeout(() => {
        expect(button.visible).to.be.equal(false);
        done();
      }, 100);

      pwProjectItem.getInnerComponent().map((elem) => {
        elem.dispatchEvent(mouseout);
      });
    });
  });

  describe('When the mouse is inside the component, it', () => {
    let pwProjectItem;

    beforeEach(() => {
      pwProjectItem = document.createElement('pw-project-item');
      pwProjectItem.id = 'VAITOMARNOCU';
      document.body.appendChild(pwProjectItem);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('Should show the pw-panel-button', (done) => {
      const mouseover = new MouseEvent('mouseover');
      const button = pwProjectItem.getPwPanelButton();

      setTimeout(() => {
        expect(button.visible).to.be.equal(true);
        done();
      }, 100);

      pwProjectItem.getInnerComponent().map((elem) => {
        elem.dispatchEvent(mouseover);
      });
    });
  });

  describe('When the image is clicked, it', () => {
    let pwProjectItem;
    let pwProjectPanel;

    beforeEach(() => {
      pwProjectPanel = document.createElement('pw-project-panel');
      pwProjectItem = document.createElement('pw-project-item');
      pwProjectItem.id = 'VAITOMARNOCU';

      document.body.appendChild(pwProjectPanel);
      document.body.appendChild(pwProjectItem);
    });

    afterEach(() => {
      document.body.removeChild(pwProjectPanel);
      sinon.restore();
    });

    it('Should show the pw-project-panel', (done) => {
      const click = new MouseEvent('click');
      const pwProjectImg = pwProjectItem.getPwProjectImg();
      const pwProjectPanel = pwProjectItem.getPwProjectPanel().get();
      const shadowRoot = pwProjectImg.shadowRoot;

      setTimeout(() => {
        expect(pwProjectPanel.isActive().get()).to.be.equal(true);
        done();
      }, 100);

      pwProjectImg.getImg(shadowRoot).dispatchEvent(click);
    });
  });

  describe('When the pw-panel-button is clicked, it', () => {
    let pwProjectItem;
    let pwProjectPanel;

    beforeEach(() => {
      pwProjectPanel = document.createElement('pw-project-panel');
      pwProjectItem = document.createElement('pw-project-item');
      pwProjectItem.id = 'VAITOMARNOCU';

      document.body.appendChild(pwProjectPanel);
      document.body.appendChild(pwProjectItem);
    });

    afterEach(() => {
      document.body.removeChild(pwProjectPanel);
      sinon.restore();
    });

    it('Should show the pw-project-panel', (done) => {
      const click = new MouseEvent('click');
      const pwPanelButton = pwProjectItem.getPwPanelButton();
      const pwProjectPanel = pwProjectItem.getPwProjectPanel().get();

      setTimeout(() => {
        expect(pwProjectPanel.isActive().get()).to.be.equal(true);
        done();
      }, 100);

      pwPanelButton.getButton().dispatchEvent(click);
    });
  });
});
