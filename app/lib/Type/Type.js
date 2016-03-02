import R from 'ramda';

let checkType = R.curry(function(typeDef, actualType) {
  if (R.is(typeDef, actualType)) {
    return actualType;
  } else {
    throw new TypeError('Type mismatch.Expected [' + typeDef + '] but found [' + typeof actualType + ']');
  }
});

export default checkType;
