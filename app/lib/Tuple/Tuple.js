import checkType from '../Type/Type.js';

var Tuple = function() {
  let typeInfo = Array.prototype.slice.call(arguments, 0);
  let _T = function() {
    let values = Array.prototype.slice.call(arguments, 0);
    const anyValueNull = values.some(function(val) {
      return val === null || val === undefined;
    });

    if (anyValueNull) {
      throw new ReferenceError('Tuples may not have any null values');
    }

    if (values.length !== typeInfo.length) {
      throw new TypeError('Tuple arity does no match its prototype');
    }

    values.map(function(val, index) {
      this['_' + (index + 1)] = checkType(typeInfo[index])(val);
    }, this);

    Object.freeze(this);
  };

  return _T;
};

export default Tuple;
