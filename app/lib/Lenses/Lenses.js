import R from 'ramda';
import _ from 'lodash';

let setter = function(prop, val) {
  let propLens = R.lensProp(prop);
  return R.set(propLens, val, this);
};

let Lenses = (obj) => (_.mixin(obj, {set: setter}));

export default Lenses;
