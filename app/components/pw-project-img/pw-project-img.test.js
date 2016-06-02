import expect from 'expect.js';
import pwProjectImg from './pw-project-img';

describe('pw-project-img => ', () => {
  let component;
  let component1;
  let component2;
  let project;

  let spy;
  let stub;
  let event;

  beforeEach(() => {
    component = document.createElement('pw-project-img');
    component.projectId = 'VAITOMARNOANUS';
    component.path = '/vai/tomar/no/cu';

    component1 = document.createElement('pw-project-info');
    component1.id = 'VAITOMARNOANUS';

    component2 = document.createElement('div');

    project = {
      path: '/anus',
    };
  });

  afterEach(() => {
    document.body.removeChild(component);
    document.body.removeChild(component1);
  });

  describe('Component ', () => {
    it('Should contain a property called projectId', () => {
      document.body.appendChild(component1);
      document.body.appendChild(component);
      expect(component.projectId).to.be.equal('VAITOMARNOANUS');
    });

    it('Should contain a property called path', () => {
      document.body.appendChild(component1);
      document.body.appendChild(component);
      expect(component.path).to.be.equal('/vai/tomar/no/cu');
    });
  });

  describe('When initialized component', () => {
    it('Should called the pw-project-info component', (done) => {
      spy = sinon.spy(component, 'getPwProjectInfo');

      document.body.appendChild(component1);
      document.body.appendChild(component);

      setTimeout(() => {
        expect(spy.called).to.be.equal(true);
        done();
      }, 200);
    });

    it('Should the pwProjectInfo call the getProject() method', (done) => {
      spy = sinon.spy(component1, 'getProject');

      document.body.appendChild(component1);
      document.body.appendChild(component);

      setTimeout(() => {
        expect(spy.called).to.be.equal(true);
        done();
      }, 200);
    });

    it('Should set the component attribute path', (done) => {
      stub = sinon.stub(component1, 'getProject').returns(Promise.resolve(project));

      document.body.appendChild(component1);
      document.body.appendChild(component);

      setTimeout(() => {
        expect(component.path).to.be.equal('/anus');
        stub.restore();
        done();
      }, 200);
    });
  });

  describe('When the path attribute is changed', () => {
    it('Should call the getImg() method', (done) => {
      spy = sinon.spy(component, 'getImg');

      document.body.appendChild(component1);
      document.body.appendChild(component);
      component.path = 'newPath';

      setTimeout(() => {
        expect(spy.called).to.be.equal(true);
        expect(spy.args[0][0]).to.be.equal(component.shadowRoot);
        done();
      }, 200);
    });

    it('Should set the inner img.src attribute with the new value', (done) => {
      spy = sinon.spy(component, 'getImg');

      document.body.appendChild(component1);
      document.body.appendChild(component);
      component.path = '/newPath';

      setTimeout(() => {
        expect(component.getImg(component.shadowRoot).src).to.be.equal('http://localhost:9876/newPath');
        done();
      }, 200);
    });
  });

  describe('When is clicked component', () => {
    //TODO Wait to finish the pw-project-item component
    it('Should emit an event to its father component', () => {
      event = new MouseEvent('click');
      component2.addEventListener('showDialog', (evt) => {
        //expect(evt.type).to.be.equal('showDialog');
        //expect(evt.detail.projectId).to.be.equal('VAITOMARNOANUS');
        //done();
      });

      document.body.appendChild(component2);
      document.body.appendChild(component1);
      document.body.appendChild(component);

      component.dispatchEvent(event);
      document.body.removeChild(component2);
    });
  });
});
