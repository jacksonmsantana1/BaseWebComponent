import expect from 'expect.js';
import Helpers from './Helpers';

describe('Auxiliar functions => ', () => {
  it('createCustomEvent() => ', () => {
    const detail = { anus: 'ANUS' };
    const result = Helpers.createCustomEvent('ANUS')(detail)(true)(true);

    expect(result.constructor.name).to.be.equal('CustomEvent');
    expect(result.detail).to.be.equal(detail);
    expect(result.type).to.be.equal('ANUS');
    expect(result.bubbles).to.be.equal(true);
    expect(result.cancelable).to.be.equal(true);
  });

  it('emitCustomEvent() => ', (done) => {
    const detail = { anus: 'ANUS' };
    const element = document.createElement('div');
    const evt = Helpers.createCustomEvent('ANUS')(detail)(true)(true);

    element.addEventListener('ANUS', (evt) => {
      expect(evt.type).to.be.equal('ANUS');
      done();
    });
    Helpers.emitCustomEvent(element)(evt);
  });

  it('getPwUserInfo() => ', () => {
    const component = document.createElement('pw-user-info');
    document.body.appendChild(component);
    const pwUserInfo = document.body.getElementsByTagName('pw-user-info')[0];

    expect(Helpers.getPwUserInfo(document).runIO()).to.be.equal(pwUserInfo);
    document.body.removeChild(pwUserInfo);
  });

  it('getPwProjectInfo() => Should receive an ID as argument', () => {
    expect(Helpers.getPwProjectInfo().message).to.be.equal('Missing ID argument');
  });

  it('getPwProjectInfo() => Should return an error if none pw-project-info is found', () => {
    const component = document.createElement('pw-project-info');
    document.body.appendChild(component);
    const pwProjectInfo = document.body.getElementsByTagName('pw-project-info')[0];
    pwProjectInfo.id = 'VAITOMARNOCU';

    expect(Helpers.getPwProjectInfo('ERROR').message).to.be.equal('pw-project-info not found');
    document.body.removeChild(pwProjectInfo);
  });

  it('getPwProjectInfo() => Should return the valid pw-project-info', () => {
    const component = document.createElement('pw-project-info');
    document.body.appendChild(component);
    const pwProjectInfo = document.body.getElementsByTagName('pw-project-info')[0];
    pwProjectInfo.id = 'a';

    expect(Helpers.getPwProjectInfo('a')).to.be.equal(pwProjectInfo);
    document.body.removeChild(pwProjectInfo);
  });
});
