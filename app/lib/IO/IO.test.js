import IO from './IO.js';
import Tuple from '../Tuple/Tuple.js';
import Helpers from '../Helpers/Helpers.js';
import expect from 'expect.js';
import R from 'ramda';

let compose = R.compose;
let curry = R.curry;
let map = Helpers.map;
let join = Helpers.join;
let chain = Helpers.chain;

describe('IO => ', () => {
  it('of() -> 1', () => {
    var io = IO.of('CU');
    expect(io.runIO()).to.be.equal('CU');
  });

  it('of() -> 2', () => {
    let fn = (str) => (str + 'ANUS');
    let fn2 = (str) => (str + '!!!');
    let io = IO.of('EU AMO MEU ');
    let ioio = io.map(fn).map(fn2);
    expect(ioio.runIO()).to.be.equal('EU AMO MEU ANUS!!!');
  });

  it('toString()', () => {
    let io = IO.of('CU');
    let ioio = IO.of(io);
    let ioioio = IO.of(ioio);
    expect(ioio.toString()).to.be.equal('IO(IO("CU"))');
    expect(ioioio.toString()).to.be.equal('IO(IO(IO("CU")))');
    expect(ioioio.runIO().runIO().runIO()).to.be.equal('CU');
  });

  it('map() -> 1', () => {
    // document :: IO(DOM)
    let doc = IO.of(document);

    // createDiv :: DOM -> HTMLDivElement
    let createDiv = (doc) => (doc.createElement('div'));

    // setInnerDiv = HTMLDivElement -> String -> HTMLDivElement
    let setInnerDiv = curry((str, div) => {
      div.innerHTML = str;
      return div;
    });

    //IMPURE
    let impure = doc.map(createDiv).map(setInnerDiv('VAI TOMAR NO SEU ANUS'));
    let div = impure.runIO();
    expect(div.innerHTML).to.be.equal('VAI TOMAR NO SEU ANUS');

  });

  it('map() -> 2', () => {
    let Name = new Tuple('string', 'object');

    // completeName :: String
    let completeName = 'Jackson Martorano Santana';

    // getAllNames :: String -> [String]
    let getAllNames = (name) => (name.split(' '));

    // separateFirstFromLastNames :: Name -> Name
    let separateFirstFromLastNames = (names) => (new Name(names[0], names.slice(1)));

    // getFirstLetterOfLastNames :: Name -> Name
    let getFirstLetterOfLastNames = (tName) => {
      let firstName = tName._1;
      let lastNames = tName._2.map((lastName) => (lastName[0]));
      return new Name(firstName, lastNames);
    };

    // toUpperCase :: Name -> Name
    let toUpperCase = (tName) => {
      let firstName = tName._1;
      let lastNames = tName._2.map((firstLetter) => (firstLetter.toUpperCase() + '.'));
      return new Name(firstName, lastNames);
    };

    // fixedName :: Name -> String
    let fixedName = (tName) => {
      let name = tName._1 + ' ' + tName._2.join(' ');
      return name;
    };

    //Impure
    let impure = compose(map(fixedName),
      map(toUpperCase),
      map(getFirstLetterOfLastNames),
      map(separateFirstFromLastNames),
      map(getAllNames),
      IO.of);

    expect(impure(completeName).runIO()).to.be.equal('Jackson M. S.');

  });

  it('map() -> 3', () => {
    let createDiv = (doc) => (doc.createElement('div'));
    let setInnerDiv = curry((str, div) => {
      div.innerHTML = str;
      return div;
    });
    let io = IO.of(window.document).map(createDiv).map(setInnerDiv('VAITOMARNOCU'));

    expect(io.runIO().innerHTML).to.be.equal('VAITOMARNOCU');
  });

  it('chain()', () => {
    let io = (str) => (IO.of(str));
    let fn = (str) => (IO.of(str + 'CU'));
    let fn1 = (str) => (IO.of(str + 'CU'));
    let fn2 = (str) => (IO.of(str + 'CU'));

    let impure = compose(map(map(map(fn2))), map(map(fn1)), map(fn), io);
    let impure2 = compose(IO.join, map(fn2), IO.join, map(fn1), IO.join, map(fn), io);
    let impure3 = compose(chain(fn2), chain(fn1), chain(fn), io);
    expect(impure('CU').runIO().runIO().runIO().runIO()).to.be.equal('CUCUCUCU');
    expect(impure2('CU').runIO()).to.be.equal('CUCUCUCU');
    expect(impure3('CU').runIO()).to.be.equal('CUCUCUCU');
  });

  it('ap()', () => {
    let signin = curry((x, y, z) => (x + y + z));
    let x = IO.of('A');
    let y = IO.of('N');
    let z = IO.of('US');

    let impure = IO.of(signin).ap(x).ap(y).ap(z);
    expect(impure.runIO()).to.be.equal('ANUS');

  });

});
