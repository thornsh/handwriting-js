const h = (tag, props, children) => {
  return {
    tag,
    props,
    children,
  };
};

const mount = (vnode, container) => {
  // 每个vnode上有相应的el
  const el = (vnode.el = document.createElement(vnode.tag));

  if (vnode.props) {
    for (const prop in vnode.props) {
      const value = vnode.props[prop];
      if (value.startsWith("on")) {
        el.addEventListener(value.slice(2), value);
      } else {
        el.setAttribute(prop, value);
      }
    }
  }

  if (vnode.children) {
    if (typeof vnode.children === "string") {
      el.textContent = vnode.children;
    } else {
      vnode.children.forEach((item) => {
        mount(item, el);
      });
    }
  }
  container.appendChild(el);
};

const patch = (n1, n2) => {
  if (n1.tag !== n2.tag) {
    const parentElement = n1.el.parentElement;
    parentElement.removeChild(n1.el);
    mount(n2, parentElement);
  } else {
    const el = (n2.el = n1.el);

    const oldProps = n1.props || {};
    const newProps = n2.props || {};

    for (const key in newProps) {
      const newValue = newProps[key];
      const oldValue = oldProps[key];
      if (newValue !== oldValue) {
        if (key.startsWith("on")) {
          el.addEventListener(key.slice(2), newValue);
        } else {
          el.setAttribute(key, newValue);
        }
      }
    }
    for (const key in oldProps) {
      if (!(key in newProps)) {
        const value = oldProps[key];
        if (key.startsWith("on")) {
          el.removeEventListener(key.slice(2), value);
        } else {
          el.removeAttribute(key);
        }
      }
    }

    const oldChildren = n1.children;
    const newChildren = n2.children;

    if (typeof newChildren === "string") {
      if (typeof oldChildren === "string") {
        if (newChildren !== oldChildren) {
          el.textContent = newChildren;
        }
      } else {
        el.innerHTML = newChildren;
      }
    } else {
      if (typeof oldChildren === "string") {
        el.innerHTML = "";
        newChildren.forEach((item) => {
          mount(item, el);
        });
      } else {
        const commonLength = Math.min(oldChildren.length, newChildren.length);

        for (let i = 0; i < commonLength; i++) {
          patch(oldChildren[i], newChildren[i]);
        }

        if (oldChildren.length < newChildren.length) {
          newChildren.slice(oldChildren.length).forEach((item) => {
            mount(item, el);
          });
        }
        if (oldChildren.length > newChildren.length) {
          oldChildren.forEach((item) => {
            el.removeChild(item.el);
          });
        }
      }
    }
  }
};
