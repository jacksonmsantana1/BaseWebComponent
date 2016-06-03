import expect from 'expect.js';
import PwProjectItem from './pw-project-item';

describe('pw-project-item', () => {
  describe('Component should contain the ', () => {
    let pwProjectItem;

    beforeEach(() => {
      pwProjectItem = document.createElement('pw-project-item');
      pwProjectItem.id = 'VAITOMARNOCU';
      document.body.appendChild(pwProjectItem);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('id attribute', () => {
      expect(pwProjectItem.id).to.be.equal('VAITOMARNOCU');
      pwProjectItem.id = 'VAITOMARNOANUS';
      expect(pwProjectItem.id).to.be.equal('VAITOMARNOANUS');
    });
  });

  describe('Component should contain the inner', () => {
    let pwProjectItem;

    beforeEach(() => {
      pwProjectItem = document.createElement('pw-project-item');
      pwProjectItem.id = 'VAITOMARNOCU';
      document.body.appendChild(pwProjectItem);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('pw-project-info component', () => {
      expect(pwProjectItem.getPwProjectInfo().constructor.name).to.be.equal('pw-project-info');
      expect(pwProjectItem.getPwProjectInfo().id).to.be.equal('VAITOMARNOCU');
    });
  });
});
