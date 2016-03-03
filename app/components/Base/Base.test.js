import expect from 'expect.js';
import Base from './Base.js';

describe('Component: Base =>', () => {
  describe('createdCallback() ->', () => {
    it('Should ...', () => {
      let component = document.createElement('pw-base');
      document.body.appendChild(component);
      expect(true).to.be.true;
    });
  });
});

