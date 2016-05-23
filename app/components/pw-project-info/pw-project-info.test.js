import expect from 'expect.js';
import Logger from '../../lib/Logger/Logger.js';

describe('pw-project-info', () => {
  describe('Events => ', () => {
    let component;
    let pwProjectInfo;
    let xhr;
    let requests;

    beforeEach(() => {
      xhr = sinon.useFakeXMLHttpRequest();
      requests = [];

      component = document.createElement('pw-project-info');
      document.body.appendChild(component);
      pwProjectInfo = document.getElementsByTagName('pw-project-info')[0];

      xhr.onCreate = (xhr) => {
        requests.push(xhr);
      };
    });

    afterEach(() => {
      sinon.restore();
    });

    it('Should be listening for the like event', () => {
    });
  });
});
