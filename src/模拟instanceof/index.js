function Instanceof(left, right) {
  if(typeof left !== 'object' || typeof right !== 'object') {
    return false;
  }

  let proto = Object.getPrototypeOf(left);

  while(true) {
    if (proto === null) {
      return false;
    }
    if (proto === right.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
}