// 当响应式数据发生改变时，如果在其他地方有改数据的依赖，那么
// 收集依赖，然后依次执行依赖
class Dep {
  constructor() {
    this.subscribers = new Set(); // 收集依赖
  }

  // addEffect(effect) {
  //   this.subscribers.add(effect);
  // }

  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect);
    }
  }

  notify() {
    this.subscribers.forEach((effect) => {
      effect();
    });
  }
}

let activeEffect = null;
function watchEffect(effect) {
  activeEffect = effect;
  effect();
  activeEffect = null;
}

const targetMap = new WeakMap();
function getDep(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Dep();
    depsMap.set(key, dep);
  }
  return dep;
}

function reactive(raw) {
  Object.keys(raw).forEach((key) => {
    const dep = getDep(raw, key);
    let value = raw[key];

    Object.defineProperty(raw, key, {
      get() {
        dep.depend();
        return value;
      },
      set(newValue) {
        value = newValue;
        dep.notify();
      },
    });
  });
  return raw;
}

const info = reactive({
  counter: 100
});

watchEffect(function () {
  console.log(info.counter * 2);
});

watchEffect(function () {
  console.log(info.counter + 10);
});

info.counter++;
console.log(info.counter)