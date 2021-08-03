function add(...args) {
  let result = [...args];
  function fn(...childArgs) {
    result.push(...childArgs);
    return fn;
  }
  fn.toString = function() {
    
  }
}