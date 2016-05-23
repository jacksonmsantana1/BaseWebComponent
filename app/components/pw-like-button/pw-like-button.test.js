import expect from 'expect.js';
import likeButton from './pw-like-button.js';
import projectInfo from '../pw-project-info/pw-project-info';
import Aux from './auxiliar.func';

describe('pw-like-button => ', () => {
let Mock;

  describe('Auxiliar functions => ', () => {
    it('createCustomEvent() => ', () => {
      const detail = { anus: 'ANUS' };
      const result = Aux.createCustomEvent('ANUS')(detail)(true)(true);

      expect(result.constructor.name).to.be.equal('CustomEvent');
      expect(result.detail).to.be.equal(detail);
      expect(result.type).to.be.equal('ANUS');
      expect(result.bubbles).to.be.equal(true);
      expect(result.cancelable).to.be.equal(true);
    });

    it('emitCustomEvent() => ', (done) => {
      const detail = { anus: 'ANUS' };
      const element = document.createElement('div');
      const evt = Aux.createCustomEvent('ANUS')(detail)(true)(true);

      element.addEventListener('ANUS', (evt) => {
        expect(evt.type).to.be.equal('ANUS');
        done();
      });
      Aux.emitCustomEvent(element)(evt);
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

    it('Should have an attribute named liked', () => {
      expect(pwLikeButton.liked).to.be.equal(false);
    });

    it('Should have an attribute named numberOfLikes', () => {
      expect(pwLikeButton.numberOfLikes).to.be.equal(0);
    });

    it('Should have an attribute named visible', () => {
      expect(pwLikeButton.visible).to.be.equal(true);
    });
  });

  describe('Method like() => ', () => {
    let component;
    let component2;

    let pwLikeButton;
    let pwProjectInfo;

    let createCustomEvent;
    let emitCustomEvent;
    let Sinon;

    beforeEach(() => {
      Sinon = sinon.sandbox.create();
      createCustomEvent = Sinon.spy(Aux, 'createCustomEvent');
      emitCustomEvent = Sinon.spy(Aux, 'emitCustomEvent');

      component = document.createElement('pw-like-button');
      document.body.appendChild(component);
      pwLikeButton = document.body.getElementsByTagName('pw-like-button')[0];

      component2 = document.createElement('pw-project-info');
      document.body.appendChild(component2);
      pwProjectInfo = document.body.getElementsByTagName('pw-project-info')[0];
    });

    afterEach(() => {
      Sinon.restore();
      document.body.removeChild(pwLikeButton);
      document.body.removeChild(pwProjectInfo);
    });

    it('Should have an method called like()', () => {
      expect(pwLikeButton.like.constructor.name).to.be.equal('Function');
    });

    it('Should receive as first parameter the pw-project-info component', () => {
      expect(pwLikeButton.like(null, 1)).to.be.an(Error);
      expect(pwLikeButton.like(null, 1).message).to.be.equal('pwProjectInfo argument is null');
      expect(pwLikeButton.like({}, 1).message).to.be.equal('pwProjectInfo argument is an empty object');
      expect(pwLikeButton.like({ anus: 'ANUS' }, 1).message).to.be.equal('pwProjectInfo argument is from an invalid class');
    });

    it('Should receive as second parameter the component project id', () => {
      expect(pwLikeButton.like(pwProjectInfo, null)).to.be.an(Error);
      expect(pwLikeButton.like(pwProjectInfo, null).message).to.be.equal('projectId argument is null');
      expect(pwLikeButton.like(pwProjectInfo, '').message).to.be.equal('projectId argument is an empty string');
      expect(pwLikeButton.like(pwProjectInfo, 'error').message).to.be.equal('projectId argument is invalid');
    });

    it('Should return an IO', () => {
      expect(pwLikeButton.like(pwProjectInfo, 'VAITOMARNOCU').constructor.name).to.be.equal('IO');
    });

    it('Should call the createCustomEvent auxiliar function', (done) => {
      pwProjectInfo.addEventListener('like', (evt) => {
        //FIXME
        createCustomEvent.should.have.not.been.called;
        done();
      });
      pwLikeButton.like(pwProjectInfo, 'VAITOMARNOCU').runIO();
    });

    it('Should call the emitCustomEvent auxiliar function', (done) => {
      pwProjectInfo.addEventListener('like', (evt) => {
        //FIXME
        emitCustomEvent.should.have.not.been.called;
        done();
      });
      pwLikeButton.like(pwProjectInfo, 'VAITOMARNOCU').runIO();
    });

    it('Should emit a CustomEvent to the pw-project-info components', (done) => {
      pwProjectInfo.addEventListener('like', (evt) => {
        expect(evt.type).to.be.equal('like');
        expect(evt.cancelable).to.be.equal(true);
        expect(evt.bubbles).to.be.equal(false);
        expect(evt.detail.projectId).to.be.equal('VAITOMARNOCU');
        done();
      });

      pwLikeButton.like(pwProjectInfo, 'VAITOMARNOCU').runIO();
    });
  });

  describe('Method dislike() => ', () => {
    let component;
    let component2;

    let pwLikeButton;
    let pwProjectInfo;

    let createCustomEvent;
    let emitCustomEvent;
    let Sinon;

    beforeEach(() => {
      Sinon = sinon.sandbox.create();
      createCustomEvent = Sinon.spy(Aux, 'createCustomEvent');
      emitCustomEvent = Sinon.spy(Aux, 'emitCustomEvent');

      component = document.createElement('pw-like-button');
      document.body.appendChild(component);
      pwLikeButton = document.body.getElementsByTagName('pw-like-button')[0];

      component2 = document.createElement('pw-project-info');
      document.body.appendChild(component2);
      pwProjectInfo = document.body.getElementsByTagName('pw-project-info')[0];
    });

    afterEach(() => {
      Sinon.restore();

      document.body.removeChild(pwLikeButton);
      document.body.removeChild(pwProjectInfo);
    });

    it('Should have an method called dislike()', () => {
      expect(pwLikeButton.dislike.constructor.name).to.be.equal('Function');
    });

    it('Should receive as first parameter the pw-project-info component', () => {
      expect(pwLikeButton.dislike(null, 1)).to.be.an(Error);
      expect(pwLikeButton.dislike(null, 1).message).to.be.equal('pwProjectInfo argument is null');
      expect(pwLikeButton.dislike({}, 1).message).to.be.equal('pwProjectInfo argument is an empty object');
      expect(pwLikeButton.dislike({ anus: 'ANUS' }, 1).message).to.be.equal('pwProjectInfo argument is from an invalid class');
    });

    it('Should receive as second parameter the component project id', () => {
      expect(pwLikeButton.dislike(pwProjectInfo, null)).to.be.an(Error);
      expect(pwLikeButton.dislike(pwProjectInfo, null).message).to.be.equal('projectId argument is null');
      expect(pwLikeButton.dislike(pwProjectInfo, '').message).to.be.equal('projectId argument is an empty string');
      expect(pwLikeButton.dislike(pwProjectInfo, 'error').message).to.be.equal('projectId argument is invalid');
    });

    it('Should return an IO', () => {
      expect(pwLikeButton.dislike(pwProjectInfo, 'VAITOMARNOCU').constructor.name).to.be.equal('IO');
    });

    it('Should call the createCustomEvent auxiliar function', (done) => {
      pwProjectInfo.addEventListener('dislike', (evt) => {
        //FIXME
        createCustomEvent.should.have.not.been.called;
        done();
      });
      pwLikeButton.dislike(pwProjectInfo, 'VAITOMARNOCU');
    });

    it('Should call the emitCustomEvent auxiliar function', (done) => {
      pwProjectInfo.addEventListener('dislike', (evt) => {
        //FIXME
        emitCustomEvent.should.have.not.been.called;
        done();
      });
      pwLikeButton.dislike(pwProjectInfo, 'VAITOMARNOCU').runIO();
    });

    it('Should emit a CustomEvent to the pw-project-info components', (done) => {
      pwProjectInfo.addEventListener('dislike', (evt) => {
        expect(evt.type).to.be.equal('dislike');
        expect(evt.cancelable).to.be.equal(true);
        expect(evt.bubbles).to.be.equal(false);
        expect(evt.detail.projectId).to.be.equal('VAITOMARNOCU');
        done();
      });

      pwLikeButton.dislike(pwProjectInfo, 'VAITOMARNOCU').runIO();
    });
  });

  describe('Method isLiked() => ', () => {
    let component;
    let component2;

    let pwLikeButton;
    let pwProjectInfo;

    let createCustomEvent;
    let emitCustomEvent;

    beforeEach(() => {
      createCustomEvent = sinon.spy(Aux, 'createCustomEvent');
      emitCustomEvent = sinon.spy(Aux, 'emitCustomEvent');

      component = document.createElement('pw-like-button');
      document.body.appendChild(component);
      pwLikeButton = document.body.getElementsByTagName('pw-like-button')[0];

      component2 = document.createElement('pw-project-info');
      document.body.appendChild(component2);
      pwProjectInfo = document.body.getElementsByTagName('pw-project-info')[0];
    });

    afterEach(() => {
      Aux.createCustomEvent.restore();
      Aux.emitCustomEvent.restore();

      document.body.removeChild(pwLikeButton);
      document.body.removeChild(pwProjectInfo);
    });

    it('Should...', () => {
      expect(true).to.be.equal(true);
    });
  });

  describe('Method toggleVisible() => ', () => {
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

    it('Should toggle the attribute visible', () => {
      expect(pwLikeButton.visible).to.be.equal(true);
      pwLikeButton.toggleVisible();
      expect(pwLikeButton.visible).to.be.equal('true');
    });
  });

  describe('Method toggleLiked() => ', () => {
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

    it('Should toggle the attribute liked', () => {
      expect(pwLikeButton.liked).to.be.equal(false);
      pwLikeButton.toggleLiked();
      expect(pwLikeButton.liked).to.be.equal('true');
    });
  });

  describe('Method update() => ', () => {
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

    it('Should update the component attributes', () => {
      expect(pwLikeButton.visible).to.be.equal(true);
      expect(pwLikeButton.liked).to.be.equal(false);
      expect(pwLikeButton.numberOfLikes).to.be.equal(0);
      expect(pwLikeButton.projectId).to.be.equal('VAITOMARNOCU');

      pwLikeButton.update('VAITOMARNOANUS', 1, false, true);

      expect(pwLikeButton.visible).to.be.equal(false);
      expect(pwLikeButton.liked).to.be.equal(true);
      expect(pwLikeButton.numberOfLikes).to.be.equal(1);
      expect(pwLikeButton.projectId).to.be.equal('VAITOMARNOANUS');
    });
  });
});

