import expect from 'expect.js';
import Maybe from 'data.maybe';
import PwProjectPanel from './pw-project-panel.js';

describe('pw-project-panel', () => {
  describe('Component should contain the ', () => {
    let pwProjectPanel;

    beforeEach(() => {
      pwProjectPanel = document.createElement('pw-project-panel');
      document.body.appendChild(pwProjectPanel);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('activeButton() method, which returns a Maybe ->', () => {
      const actual = pwProjectPanel.activeButton() instanceof Maybe;
      const expected = true;

      expect(actual).to.be.equal(expected);
    });

    it('the Maybe should contain an input[checkbox] button.', () => {
      const actual = pwProjectPanel.activeButton().get();
      const expected = pwProjectPanel.shadowRoot.childNodes[0].childNodes[1];

      expect(actual).to.be.equal(expected);
    });

    it('toggleVisible() method, which checks the returned input by the activeButton() fn', () => {
      pwProjectPanel.toggleVisible();

      const actual = pwProjectPanel.activeButton().get().checked;
      const expected = true;

      expect(actual).to.be.equal(expected);
    });
  });
});
