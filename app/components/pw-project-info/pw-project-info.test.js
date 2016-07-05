import expect from 'expect.js';
import Logger from '../../lib/Logger/Logger.js';
import Token from '../../lib/Token/Token';

describe('pw-project-info', () => {
    let component;
    let pwProjectInfo;
    let idProject;
    let xhr;
    let requests;
    let token;

    beforeEach(() => {
      xhr = sinon.useFakeXMLHttpRequest();
      requests = [];
      idProject = '123456';

      component = document.createElement('pw-project-info');
      document.body.appendChild(component);

      pwProjectInfo = document.getElementsByTagName('pw-project-info')[0];
      pwProjectInfo.id = idProject;

      token = 'TOKEN';
      Token.setUserToken(token);

      xhr.onCreate = (xhr) => {
        requests.push(xhr);
      };
    });

    afterEach(() => {
      sinon.restore();
    });

    describe('ID Attribute', () => {
      it('Should contain the id attribute', () => {
        expect(pwProjectInfo.id).to.be.equal(idProject);
      });

      it('Should get the project object by passing the ID', () => {
        pwProjectInfo.getProject()
          .then((p) => {
            expect(JSON.parse(p.body).id).to.be.equal('123456');
            expect(JSON.parse(p.body).name).to.be.equal('VAITOMARNOCU');
            done();
          });

        expect(requests[0].url).to.be.equal('/projects/123456');
        expect(requests[0].requestHeaders.authorization).to.be.equal('TOKEN');
        expect(requests[0].method).to.be.equal('GET');
        expect(pwProjectInfo.id).to.be.equal('123456');

        requests[0].respond(200, {}, '{ "id": "123456", "name": "VAITOMARNOCU" }');
      });
    });

    describe('liked() => ', () => {
      it('Should return an promise', () => {
        expect(pwProjectInfo.liked('').constructor.name).to.be.equal('Promise');
      });

      it('Should receive an Event as argument', (done) => {
        const evt = new CustomEvent('not-like-event');

        pwProjectInfo.liked(evt).catch((err) => {
          expect(err.message).to.be.equal('Invalid Event');
          done();
        });
      });

      it('Should the event received to contain the project id liked', (done) => {
        const evt = new CustomEvent('like');

        pwProjectInfo.liked(evt).catch((err) => {
          expect(err.message).to.be.equal('Missing Event Detail');
          done();
        });
      });

      it('Should return an error if the event gives a different project id', (done) => {
        const evt = new CustomEvent('like', { detail: { projectId: 'ANUS' } });

        pwProjectInfo.liked(evt).catch((err) => {
          expect(err.message).to.be.equal('Invalid Event Detail');
          done();
        });
      });

      it('Should send a PUT request to the endpoint /projects/{id}/liked', (done) => {
        const evt = new CustomEvent('like', { detail: { projectId: '123456' } });

        pwProjectInfo.liked(evt)
          .then((res) => {
            expect(JSON.parse(res.body)).to.be.equal(true);
            done();
          })
          .catch((err) => {
            done(err);
          });

        expect(requests[0].url).to.be.equal('/projects/123456/liked');
        expect(requests[0].requestHeaders.authorization).to.be.equal('TOKEN');
        expect(requests[0].method).to.be.equal('PUT');
        requests[0].respond(200, {}, 'true');
      });
    });

    describe('disliked() => ', () => {
      it('Should return an promise', () => {
        expect(pwProjectInfo.disliked('').constructor.name).to.be.equal('Promise');
      });

      it('Should receive an Event as argument', (done) => {
        const evt = new CustomEvent('not-like-event');

        pwProjectInfo.disliked(evt).catch((err) => {
          expect(err.message).to.be.equal('Invalid Event');
          done();
        });
      });

      it('Should the event received to contain the project id liked', (done) => {
        const evt = new CustomEvent('dislike');

        pwProjectInfo.disliked(evt).catch((err) => {
          expect(err.message).to.be.equal('Missing Event Detail');
          done();
        });
      });

      it('Should return an error if the event gives a different project id', (done) => {
        const evt = new CustomEvent('dislike', { detail: { projectId: 'ANUS' } });

        pwProjectInfo.disliked(evt).catch((err) => {
          expect(err.message).to.be.equal('Invalid Event Detail');
          done();
        });
      });

      it('Should send a PUT request to the endpoint /projects/{id}/disliked', (done) => {
        const evt = new CustomEvent('dislike', { detail: { projectId: '123456' } });

        pwProjectInfo.disliked(evt)
          .then((res) => {
            expect(JSON.parse(res.body)).to.be.equal(true);
            done();
          })
          .catch((err) => {
            done(err);
          });

        expect(requests[0].url).to.be.equal('/projects/123456/disliked');
        expect(requests[0].requestHeaders.authorization).to.be.equal('TOKEN');
        expect(requests[0].method).to.be.equal('PUT');
        requests[0].respond(200, {}, 'true');
      });

      it('Should send a PUT request to the endpoint /users/{id}/disliked', (done) => {
        //TODO Wait to make the User Service endpoint /users/{id}/disliked
        done();
      });
    });

    describe('pinned() => ', () => {
      it('Should return an promise', () => {
        expect(pwProjectInfo.pinned('').constructor.name).to.be.equal('Promise');
      });

      it('Should receive an Event as argument', (done) => {
        const evt = new CustomEvent('not-pinned-event');

        pwProjectInfo.pinned(evt).catch((err) => {
          expect(err.message).to.be.equal('Invalid Event');
          done();
        });
      });

      it('Should the event received to contain the project id pinned', (done) => {
        const evt = new CustomEvent('pin');

        pwProjectInfo.pinned(evt).catch((err) => {
          expect(err.message).to.be.equal('Missing Event Detail');
          done();
        });
      });

      it('Should return an error if the event gives a different project id', (done) => {
        const evt = new CustomEvent('pin', { detail: { projectId: 'ANUS' } });

        pwProjectInfo.pinned(evt).catch((err) => {
          expect(err.message).to.be.equal('Invalid Event Detail');
          done();
        });
      });

      it('Should send a PUT request to the endpoint /projects/{id}/pinned', (done) => {
        const evt = new CustomEvent('pin', { detail: { projectId: '123456' } });

        pwProjectInfo.pinned(evt)
          .then((res) => {
            expect(JSON.parse(res.body)).to.be.equal(true);
            done();
          })
          .catch((err) => {
            done(err);
          });

        expect(requests[0].url).to.be.equal('/projects/123456/pinned');
        expect(requests[0].requestHeaders.authorization).to.be.equal('TOKEN');
        expect(requests[0].method).to.be.equal('PUT');
        requests[0].respond(200, {}, 'true');
      });
    });

    describe('despinned() => ', () => {
      it('Should return an promise', () => {
        expect(pwProjectInfo.despinned('').constructor.name).to.be.equal('Promise');
      });

      it('Should receive an Event as argument', (done) => {
        const evt = new CustomEvent('not-pinned-event');

        pwProjectInfo.despinned(evt).catch((err) => {
          expect(err.message).to.be.equal('Invalid Event');
          done();
        });
      });

      it('Should the event received to contain the project id despinned', (done) => {
        const evt = new CustomEvent('despin');

        pwProjectInfo.despinned(evt).catch((err) => {
          expect(err.message).to.be.equal('Missing Event Detail');
          done();
        });
      });

      it('Should return an error if the event gives a different project id', (done) => {
        const evt = new CustomEvent('despin', { detail: { projectId: 'ANUS' } });

        pwProjectInfo.despinned(evt).catch((err) => {
          expect(err.message).to.be.equal('Invalid Event Detail');
          done();
        });
      });

      it('Should send a PUT request to the endpoint /projects/{id}/despinned', (done) => {
        const evt = new CustomEvent('despin', { detail: { projectId: '123456' } });

        pwProjectInfo.despinned(evt)
          .then((res) => {
            expect(JSON.parse(res.body)).to.be.equal(true);
            done();
          })
          .catch((err) => {
            done(err);
          });

        expect(requests[0].url).to.be.equal('/projects/123456/despinned');
        expect(requests[0].requestHeaders.authorization).to.be.equal('TOKEN');
        expect(requests[0].method).to.be.equal('PUT');
        requests[0].respond(200, {}, 'true');
      });
    });

    describe('getProject() => ', () => {
      it('Should have a method called getProject()', () => {
        expect(pwProjectInfo.getProject.constructor.name).to.be.equal('Function');
      });

      it('Should return a promise', () => {
        expect(pwProjectInfo.getProject().constructor.name).to.be.equal('Promise');
      });

      it('Should send a GET request to this endpoint /projects/{id}', (done) => {
        pwProjectInfo.getProject().then((res) => {
          expect(JSON.parse(res)).to.be.equal(true);
          done();
        });

        expect(requests[0].url).to.be.equal('/projects/123456');
        expect(requests[0].requestHeaders.authorization).to.be.equal('TOKEN');
        expect(requests[0].method).to.be.equal('GET');
        requests[0].respond(200, {}, 'true');
      });

      it('Should return the entire project object', (done) => {
        pwProjectInfo.getProject().then((res) => {
          expect(res.project).to.be.equal('MOCK');
          done();
        });

        expect(requests[0].url).to.be.equal('/projects/123456');
        expect(requests[0].requestHeaders.authorization).to.be.equal('TOKEN');
        expect(requests[0].method).to.be.equal('GET');
        requests[0].respond(200, {}, '{ "project": "MOCK" }');
      });
    });
});
