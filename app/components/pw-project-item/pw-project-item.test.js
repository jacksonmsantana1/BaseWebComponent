import expect from 'expect.js';
import PwProjectItem from './pw-project-item';

describe('pw-project-item', () => {
  let component;
  let xhr;
  let requests;

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];

    component = document.createElement('pw-project-item');
    document.body.appendChild(component);

    xhr.onCreate = (xhr) => {
      requests.push(xhr);
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Component ', () => {
    it('Should ...', () => {
      expect(true).to.be.equal(true);
    });
  });
});
