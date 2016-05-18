import expect from 'expect.js';
import Logger from '../../lib/Logger/Logger.js';

describe('pw-project-info', () => {
  let component;
  let pwProjectInfo;
  let xhr;
  let requests;

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];

    component = document.createElement('pw-project-info');
    document.body.appendChild(component);

    xhr.onCreate = (xhr) => {
      requests.push(xhr);
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Method liked() => ', () => {
    it('Should ...', (done) => {
      expect(true).to.be.equal(true);
      done();
    });
  });
});
