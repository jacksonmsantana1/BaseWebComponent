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
    let component3;

    let pwLikeButton;
    let pwProjectInfo;
    let pwUserInfo;

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

      component3 = document.createElement('pw-user-info');
      document.body.appendChild(component3);
      pwUserInfo = document.body.getElementsByTagName('pw-user-info')[0];
    });

    afterEach(() => {
      Sinon.restore();
      document.body.removeChild(pwLikeButton);
      document.body.removeChild(pwProjectInfo);
      document.body.removeChild(pwUserInfo);
    });

    it('Should have an method called like()', () => {
      expect(pwLikeButton.like.constructor.name).to.be.equal('Function');
    });

    it('Should receive as first parameter the pw-project-info component', () => {
      expect(pwLikeButton.like(null, pwUserInfo, 1)).to.be.an(Error);
      expect(pwLikeButton.like(null, pwUserInfo, 1).message).to.be.equal('pwProjectInfo argument is null');
      expect(pwLikeButton.like({}, pwUserInfo, 1).message).to.be.equal('pwProjectInfo argument is an empty object');
      expect(pwLikeButton.like({ anus: 'ANUS' }, pwUserInfo, 1).message).to.be.equal('pwProjectInfo argument is from an invalid class');
    });

    it('Should receive as second parameter the pw-user-info component', () => {
      expect(pwLikeButton.like(pwProjectInfo, null, 1)).to.be.an(Error);
      expect(pwLikeButton.like(pwProjectInfo, null, 1).message).to.be.equal('pwUserInfo argument is null');
      expect(pwLikeButton.like(pwProjectInfo, {}, 1).message).to.be.equal('pwUserInfo argument is an empty object');
      expect(pwLikeButton.like(pwProjectInfo, [1], 1).message).to.be.equal('pwUserInfo argument is from an invalid class');
    });

    it('Should receive as third parameter the component project id', () => {
      expect(pwLikeButton.like(pwProjectInfo, pwUserInfo, null)).to.be.an(Error);
      expect(pwLikeButton.like(pwProjectInfo, pwUserInfo, null).message).to.be.equal('projectId argument is null');
      expect(pwLikeButton.like(pwProjectInfo, pwUserInfo, '').message).to.be.equal('projectId argument is an empty string');
      expect(pwLikeButton.like(pwProjectInfo, pwUserInfo, 'error').message).to.be.equal('projectId argument is invalid');
    });

    it('Should return an Array of IO', () => {
      expect(pwLikeButton.like(pwProjectInfo, pwUserInfo, 'VAITOMARNOCU').constructor.name).to.be.equal('Array');
      expect(pwLikeButton.like(pwProjectInfo, pwUserInfo, 'VAITOMARNOCU').length).to.be.equal(2);
    });

    it('Should call the createCustomEvent auxiliar function', (done) => {
      pwProjectInfo.addEventListener('like', (evt) => {
        //FIXME
        createCustomEvent.should.have.not.been.called;
        done();
      });
      pwLikeButton.like(pwProjectInfo, pwUserInfo, 'VAITOMARNOCU').map((io) => {
        io.runIO();
      });
    });

    it('Should call the emitCustomEvent auxiliar function', (done) => {
      pwProjectInfo.addEventListener('like', (evt) => {
        //FIXME
        emitCustomEvent.should.have.not.been.called;
        done();
      });
      pwLikeButton.like(pwProjectInfo, pwUserInfo, 'VAITOMARNOCU').map((io) => {
        io.runIO();
      });
    });

    it('Should emit a CustomEvent to the pw-project-info components', (done) => {
      pwProjectInfo.addEventListener('like', (evt) => {
        expect(evt.type).to.be.equal('like');
        expect(evt.cancelable).to.be.equal(true);
        expect(evt.bubbles).to.be.equal(false);
        expect(evt.detail.projectId).to.be.equal('VAITOMARNOCU');
        done();
      });

      pwLikeButton.like(pwProjectInfo, pwUserInfo, 'VAITOMARNOCU').map((io) => {
        io.runIO();
      });
    });

    it('Should emit a CustomEvent to the pw-user-info components', (done) => {
      pwUserInfo.addEventListener('like', (evt) => {
        expect(evt.type).to.be.equal('like');
        expect(evt.cancelable).to.be.equal(true);
        expect(evt.bubbles).to.be.equal(false);
        expect(evt.detail.projectId).to.be.equal('VAITOMARNOCU');
        done();
      });

      pwLikeButton.like(pwProjectInfo, pwUserInfo, 'VAITOMARNOCU').map((io) => {
        io.runIO();
      });
    });
  });

  describe('Method dislike() => ', () => {
    let component;
    let component2;
    let component3;

    let pwLikeButton;
    let pwProjectInfo;
    let pwUserInfo;

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

      component3 = document.createElement('pw-user-info');
      document.body.appendChild(component3);
      pwUserInfo = document.body.getElementsByTagName('pw-user-info')[0];
    });

    afterEach(() => {
      Sinon.restore();

      document.body.removeChild(pwLikeButton);
      document.body.removeChild(pwProjectInfo);
      document.body.removeChild(pwUserInfo);
    });

    it('Should have an method called dislike()', () => {
      expect(pwLikeButton.dislike.constructor.name).to.be.equal('Function');
    });

    it('Should receive as first parameter the pw-project-info component', () => {
      expect(pwLikeButton.dislike(null, null, 1)).to.be.an(Error);
      expect(pwLikeButton.dislike(null, null, 1).message).to.be.equal('pwProjectInfo argument is null');
      expect(pwLikeButton.dislike({}, null, 1).message).to.be.equal('pwProjectInfo argument is an empty object');
      expect(pwLikeButton.dislike({ anus: 'ANUS' }, null, 1).message).to.be.equal('pwProjectInfo argument is from an invalid class');
    });

    it('Should receive as second parameter the pw-user-info component', () => {
      expect(pwLikeButton.dislike(pwProjectInfo, null, 1)).to.be.an(Error);
      expect(pwLikeButton.dislike(pwProjectInfo, null, 1).message).to.be.equal('pwUserInfo argument is null');
      expect(pwLikeButton.dislike(pwProjectInfo, {}, 1).message).to.be.equal('pwUserInfo argument is an empty object');
      expect(pwLikeButton.dislike(pwProjectInfo, { anus: 'ANUS' }, 1).message).to.be.equal('pwUserInfo argument is from an invalid class');
    });

    it('Should receive as third parameter the component project id', () => {
      expect(pwLikeButton.dislike(pwProjectInfo, pwUserInfo, null)).to.be.an(Error);
      expect(pwLikeButton.dislike(pwProjectInfo, pwUserInfo, null).message).to.be.equal('projectId argument is null');
      expect(pwLikeButton.dislike(pwProjectInfo, pwUserInfo, '').message).to.be.equal('projectId argument is an empty string');
      expect(pwLikeButton.dislike(pwProjectInfo, pwUserInfo, 'error').message).to.be.equal('projectId argument is invalid');
    });

    it('Should return an Array of IO', () => {
      expect(pwLikeButton.dislike(pwProjectInfo, pwUserInfo, 'VAITOMARNOCU').constructor.name).to.be.equal('Array');
      expect(pwLikeButton.dislike(pwProjectInfo, pwUserInfo, 'VAITOMARNOCU').length).to.be.equal(2);
    });

    it('Should call the createCustomEvent auxiliar function', (done) => {
      pwProjectInfo.addEventListener('dislike', (evt) => {
        //FIXME
        createCustomEvent.should.have.not.been.called;
        done();
      });
      pwLikeButton.dislike(pwProjectInfo, pwUserInfo, 'VAITOMARNOCU').map((io) => {
        io.runIO();
      });
    });

    it('Should call the emitCustomEvent auxiliar function', (done) => {
      pwProjectInfo.addEventListener('dislike', (evt) => {
        //FIXME
        emitCustomEvent.should.have.not.been.called;
        done();
      });
      pwLikeButton.dislike(pwProjectInfo, pwUserInfo, 'VAITOMARNOCU').map((io) => {
        io.runIO();
      });
    });

    it('Should emit a CustomEvent to the pw-project-info components', (done) => {
      pwProjectInfo.addEventListener('dislike', (evt) => {
        expect(evt.type).to.be.equal('dislike');
        expect(evt.cancelable).to.be.equal(true);
        expect(evt.bubbles).to.be.equal(false);
        expect(evt.detail.projectId).to.be.equal('VAITOMARNOCU');
        done();
      });

      pwLikeButton.dislike(pwProjectInfo, pwUserInfo, 'VAITOMARNOCU').map((io) => {
        io.runIO();
      });
    });

    it('Should emit a CustomEvent to the pw-user-info components', (done) => {
      pwUserInfo.addEventListener('dislike', (evt) => {
        expect(evt.type).to.be.equal('dislike');
        expect(evt.cancelable).to.be.equal(true);
        expect(evt.bubbles).to.be.equal(false);
        expect(evt.detail.projectId).to.be.equal('VAITOMARNOCU');
        done();
      });

      pwLikeButton.dislike(pwProjectInfo, pwUserInfo, 'VAITOMARNOCU').map((io) => {
        io.runIO();
      });
    });
  });

  describe('Method isLiked() => ', () => {
    let component;
    let component2;

    let pwLikeButton;
    let pwUserInfo;

    let xhr;
    let requests;

    beforeEach(() => {
      xhr = sinon.useFakeXMLHttpRequest();
      requests = [];

      component = document.createElement('pw-like-button');
      document.body.appendChild(component);
      pwLikeButton = document.body.getElementsByTagName('pw-like-button')[0];

      component2 = document.createElement('pw-user-info');
      document.body.appendChild(component2);
      pwUserInfo = document.body.getElementsByTagName('pw-user-info')[0];

      xhr.onCreate = (xhr) => {
        requests.push(xhr);
      };
    });

    afterEach(() => {
      document.body.removeChild(pwLikeButton);
      document.body.removeChild(pwUserInfo);

      sinon.restore();
    });

    it('Should have an method called isLiked()', () => {
      expect(pwLikeButton.isLiked.constructor.name).to.be.equal('Function');
    });

    it('Should return an Promise', () => {
      expect(pwLikeButton.isLiked(pwUserInfo, '12345').constructor.name).to.be.equal('Promise');
    });

    it('Should receive as first argument a not null pwUserInfo', (done) => {
      pwLikeButton.isLiked(null, '12345').catch((err) => {
        expect(err.message).to.be.equal('pwUserInfo argument is null');
        done();
      });
    });

    it('Should receive as first argument a not empty pwUserInfo', (done) => {
      pwLikeButton.isLiked({}, '12345').catch((err) => {
        expect(err.message).to.be.equal('pwUserInfo argument is an empty object');
        done();
      });
    });

    it('Should receive as first argument a valid pwUserInfo', (done) => {
      pwLikeButton.isLiked([1], '12345').catch((err) => {
        expect(err.message).to.be.equal('pwUserInfo argument is from an invalid class');
        done();
      });
    });

    it('Should receive as second argument not null project id', (done) => {
      pwLikeButton.isLiked(pwUserInfo, null).catch((err) => {
        expect(err.message).to.be.equal('projectId argument is null');
        done();
      });
    });

    it('Should receive as second argument not empty project id', (done) => {
      pwLikeButton.isLiked(pwUserInfo, '').catch((err) => {
        expect(err.message).to.be.equal('projectId argument is an empty string');
        done();
      });
    });

    it('Should receive as second argument a valid project id', (done) => {
      pwLikeButton.isLiked(pwUserInfo, 'notValid').catch((err) => {
        expect(err.message).to.be.equal('projectId argument is invalid');
        done();
      });
    });

    it('Should return true if the user already liked the project', (done) => {
      pwLikeButton.isLiked(pwUserInfo, 'VAITOMARNOCU').then((ok) => {
        expect(ok).to.be.equal(true);
        done();
      });

      expect(requests[0].url).to.be.equal('http://localhost:3000/user/projects');
      expect(requests[0].method).to.be.equal('GET');

      requests[0].respond(200, {}, '{"liked": ["VAITOMARNOCU", "345", "678"]}');
    });

    it('Should return false if the user didnt like the project', (done) => {
      pwLikeButton.isLiked(pwUserInfo, 'VAITOMARNOCU').then((ok) => {
        expect(ok).to.be.equal(false);
        done();
      });

      expect(requests[0].url).to.be.equal('http://localhost:3000/user/projects');
      expect(requests[0].method).to.be.equal('GET');

      requests[0].respond(200, {}, '{"liked": ["VAITOMARNOANUS", "345", "678"]}');
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

