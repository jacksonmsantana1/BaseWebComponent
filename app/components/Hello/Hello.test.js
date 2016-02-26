import expect from 'expect.js';
import Hello from './Hello.js';

describe('Component: Hello =>', () => {
  describe('createdCallback() ->', () => {
    it('Should done nothing', () => {
      let hello = document.createElement('pw-hello');
      document.body.appendChild(hello);
      expect(true).to.be.true;
    });
  });
});

