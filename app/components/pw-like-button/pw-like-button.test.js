import expect from 'expect.js';
import pwLikeButton from './pw-like-button.js';

describe('pw-like-button => ', () => {
  let component;
  let pwLikeButton;

  beforeEach(() => {
    component = document.createElement('pw-like-button');
    document.body.appendChild(component);
    pwLikeButton = document.body.getElementsByTagName('pw-like-button')[0];
  });

  afterEach(() => {
    document.body.removeChild(pwLikeButton);
  });

  it('Should have an attribute named projectId', () => {
    expect(pwLikeButton.projectId).to.be.equal('VAITOMARNOCU');
  });

  it('Should have an attribute named active', () => {
    expect(pwLikeButton.isActive).to.be.equal(true);
  });

  it('Should have an attribute named liked', () => {
    expect(pwLikeButton.liked).to.be.equal(false);
  });

  it('Should have an attribute named numberOfLikes', () => {
    expect(pwLikeButton.numberOfLikes).to.be.equal(0);
  });
});
