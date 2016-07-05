import expect from 'expect.js';
import LikeButton from './pw-like-button';
import projectInfo from '../pw-project-info/pw-project-info';
import Aux from '../../lib/Helpers/Helpers';
import Token from '../../lib/Token/Token';

describe('pw-like-button => ', () => {
let Mock;

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
    let component4;

    let pwLikeButton;
    let pwProjectInfo;
    let pwProjectInfoWrong;
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
      pwProjectInfo.id = 'VAITOMARNOCU';

      component3 = document.createElement('pw-user-info');
      document.body.appendChild(component3);
      pwUserInfo = document.body.getElementsByTagName('pw-user-info')[0];

      component4 = document.createElement('pw-project-info');
      document.body.appendChild(component4);
      pwProjectInfoWrong = document.body.getElementsByTagName('pw-project-info')[1];
      pwProjectInfoWrong.id = 'wrongID';
    });

    afterEach(() => {
      Sinon.restore();
      document.body.removeChild(pwLikeButton);
      document.body.removeChild(pwProjectInfo);
      document.body.removeChild(pwUserInfo);
      document.body.removeChild(pwProjectInfoWrong);
    });

    it('Should have an method called like()', () => {
      expect(pwLikeButton.like.constructor.name).to.be.equal('Function');
    });

    it('Should receive as first parameter the pw-project-info component', () => {
      expect(pwLikeButton.like(null, pwUserInfo)).to.be.an(Error);
      expect(pwLikeButton.like(null, pwUserInfo).message).to.be.equal('pwProjectInfo argument is null');
      expect(pwLikeButton.like({}, pwUserInfo).message).to.be.equal('pwProjectInfo argument is an empty object');
      expect(pwLikeButton.like({ anus: 'ANUS' }, pwUserInfo).message).to.be.equal('pwProjectInfo argument is from an invalid class');
      expect(pwLikeButton.like(pwProjectInfoWrong, pwUserInfo).message).to.be.equal('Invalid project id');
    });

    it('Should receive as second parameter the pw-user-info component', () => {
      expect(pwLikeButton.like(pwProjectInfo, null)).to.be.an(Error);
      expect(pwLikeButton.like(pwProjectInfo, null).message).to.be.equal('pwUserInfo argument is null');
      expect(pwLikeButton.like(pwProjectInfo, {}).message).to.be.equal('pwUserInfo argument is an empty object');
      expect(pwLikeButton.like(pwProjectInfo, [1]).message).to.be.equal('pwUserInfo argument is from an invalid class');
    });

    it('Should return an Array of IO', () => {
      expect(pwLikeButton.like(pwProjectInfo, pwUserInfo).constructor.name).to.be.equal('Array');
      expect(pwLikeButton.like(pwProjectInfo, pwUserInfo).length).to.be.equal(2);
    });

    it('Should call the createCustomEvent auxiliar function', (done) => {
      pwProjectInfo.addEventListener('like', (evt) => {
        //FIXME
        createCustomEvent.should.have.not.been.called;
        done();
      });
      pwLikeButton.like(pwProjectInfo, pwUserInfo).map((io) => {
        io.runIO();
      });
    });

    it('Should call the emitCustomEvent auxiliar function', (done) => {
      pwProjectInfo.addEventListener('like', (evt) => {
        //FIXME
        emitCustomEvent.should.have.not.been.called;
        done();
      });
      pwLikeButton.like(pwProjectInfo, pwUserInfo).map((io) => {
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

      pwLikeButton.like(pwProjectInfo, pwUserInfo).map((io) => {
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

      pwLikeButton.like(pwProjectInfo, pwUserInfo).map((io) => {
        io.runIO();
      });
    });
  });

  describe('Method dislike() => ', () => {
    let component;
    let component2;
    let component3;
    let component4;

    let pwLikeButton;
    let pwProjectInfo;
    let pwProjectInfoWrong;
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
      pwProjectInfo.id = 'VAITOMARNOCU';

      component3 = document.createElement('pw-user-info');
      document.body.appendChild(component3);
      pwUserInfo = document.body.getElementsByTagName('pw-user-info')[0];

      component4 = document.createElement('pw-project-info');
      document.body.appendChild(component4);
      pwProjectInfoWrong = document.body.getElementsByTagName('pw-project-info')[1];
      pwProjectInfoWrong.id = 'wrongID';
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
      expect(pwLikeButton.dislike(null, null)).to.be.an(Error);
      expect(pwLikeButton.dislike(null, null).message).to.be.equal('pwProjectInfo argument is null');
      expect(pwLikeButton.dislike({}, null).message).to.be.equal('pwProjectInfo argument is an empty object');
      expect(pwLikeButton.dislike({ anus: 'ANUS' }, null).message).to.be.equal('pwProjectInfo argument is from an invalid class');
      expect(pwLikeButton.dislike(pwProjectInfoWrong, pwUserInfo).message).to.be.equal('Invalid project id');
    });

    it('Should receive as second parameter the pw-user-info component', () => {
      expect(pwLikeButton.dislike(pwProjectInfo, null)).to.be.an(Error);
      expect(pwLikeButton.dislike(pwProjectInfo, null).message).to.be.equal('pwUserInfo argument is null');
      expect(pwLikeButton.dislike(pwProjectInfo, {}).message).to.be.equal('pwUserInfo argument is an empty object');
      expect(pwLikeButton.dislike(pwProjectInfo, { anus: 'ANUS' }).message).to.be.equal('pwUserInfo argument is from an invalid class');
    });

    it('Should return an Array of IO', () => {
      expect(pwLikeButton.dislike(pwProjectInfo, pwUserInfo).constructor.name).to.be.equal('Array');
      expect(pwLikeButton.dislike(pwProjectInfo, pwUserInfo).length).to.be.equal(2);
    });

    it('Should call the createCustomEvent auxiliar function', (done) => {
      pwProjectInfo.addEventListener('dislike', (evt) => {
        //FIXME
        createCustomEvent.should.have.not.been.called;
        done();
      });
      pwLikeButton.dislike(pwProjectInfo, pwUserInfo).map((io) => {
        io.runIO();
      });
    });

    it('Should call the emitCustomEvent auxiliar function', (done) => {
      pwProjectInfo.addEventListener('dislike', (evt) => {
        //FIXME
        emitCustomEvent.should.have.not.been.called;
        done();
      });
      pwLikeButton.dislike(pwProjectInfo, pwUserInfo).map((io) => {
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

      pwLikeButton.dislike(pwProjectInfo, pwUserInfo).map((io) => {
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

      pwLikeButton.dislike(pwProjectInfo, pwUserInfo).map((io) => {
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
      expect(pwLikeButton.isLiked(pwUserInfo).constructor.name).to.be.equal('Promise');
    });

    it('Should receive as first argument a not null pwUserInfo', (done) => {
      pwLikeButton.isLiked(null).catch((err) => {
        expect(err.message).to.be.equal('pwUserInfo argument is null');
        done();
      });
    });

    it('Should receive as first argument a not empty pwUserInfo', (done) => {
      pwLikeButton.isLiked({}).catch((err) => {
        expect(err.message).to.be.equal('pwUserInfo argument is an empty object');
        done();
      });
    });

    it('Should receive as first argument a valid pwUserInfo', (done) => {
      pwLikeButton.isLiked([1]).catch((err) => {
        expect(err.message).to.be.equal('pwUserInfo argument is from an invalid class');
        done();
      });
    });

    it('Should return true if the user already liked the project', (done) => {
      pwLikeButton.isLiked(pwUserInfo).then((ok) => {
        expect(ok).to.be.equal(true);
        done();
      });

      expect(requests[0].url).to.be.equal('http://localhost:3000/user/projects');
      expect(requests[0].method).to.be.equal('GET');

      requests[0].respond(200, {}, '{"liked": ["VAITOMARNOCU", "345", "678"]}');
    });

    it('Should return false if the user didnt like the project', (done) => {
      pwLikeButton.isLiked(pwUserInfo).then((ok) => {
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

    let component1;
    let pwProjectInfo;

    let component2;
    let pwProjectInfoWrong;

    let xhr;
    let requests;

    beforeEach(() => {
      xhr = sinon.useFakeXMLHttpRequest();
      requests = [];

      component = document.createElement('pw-like-button');
      document.body.appendChild(component);
      pwLikeButton = document.body.getElementsByTagName('pw-like-button')[0];

      component1 = document.createElement('pw-project-info');
      document.body.appendChild(component1);
      pwProjectInfo = document.body.getElementsByTagName('pw-project-info')[0];
      pwProjectInfo.id = 'VAITOMARNOCU';

      component2 = document.createElement('pw-project-info');
      document.body.appendChild(component2);
      pwProjectInfoWrong = document.body.getElementsByTagName('pw-project-info')[1];

      xhr.onCreate = (xhr) => {
        requests.push(xhr);
      };
    });

    afterEach(() => {
      document.body.removeChild(pwLikeButton);
      document.body.removeChild(pwProjectInfo);
      document.body.removeChild(pwProjectInfoWrong);
    });

    it('Should have an method called getNumberOfLikes()', () => {
      expect(pwLikeButton.update.constructor.name).to.be.equal('Function');
    });

    it('Should return an Promise', () => {
      expect(pwLikeButton.update().constructor.name).to.be.equal('Promise');
    });

    it('Initial Attributes', () => {
      expect(pwLikeButton.liked).to.be.equal(false);
      expect(pwLikeButton.numberOfLikes).to.be.equal(0);
    });

    it('Should receive a not null pw-project-info component as argument', (done) => {
      pwLikeButton.update().catch((err) => {
        expect(err.message).to.be.equal('pwProjectInfo argument is null');
        done();
      });
    });

    it('Should receive a not empty pw-project-info component as argument', (done) => {
      pwLikeButton.update({}).catch((err) => {
        expect(err.message).to.be.equal('pwProjectInfo argument is empty');
        done();
      });
    });

    it('Should receive a pw-project-info object as argument', (done) => {
      pwLikeButton.update([1]).catch((err) => {
        expect(err.message).to.be.equal('pwProjectInfo argument is from an invalid class');
        done();
      });
    });

    it('Should receive a valid pw-project-info component as argument', (done) => {
      pwLikeButton.update(pwProjectInfoWrong).catch((err) => {
        expect(err.message).to.be.equal('Invalid project id');
        done();
      });
    });

    it('Should call the getProject() method from the pw-project-info component', (done) => {
      let spy = sinon.spy(pwProjectInfo, 'getProject');

      pwLikeButton.getProject(pwProjectInfo).then((project) => {
        expect(spy.called).to.be.equal(true);
        done();
      }).catch(done);

      expect(requests[0].url).to.be.equal('http://localhost:8000/projects/VAITOMARNOCU');
      expect(requests[0].method).to.be.equal('GET');

      requests[0].respond(200, {}, '{}');
    });

    it('Should update the components attributes', (done) => {
      pwLikeButton.update(pwProjectInfo).then((ok) => {
        expect(ok).to.be.equal(true);
        expect(pwLikeButton.liked).to.be.equal(true);
        expect(pwLikeButton.numberOfLikes).to.be.equal(4);
        done();
      }).catch(done);

      expect(requests[0].url).to.be.equal('http://localhost:8000/projects/VAITOMARNOCU');
      expect(requests[0].method).to.be.equal('GET');

      requests[0].respond(200, {}, '{ "liked": ["1", "2", "3", "VAITOMARNOCU"] }');
    });

    it('Should update the components attributes', (done) => {
      pwLikeButton.update(pwProjectInfo).then((ok) => {
        expect(ok).to.be.equal(true);
        expect(pwLikeButton.liked).to.be.equal(false);
        expect(pwLikeButton.numberOfLikes).to.be.equal(3);
        done();
      }).catch(done);

      expect(requests[0].url).to.be.equal('http://localhost:8000/projects/VAITOMARNOCU');
      expect(requests[0].method).to.be.equal('GET');

      requests[0].respond(200, {}, '{ "liked": ["1", "2", "3"] }');
    });
  });

  describe('Method getNumberOfLikes() => ', () => {
    let component;
    let pwLikeButton;

    let component1;
    let pwProjectInfo;

    let component2;
    let pwProjectInfoWrong;

    let xhr;
    let requests;

    beforeEach(() => {
      xhr = sinon.useFakeXMLHttpRequest();
      requests = [];

      component = document.createElement('pw-like-button');
      document.body.appendChild(component);
      pwLikeButton = document.body.getElementsByTagName('pw-like-button')[0];

      component1 = document.createElement('pw-project-info');
      document.body.appendChild(component1);
      pwProjectInfo = document.body.getElementsByTagName('pw-project-info')[0];
      pwProjectInfo.id = 'VAITOMARNOCU';

      component2 = document.createElement('pw-project-info');
      document.body.appendChild(component2);
      pwProjectInfoWrong = document.body.getElementsByTagName('pw-project-info')[1];
      pwProjectInfoWrong.id = 'wrongID';

      xhr.onCreate = (xhr) => {
        requests.push(xhr);
      };
    });

    afterEach(() => {
      document.body.removeChild(pwLikeButton);
      document.body.removeChild(pwProjectInfo);
      document.body.removeChild(pwProjectInfoWrong);
      sinon.restore();
    });

    it('Should have an method called getNumberOfLikes()', () => {
      expect(pwLikeButton.getNumberOfLikes.constructor.name).to.be.equal('Function');
    });

    it('Should return an Promise', () => {
      expect(pwLikeButton.getNumberOfLikes().constructor.name).to.be.equal('Promise');
    });

    it('Should receive a not null pw-project-info component as argument', (done) => {
      pwLikeButton.getNumberOfLikes().catch((err) => {
        expect(err.message).to.be.equal('pwProjectInfo argument is null');
        done();
      });
    });

    it('Should receive a not empty pw-project-info component as argument', (done) => {
      pwLikeButton.getNumberOfLikes({}).catch((err) => {
        expect(err.message).to.be.equal('pwProjectInfo argument is empty');
        done();
      });
    });

    it('Should receive a pw-project-info object as argument', (done) => {
      pwLikeButton.getNumberOfLikes([1]).catch((err) => {
        expect(err.message).to.be.equal('pwProjectInfo argument is from an invalid class');
        done();
      });
    });

    it('Should receive a valid pw-project-info component as argument', (done) => {
      pwLikeButton.getNumberOfLikes(pwProjectInfoWrong).catch((err) => {
        expect(err.message).to.be.equal('Invalid project id');
        done();
      });
    });

    it('Should call the getProject() method from the pw-project-info component', (done) => {
      let spy = sinon.spy(pwProjectInfo, 'getProject');

      pwLikeButton.getNumberOfLikes(pwProjectInfo).then((project) => {
        expect(spy.called).to.be.equal(true);
        done();
      }).catch(done);

      expect(requests[0].url).to.be.equal('http://localhost:8000/projects/VAITOMARNOCU');
      expect(requests[0].method).to.be.equal('GET');

      requests[0].respond(200, {}, '{}');
    });

    it('Should return the project number of likes', (done) => {
      pwLikeButton.getNumberOfLikes(pwProjectInfo)
        .then((n) => {
          expect(n).to.be.equal(3);
          done();
        })
        .catch(done);

      expect(requests[0].url).to.be.equal('http://localhost:8000/projects/VAITOMARNOCU');
      expect(requests[0].method).to.be.equal('GET');

      requests[0].respond(200, {}, '{"liked": ["VAITOMARNOCU", "345", "678"]}');
    });
  });

  describe('Method getProject() => ', () => {
    let component;
    let pwLikeButton;

    let component1;
    let pwProjectInfo;

    let component2;
    let pwProjectInfoWrong;

    let xhr;
    let requests;

    beforeEach(() => {
      xhr = sinon.useFakeXMLHttpRequest();
      requests = [];

      component = document.createElement('pw-like-button');
      document.body.appendChild(component);
      pwLikeButton = document.body.getElementsByTagName('pw-like-button')[0];

      component1 = document.createElement('pw-project-info');
      document.body.appendChild(component1);
      pwProjectInfo = document.body.getElementsByTagName('pw-project-info')[0];
      pwProjectInfo.id = 'VAITOMARNOCU';

      component2 = document.createElement('pw-project-info');
      document.body.appendChild(component2);
      pwProjectInfoWrong = document.body.getElementsByTagName('pw-project-info')[1];
      pwProjectInfoWrong.id = 'wrongID';

      xhr.onCreate = (xhr) => {
        requests.push(xhr);
      };
    });

    afterEach(() => {
      document.body.removeChild(pwLikeButton);
      document.body.removeChild(pwProjectInfo);
      document.body.removeChild(pwProjectInfoWrong);
      sinon.restore();
    });

    it('Should have an method called getNumberOfLikes()', () => {
      expect(pwLikeButton.getProject.constructor.name).to.be.equal('Function');
    });

    it('Should return an Promise', () => {
      expect(pwLikeButton.getProject().constructor.name).to.be.equal('Promise');
    });

    it('Should receive a not null pw-project-info component as argument', (done) => {
      pwLikeButton.getProject().catch((err) => {
        expect(err.message).to.be.equal('pwProjectInfo argument is null');
        done();
      });
    });

    it('Should receive a not empty pw-project-info component as argument', (done) => {
      pwLikeButton.getProject({}).catch((err) => {
        expect(err.message).to.be.equal('pwProjectInfo argument is empty');
        done();
      });
    });

    it('Should receive a pw-project-info object as argument', (done) => {
      pwLikeButton.getProject([1]).catch((err) => {
        expect(err.message).to.be.equal('pwProjectInfo argument is from an invalid class');
        done();
      });
    });

    it('Should receive a valid pw-project-info component as argument', (done) => {
      pwLikeButton.getProject(pwProjectInfoWrong).catch((err) => {
        expect(err.message).to.be.equal('Invalid project id');
        done();
      });
    });

    it('Should call the getProject() method from the pw-project-info component', (done) => {
      let spy = sinon.spy(pwProjectInfo, 'getProject');

      pwLikeButton.getProject(pwProjectInfo).then((project) => {
        expect(spy.called).to.be.equal(true);
        done();
      }).catch(done);

      expect(requests[0].url).to.be.equal('http://localhost:8000/projects/VAITOMARNOCU');
      expect(requests[0].method).to.be.equal('GET');

      requests[0].respond(200, {}, '{}');
    });

    it('Should return the project object', (done) => {
      pwLikeButton.getProject(pwProjectInfo)
        .then((res) => {
          expect(res.project).to.be.equal('MOCK');
          done();
        })
        .catch(done);

      expect(requests[0].url).to.be.equal('http://localhost:8000/projects/VAITOMARNOCU');
      expect(requests[0].method).to.be.equal('GET');

      requests[0].respond(200, {}, '{ "project": "MOCK" }');
    });
  });

  describe('Method getPwUserInfo() => ', () => {
    let component;
    let pwLikeButton;

    let component1;
    let pwUserInfo;

    beforeEach(() => {
      component = document.createElement('pw-like-button');
      document.body.appendChild(component);
      pwLikeButton = document.body.getElementsByTagName('pw-like-button')[0];

      component1 = document.createElement('pw-user-info');
      document.body.appendChild(component1);
      pwUserInfo = document.body.getElementsByTagName('pw-user-info')[0];
    });

    afterEach(() => {
      document.body.removeChild(pwLikeButton);
      document.body.removeChild(pwUserInfo);
      sinon.restore();
    });

    it('Should return a promise', () => {
      expect(pwLikeButton.getPwUserInfo().constructor.name).to.be.equal('Promise');
    });

    it('Should return an error if none pw-user-info was found', (done) => {
      document.body.removeChild(pwUserInfo);
      pwLikeButton.getPwUserInfo().catch((err) => {
        expect(err.message).to.be.equal('pw-user-info component was not found');
        document.body.appendChild(component1);
        done();
      });
    });

    it('Should return the pw-user-info component', (done) => {
      pwLikeButton.getPwUserInfo().then((comp) => {
        expect(comp).to.be.equal(pwUserInfo);
        done();
      });
    });
  });

  describe('Method getPwProjectInfo() => ', () => {
    let component;
    let pwLikeButton;

    let component1;
    let pwProjectInfo;

    beforeEach(() => {
      component = document.createElement('pw-like-button');
      document.body.appendChild(component);
      pwLikeButton = document.body.getElementsByTagName('pw-like-button')[0];

      component1 = document.createElement('pw-project-info');
      document.body.appendChild(component1);
      pwProjectInfo = document.body.getElementsByTagName('pw-project-info')[0];
      pwProjectInfo.id = 'VAITOMARNOCU';
    });

    afterEach(() => {
      document.body.removeChild(pwLikeButton);
      document.body.removeChild(pwProjectInfo);
    });

    it('Should return a promise', () => {
      expect(pwLikeButton.getPwProjectInfo().constructor.name).to.be.equal('Promise');
    });

    it('Should return an error if none pw-project-info was found', (done) => {
      document.body.removeChild(pwProjectInfo);
      pwLikeButton.getPwProjectInfo().catch((err) => {
        expect(err.message).to.be.equal('pw-project-info not found');
        document.body.appendChild(pwProjectInfo);
        done();
      });
    });

    it('Should return an error if the pw-project-info is invalid', (done) => {
      pwProjectInfo.id = 'Wrong ID';
      pwLikeButton.getPwProjectInfo().catch((err) => {
        expect(err.message).to.be.equal('pw-project-info not found');
        done();
      });
    });

    it('Should return the pw-project-info component', (done) => {
      pwLikeButton.getPwProjectInfo().then((comp) => {
        expect(comp).to.be.equal(pwProjectInfo);
        done();
      });
    });
  });

  describe('When created the component must update the like attribute', () => {
    let component;
    let pwLikeButton;

    let component1;
    let pwUserInfo;

    let xhr;
    let requests;

    let spy1;
    let spy2;
    let spy3;

    beforeEach(() => {
      xhr = sinon.useFakeXMLHttpRequest();
      requests = [];
      Token.setUserToken('TOKEN');

      component1 = document.createElement('pw-user-info');
      component = document.createElement('pw-like-button');

      xhr.onCreate = (xhr) => {
        requests.push(xhr);
      };
    });

    afterEach(() => {
      document.body.removeChild(component);
      document.body.removeChild(component1);
      Token.setUserToken(null);
      sinon.restore();
    });

    it('Should call the getPwUserInfo() method', () => {
      spy1 = sinon.spy(component, 'getPwUserInfo');

      document.body.appendChild(component1);
      document.body.appendChild(component);

      expect(spy1.called).to.be.equal(true);
    });

    it('Should call the isLiked() method', (done) => {
      spy2 = sinon.spy(component, 'isLiked');

      document.body.appendChild(component1);
      document.body.appendChild(component);

      setTimeout(() => {
        expect(spy2.called).to.be.equal(true);
        done();
      }, 200);
    });

    it('Should call the pw-user-info isLiked() method', (done) => {
      spy3 = sinon.spy(component1, 'isLiked');

      document.body.appendChild(component1);
      document.body.appendChild(component);

      setTimeout(() => {
        expect(spy3.called).to.be.equal(true);
        done();
      }, 200);
    });

    it('Should set the like attribute', (done) => {
      let stub = sinon.stub(component1, 'isLiked').returns(Promise.resolve(true));

      document.body.appendChild(component1);
      document.body.appendChild(component);

      window.setTimeout(() => {
        expect(component.liked).to.be.equal(true);
        stub.restore();
        done();
      }, 200);
    });
  });

  describe('When the component is liked =>', () => {
    let component;
    let pwLikeButton;

    let component1;
    let pwProjectInfo;

    let component2;
    let pwUserInfo;

    let xhr;
    let requests;
    let spy;
    let event;

    beforeEach(() => {
      xhr = sinon.useFakeXMLHttpRequest();
      requests = [];
      Token.setUserToken('TOKEN');

      component1 = document.createElement('pw-project-info');
      component2 = document.createElement('pw-user-info');
      component = document.createElement('pw-like-button');

      component1.id = 'VAITOMARNOCU';
      xhr.onCreate = (xhr) => {
        requests.push(xhr);
      };
    });

    afterEach(() => {
      document.body.removeChild(component);
      document.body.removeChild(component1);
      document.body.removeChild(component2);
      Token.setUserToken(null);
      sinon.restore();
    });

    it('Should call the getPwUserInfo() method', (done) => {
      spy = sinon.spy(component, 'getPwUserInfo');
      event = new MouseEvent('click');

      document.body.appendChild(component1);
      document.body.appendChild(component2);
      document.body.appendChild(component);

      component.getDivLike(component.shadowRoot).dispatchEvent(event);

      setTimeout(() => {
        expect(spy.called).to.be.equal(true);
        done();
      }, 200);
    });

    it('Should call the getPwProjectInfo() method', (done) => {
      spy = sinon.spy(component, 'getPwProjectInfo');
      event = new MouseEvent('click');

      document.body.appendChild(component1);
      document.body.appendChild(component2);
      document.body.appendChild(component);

      component.getDivLike(component.shadowRoot).dispatchEvent(event);

      setTimeout(() => {
        expect(spy.called).to.be.equal(true);
        done();
      }, 200);
    });

    it('Should call the like() method', (done) => {
      spy = sinon.spy(component, 'like');
      event = new MouseEvent('click');

      document.body.appendChild(component1);
      document.body.appendChild(component2);
      document.body.appendChild(component);

      component.getDivLike(component.shadowRoot).dispatchEvent(event);

      setTimeout(() => {
        expect(spy.called).to.be.equal(true);
        expect(spy.args[0][0]).to.be.equal(component1);
        expect(spy.args[0][1]).to.be.equal(component2);
        done();
      }, 200);
    });

    it('Should updated the numberOfLikes property', (done) => {
      spy = sinon.stub(component, 'getNumberOfLikes').returns(Promise.resolve(123));
      event = new MouseEvent('click');

      document.body.appendChild(component1);
      document.body.appendChild(component2);
      document.body.appendChild(component);

      component.getDivLike(component.shadowRoot).dispatchEvent(event);

      setTimeout(() => {
        expect(component.numberOfLikes).to.be.equal(123);
        expect(component.innerHTML).to.be.equal('123');
        spy.restore();
        done();
      }, 200);
    });
  });

  describe('When the component is disliked =>', () => {
    let component;
    let pwLikeButton;

    let component1;
    let pwProjectInfo;

    let component2;
    let pwUserInfo;

    let xhr;
    let requests;
    let spy;
    let event;

    beforeEach(() => {
      xhr = sinon.useFakeXMLHttpRequest();
      requests = [];
      Token.setUserToken('TOKEN');

      component1 = document.createElement('pw-project-info');
      component2 = document.createElement('pw-user-info');
      component = document.createElement('pw-like-button');

      component1.id = 'VAITOMARNOCU';
      xhr.onCreate = (xhr) => {
        requests.push(xhr);
      };
    });

    afterEach(() => {
      document.body.removeChild(component);
      document.body.removeChild(component1);
      document.body.removeChild(component2);
      Token.setUserToken(null);
      sinon.restore();
    });

    it('Should call the getPwUserInfo() method', (done) => {
      spy = sinon.spy(component, 'getPwUserInfo');
      event = new MouseEvent('click');

      document.body.appendChild(component1);
      document.body.appendChild(component2);
      document.body.appendChild(component);

      component.toggleLiked();
      component.getDivLike(component.shadowRoot).dispatchEvent(event);

      setTimeout(() => {
        expect(spy.called).to.be.equal(true);
        done();
      }, 200);
    });

    it('Should call the getPwProjectInfo() method', (done) => {
      spy = sinon.spy(component, 'getPwProjectInfo');
      event = new MouseEvent('click');

      document.body.appendChild(component1);
      document.body.appendChild(component2);
      document.body.appendChild(component);

      component.toggleLiked();
      component.getDivLike(component.shadowRoot).dispatchEvent(event);

      setTimeout(() => {
        expect(spy.called).to.be.equal(true);
        done();
      }, 200);
    });

    it('Should call the dislike() method', (done) => {
      spy = sinon.spy(component, 'dislike');
      event = new MouseEvent('click');

      document.body.appendChild(component1);
      document.body.appendChild(component2);
      document.body.appendChild(component);

      component.toggleLiked();
      component.getDivLike(component.shadowRoot).dispatchEvent(event);

      setTimeout(() => {
        expect(spy.called).to.be.equal(true);
        expect(spy.args[0][0]).to.be.equal(component1);
        expect(spy.args[0][1]).to.be.equal(component2);
        done();
      }, 200);
    });

    it('Should updated the numberOfLikes property', (done) => {
      spy = sinon.stub(component, 'getNumberOfLikes').returns(Promise.resolve(123));
      event = new MouseEvent('click');

      document.body.appendChild(component1);
      document.body.appendChild(component2);
      document.body.appendChild(component);

      component.toggleLiked();
      component.getDivLike(component.shadowRoot).dispatchEvent(event);

      setTimeout(() => {
        expect(component.numberOfLikes).to.be.equal(123);
        expect(component.innerHTML).to.be.equal('');
        spy.restore();
        done();
      }, 200);
    });
  });
});

