import Tuple from './Tuple.js';
import expect from 'expect.js';

describe('Tuple => ', () => {
  it('Should throw an Error when some value is null', () => {
    let Example = Tuple(Boolean, String);
    expect(Example).withArgs(null, 'ANUS').to.throwException();
    expect(Example).withArgs('ANUS', null).to.throwException();
    expect(Example).withArgs(null, null).to.throwException(function(e) {
      expect(e).to.be.a(ReferenceError);
    });
  });

  it('Should throw an Error when the number of parameters are not compatibles with the determined one', () => {
    let Example = Tuple(Boolean, String, String);
    expect(Example).withArgs(true, 'ANUS').to.throwException(function(e) {
      expect(e).to.be.a(TypeError);
    });

    expect(Example).withArgs(true, 'ANUS', 'ANUS', 'ANUS').to.throwException();
  });

  it('Should contain indexed attributes', () => {
    let Example = Tuple(Boolean, String);
    let ex = new Example(false, 'Example');
    expect(ex._1).to.be.equal(false);
    expect(ex._2).to.be.equal('Example');
  });

  it('Should throw an exception when trying to modify the Tuple', () => {
    expect(() => {
      let Example = Tuple(Boolean, String);
      let ex = new Example(false, 'ANUS');
      ex._1 = true;
    }).to.throwException(function(e) {
      expect(e).to.be.a(TypeError);
    });
  });

});
