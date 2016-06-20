import expect from 'expect.js';
import pwPanelButton from './pw-panel-button';

describe('pw-panel-button => ', () => {
  let pwPaneButton;

  before(() => {
    document.body.innerHTML = '';
  });

  beforeEach(() => {
    pwPaneButton = document.createElement('pw-panel-button');
    document.body.appendChild(pwPaneButton);
  });

  afterEach(() => {
    document.body.removeChild(pwPaneButton);
  });

  describe('Component ', () => {
    it('Should contain a property called ...', () => {
      expect(true).to.be.equal(true);
    });
  });
});