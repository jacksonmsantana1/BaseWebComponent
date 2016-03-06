import R from 'ramda';
import _ from 'lodash';

const setter = function(prop, val) {
  const propLens = R.lensProp(prop);
  return R.set(propLens, val, this);
};

const Lenses = (obj) => (_.mixin(obj, { set: setter }));

export default Lenses;
