function New(constructor, ...args) {
  let currentObj = Object.create(constructor.prototype);

  const result = constructor.call(currentObj, ...args);

  return typeof result === 'object' ? result : currentObj;
}

function A(currentName) {
  this.name = currentName;
}
A.prototype.changeName = function() {
  this.name = 'bbb';
}

let a = New(A, 'aaa');
a.changeName()
console.log(a);
