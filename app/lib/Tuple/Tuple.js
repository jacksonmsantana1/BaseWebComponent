import checkType from '../Type/Type.js';

const Tuple = function (...firstArgs) {
  const typeInfo = Array.prototype.slice.call(firstArgs);
  const _T = function (...secondArgs) {
    const values = Array.prototype.slice.call(secondArgs);
    const anyValueNull = values.some((val) => (val === null || val === undefined));

    if (anyValueNull) {
      throw new ReferenceError('Tuples may not have any null values');
    }

    if (values.length !== typeInfo.length) {
      throw new TypeError('Tuple arity does no match its prototype');
    }

    values.map(function (val, index) {
      this[`_${index + 1}`] = checkType(typeInfo[index])(val);
      return val;
    }, this);

    Object.freeze(this);
  };

  return _T;
};

export default Tuple;
