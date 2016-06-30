import expect from 'expect.js';
import IO from '../../lib/IO/IO';
import pwPanelButton from './pw-panel-button';

describe('pw-panel-button => ', () => {
  let pwPaneButton;
  let pwProjectItem;

  before(() => {
    document.body.innerHTML = '';
  });

  beforeEach(() => {
    pwPaneButton = document.createElement('pw-panel-button');
    pwProjectItem = document.createElement('div');
    pwProjectItem.appendChild(pwPaneButton);
    document.body.appendChild(pwProjectItem);
  });

  afterEach(() => {
    pwProjectItem.removeChild(pwPaneButton);
    document.body.removeChild(pwProjectItem);
  });

  describe('Component ', () => {
    it('Should be a HTMLElement', () => {
      const actual = pwPaneButton instanceof HTMLElement;
      const expected = true;

      expect(actual).to.be.equal(expected);
    });

    it('Should have a property visible', () => {
      const actualInit = pwPaneButton.visible;
      const expectedFalse = false;
      let actualAfter, expectedTrue;

      expect(actualInit).to.be.equal(expectedFalse);

      pwPaneButton.visible = true;
      actualAfter = pwPaneButton.visible;
      expectedTrue = true;
      expect(actualAfter).to.be.equal(expectedTrue);
    });

    it('Should be invisible when the property visible=false', () => {
      pwPaneButton.visible = false;
      const actual = pwPaneButton.style.display;
      const expected = 'none';

      expect(actual).to.be.equal(expected);
    });

    it('Should be visible when the property visible=true', () => {
      pwPaneButton.visible = true;
      const actual = pwPaneButton.style.display;
      const expected = '';

      expect(actual).to.be.equal(expected);
    });

    it('Should have a method called getButton() ', () => {
      const actual = pwPaneButton.getButton() instanceof HTMLButtonElement;
      const expected = true;

      expect(actual).to.be.equal(expected);
    });

    it('Should have a method called getPwProjectItem()', () => {
      const actual = pwPaneButton.getPwProjectItem();
      const expected = pwProjectItem;

      expect(actual).to.be.equal(actual);
    });

    it('Should have a method called emitEvent()', (done) => {
      pwProjectItem.addEventListener('showPanel', function(evt) {
        expect(evt.type).to.be.equal('showPanel');
        expect(evt.target).to.be.equal(pwProjectItem);
        done();
      });

      pwPaneButton.emitEvent(pwProjectItem);
    });
  });

  describe('When component is clicked ', () => {
    it('Should emit the showDialog event for its father component', (done) => {
      const click = new MouseEvent('click');

      pwProjectItem.addEventListener('showPanel', function(evt) {
        expect(evt.type).to.be.equal('showPanel');
        done();
      });

      pwPaneButton.getButton().dispatchEvent(click);
    });
  });
});