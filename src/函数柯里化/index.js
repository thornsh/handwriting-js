function add(...args) {
  const _args = args;
  function fn(...childArgs) {
    _args.push(...childArgs);
    return fn;
  }
  fn.toString = function() {
    return _args.reduce((pre, curr) => {
      return pre + curr;
    })
  }
  return fn;
}
let a = add(1,2,3)(3)(4).toString()
console.log(a)
