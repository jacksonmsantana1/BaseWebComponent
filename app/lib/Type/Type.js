import R from 'ramda';

const checkType = R.curry((typeDef, actualType) => {
  if (R.is(typeDef, actualType)) {
    return actualType;
  }

  throw new TypeError(`Type mismatch.Expected [${typeDef}]
                        but found [${ typeof actualType}]`);

});

export
default checkType;
