import R from 'ramda';

/**
 *  Helpers Functions
 *
 *  ps: Don't need unit test.Functions already
 *  tested in others projects
 */

// map :: (ObjectA -> ObjectB), M -> M[ObjectB]
let map = R.curry(function(f, container) {
  return container.map(f);
});

// chain :: (ObjectA -> ObjectB), M -> ObjectB
let chain = R.curry(function(f, container) {
  return container.chain(f);
});

// join :: M -> M[M[ObjectA]] -> M[ObjectA]
let join = function(container) {
  return container.join();
};

// trace :: String -> Object -> Object
let trace = R.curry(function(tag, x) {
  console.log(tag, x);
  return x;
});

let Helpers = function() {};

Helpers.prototype.chain = chain;
Helpers.chain = Helpers.prototype.chain;

Helpers.prototype.map = map;
Helpers.map = Helpers.prototype.map;

Helpers.prototype.join = join;
Helpers.join = Helpers.prototype.join;

Helpers.prototype.trace = trace;
Helpers.trace = Helpers.prototype.trace;

export
default Helpers;
