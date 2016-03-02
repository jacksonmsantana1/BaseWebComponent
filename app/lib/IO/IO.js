import R from 'ramda';

let compose = R.compose;
let toString = R.toString;

class IO {

  constructor(fn) {
    if (!(this instanceof IO)) {
      return new IO(fn);
    }

    this.effect = fn;
  }

  static of(fn) {
    return new IO(() => (fn));
  }

  static runIO(io) {
    return io.runIO.apply(io, [].slice.call(arguments, 1));
  }

  static join(io) {
    return io.effect();
  }

  map(fn) {
    let _this = this;
    return new IO(compose(fn, _this.effect));
  }

  chain(fn) {
    let _this = this;
    return new IO(function() {
      var next = fn(_this.effect.apply(_this, arguments));
      return next.effect.apply(next, arguments);
    });
  }

  ap(thatIO) {
    let _this = this;
    return _this.chain(function(fn) {
      return thatIO.map(fn);
    });
  }

  runIO() {
    return this.effect.apply(this, arguments);
  }

  join() {
    return this.effect.apply(this, arguments);
  }

  toString() {
    return 'IO(' + toString(this.effect()) + ')';
  };

};

export
default IO;
