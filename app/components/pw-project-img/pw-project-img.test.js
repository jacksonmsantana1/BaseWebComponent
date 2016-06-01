import expect from 'expect.js';
import pwProjectImg from './pw-project-img';

describe('pw-project-img => ', () => {
  let component;

  beforeEach(() => {
    component = document.createElement('pw-project-img');
    document.body.appendChild(component);
  });

  afterEach(() => {
    document.body.removeChild(component);
  });

  it('Component ...', () => {});
});
