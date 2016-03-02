import expect from 'expect.js';
import checkType from './Type.js';

describe('checkType() => ', () => {
  it('Should return the given object if its class is equal to the definided value in the function first parameter', () => {
    let string = 'Some String';
    let number = 69;
    let bool = true;
    let array = [];
    let funct = () => 'Anus';
    let date = new Date();

    expect(checkType(String)(string)).to.be.equal(string);
    expect(checkType(Number)(number)).to.be.equal(number);
    expect(checkType(Boolean)(bool)).to.be.equal(bool);
    expect(checkType(Array)(array)).to.be.equal(array);
    expect(checkType(Function)(funct)).to.be.equal(funct);
    expect(checkType(Date)(date)).to.be.equal(date);
  });
});
