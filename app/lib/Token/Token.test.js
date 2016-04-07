import expect from 'expect.js';
import Token from './Token.js';

describe('Token => ', () => {

  beforeEach(() => {
    window.localStorage.clear();
  });

  it('getUserToken() -> ', () => {
    window.localStorage.setItem('token', '1234');
    expect(Token.getUserToken()).to.be.equal('1234');
  });

  it('setUserToken()', () => {
    Token.setUserToken('1234');
    expect(window.localStorage.getItem('token')).to.be.equal('1234');
  });

  it('payload() ->', () => {
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.' +
      'TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
    let data = {
      sub: '1234567890',
      name: 'John Doe',
      admin: true,
    };
    let payload = Token.getPayload(token);
    expect(payload.sub).to.be.equal(data.sub);
    expect(payload.name).to.be.equal(data.name);
    expect(payload.admin).to.be.equal(data.admin);
  });

});
