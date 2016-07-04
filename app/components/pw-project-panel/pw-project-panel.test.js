import expect from 'expect.js';
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

    it('visible attribute', () => {
      expect(true).to.be.equal(true);
    });
  });
});
