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

  describe('Component ', () => {
    it('Should contain a property called projectId', () => {});

    it('Should contain a property called path', () => {});
  });

  describe('When initialized component', () => {
    it('Should called the pw-project-info component', () => {});

    it('Should pw-project-info component returns the image path', () => {});

    it('Should set the component attribute path', () => {});
  });

  describe('When is clicked component', () => {
    it('Should call the father component', () => {});

    it('Should the father component call the showPanel() method', () => {});
  });
});
