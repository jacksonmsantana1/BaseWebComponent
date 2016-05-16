import expect from 'expect.js';
import pwLikeButton from './pw-like-button.js';

describe('pw-like-button => ', () => {
  let Mock;

  before(() => {
    Mock = document.registerElement('pw-project-info', {
      prototype: Object.create(HTMLElement.prototype)
    });
  });

  describe('Component Attributes => ', () => {
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

  describe('Method dislike() => ', () => {
    let component;
    let pwLikeButton;

    let pwProjectInfo;
    let dislikeEvent;
    let projectId;
    let isListenning;

    beforeEach(() => {
      isListenning = false;
      dislikeEvent = false;
      projectId = '';

      component = document.createElement('pw-like-button');
      document.body.appendChild(component);
      pwLikeButton = document.body.getElementsByTagName('pw-like-button')[0];

      // Mocking the pw-project-info
      pwProjectInfo = new Mock();
      pwProjectInfo.addEventListener('dislike', (evt) => {
        isListenning = true;
        dislikeEvent = true;
        projectId = evt.detail.projectId;
      });
      document.body.appendChild(pwProjectInfo);
    });

    afterEach(() => {
      document.body.removeChild(pwLikeButton);
      document.body.removeChild(pwProjectInfo);
    });

    it('Should have an method called dislike()', () => {
      expect(pwLikeButton.dislike.constructor.name).to.be.equal('Function');
    });

    it('Should emit an event when the dislike method is called', ()  => {
      pwLikeButton.dislike();
      expect(dislikeEvent).to.be.equal(true);
    });

    it('Should pass to the event the project ID when the dislike method is called', () => {
      pwLikeButton.dislike();
      expect(projectId).to.be.equal('VAITOMARNOCU');
    });

    it('Should the pw-project-info be listening for the emmited event', () => {
      pwLikeButton.dislike();
      expect(isListenning).to.be.equal(true);
    });
  });

  describe('Method like() => ', () => {
    let component;
    let pwLikeButton;

    let pwProjectInfo;
    let likeEvent;
    let projectId;
    let isListenning;

    beforeEach(() => {
      isListenning = false;
      likeEvent = false;
      projectId = '';

      component = document.createElement('pw-like-button');
      document.body.appendChild(component);
      pwLikeButton = document.body.getElementsByTagName('pw-like-button')[0];

      // Mocking the pw-project-info
      pwProjectInfo = new Mock();
      pwProjectInfo.addEventListener('like', (evt) => {
        isListenning = true;
        likeEvent = true;
        projectId = evt.detail.projectId;
      });
      document.body.appendChild(pwProjectInfo);
    });

    afterEach(() => {
      document.body.removeChild(pwLikeButton);
      document.body.removeChild(pwProjectInfo);
    });

    it('Should have an method called like()', () => {
      expect(pwLikeButton.like.constructor.name).to.be.equal('Function');
    });

    it('Should emit an event when the like method is called', ()  => {
      pwLikeButton.like();
      expect(likeEvent).to.be.equal(true);
    });

    it('Should pass to the event the project ID when the like method is called', () => {
      pwLikeButton.like();
      expect(projectId).to.be.equal('VAITOMARNOCU');
    });

    it('Should the pw-project-info be listening for the emmited event', () => {
      pwLikeButton.like();
      expect(isListenning).to.be.equal(true);
    });
  });
});

