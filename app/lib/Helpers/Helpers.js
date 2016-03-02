import R from 'ramda';

// map :: (ObjectA -> ObjectB), M -> M[ObjectB]
let map = R.curry(function(f, container) {
  return container.map(f);
});

// chain :: (ObjectA -> ObjectB), M -> ObjectB
let chain = R.curry(function(f, container) {
  return container.chain(f);
});

// join :: M -> M[M[ObjectA]] -> M[ObjectA]
let join = function(mma) {
  return mma.join();
}

let Helpers = function() {};

Helpers.prototype.chain = chain;
Helpers.chain = Helpers.prototype.chain;

Helpers.prototype.map = map;
Helpers.map = Helpers.prototype.map;

Helpers.prototype.join = join;
Helpers.join = Helpers.prototype.join;


export
default Helpers;
