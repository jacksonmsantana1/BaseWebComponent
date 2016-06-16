import expect from 'expect.js';
import PwProjectLabel from './pw-project-label';

describe('pw-project-label', () => {
  describe('Component should contain the ', () => {
    let pwProjectLabel;
    let stub;

    beforeEach(() => {
      pwProjectLabel = document.createElement('pw-project-label');
      document.body.appendChild(pwProjectLabel);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('name attribute', () => {
      expect(pwProjectLabel.name).to.be.equal('');
      pwProjectLabel.name = 'VAITOMARNOANUS';
      expect(pwProjectLabel.name).to.be.equal('VAITOMARNOANUS');
    });

    it('type attribute', () => {
      expect(pwProjectLabel.type).to.be.equal('');
      pwProjectLabel.type = 'VAITOMARNOANUS';
      expect(pwProjectLabel.type).to.be.equal('VAITOMARNOANUS');
    });
  });
});