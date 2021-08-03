Function.prototype.call = function(context, ...args) {
  if(!context) {
    return this(...args);
  }

  const fn = Symbol('fn');
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
}
