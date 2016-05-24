import expect from 'expect.js';
import Logger from '../../lib/Logger/Logger.js';
import Token from '../../lib/Token/Token';

describe('pw-project-info', () => {
    let component;
    let pwProjectInfo;
    let project;
    let xhr;
    let requests;
    let token;

    beforeEach(() => {
      xhr = sinon.useFakeXMLHttpRequest();
      requests = [];
      project = {
        id: '123456',
        name: 'Project1',
      };

      component = document.createElement('pw-project-info');
      document.body.appendChild(component);

      pwProjectInfo = document.getElementsByTagName('pw-project-info')[0];
      pwProjectInfo.project = project;

      token = 'TOKEN';
      Token.setUserToken(token);

      xhr.onCreate = (xhr) => {
        requests.push(xhr);
      };
    });

    afterEach(() => {
      sinon.restore();
    });

    describe('Attributes', () => {
      it('Should contain the project attribute', () => {
        expect(pwProjectInfo.project).to.be.equal(project);
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

        expect(requests[0].url).to.be.equal('http://localhost:3000/projects/123456/liked');
        expect(requests[0].requestHeaders.authorization).to.be.equal('TOKEN');
        expect(requests[0].method).to.be.equal('PUT');
        requests[0].respond(200, {}, 'true');
      });

      it('Should send a PUT request to the endpoint /users/{id}/liked', (done) => {
        //TODO Wait to make the User Service endpoint /users/{id}/liked
        done();
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

        expect(requests[0].url).to.be.equal('http://localhost:3000/projects/123456/disliked');
        expect(requests[0].requestHeaders.authorization).to.be.equal('TOKEN');
        expect(requests[0].method).to.be.equal('PUT');
        requests[0].respond(200, {}, 'true');
      });

      it('Should send a PUT request to the endpoint /users/{id}/disliked', (done) => {
        //TODO Wait to make the User Service endpoint /users/{id}/disliked
        done();
      });
    });
});
