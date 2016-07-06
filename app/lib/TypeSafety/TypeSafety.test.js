import expect from 'expect.js';
import Type from './TypeSafety.js';

describe('TypeSafety => ', () => {
  it('typeOf() ', (done) => {
    let string = 'Some String';
    let number = 69;
    let boolean = true;

    let typeOf = Type.typeOf;
    let str = Type.str;
    let num = Type.num;
    let bool = Type.bool;

    try {
      expect(str(string)).to.be.equal(string);
      expect(num(number)).to.be.equal(number);
      expect(bool(boolean)).to.be.equal(boolean);
      done();
    } catch(e) {
      done(e);
    }
  });

  it('objectTypeOf() ', (done) => {
    let array = [];

    let objectTypeOf = Type.objectTypeOf;
    let arr = Type.arr;

    try {
      expect(arr(array)).to.be.equal(array);
      done();
    } catch(e) {
      done(e);
    }
  });

  it('arrayOf() ', () => {
    let str = Type.str;
    let arrayOf = Type.arrayOf;
    let arrStr = arrayOf(str);
    let arr = ['1', '2', '3'];

    expect(arrStr(arr)).to.be.eql(arr);
  });
});
