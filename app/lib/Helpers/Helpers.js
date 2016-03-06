import R from 'ramda';

/**
 *  Helpers Functions
 *
 *  ps: Don't need unit test.Functions already
 *  tested in others projects
 */

// map :: (ObjectA -> ObjectB), M -> M[ObjectB]
const map = R.curry((f, container) => (container.map(f)));

// chain :: (ObjectA -> ObjectB), M -> ObjectB
const chain = R.curry((f, container) => (container.chain(f)));

// join :: M -> M[M[ObjectA]] -> M[ObjectA]
const join = function(container) {
  return container.join();
};

// trace :: String -> Object -> Object
const trace = R.curry((tag, x) => {
  console.log(tag, x);
  return x;
});

const Helpers = function() {};

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
