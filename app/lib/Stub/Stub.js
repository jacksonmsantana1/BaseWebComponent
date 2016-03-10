let stubFn = function () {
  let fn = function () {
    fn.called = true;
  };

  fn.called = false;
  return fn;
};

export default stubFn;
