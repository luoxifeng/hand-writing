# extends

```js

class Parent {

  static foo() {

  }

  constructor() {
    this.abc = 123;
  }

  moo() {
    this.xyz = 123;
  }
}

class Child extends Parent {

  constructor() {
    super();
    this.childAbc = 456;
  }

  childMoo() {

  }
}

```

## 实现

```js
function defineProperties(target, props, staticProps) {
  props.forEach(({ key, value }) => {
    Object.defineProperty(target, key, {
      value,
      writable: true,
      enumerable: false, 
      configurable: true
    })
  })
}

function createClass(Constructor, protoProps, staticProps) {
  if (protoProps) defineProperties(Constructor.prototype, protoProps);
  if (staticProps) defineProperties(Constructor, staticProps);
}

function Parent() {
  this.abc = 123;
}

createClass(
  Parent,
  [
    {
      key: 'moo',
      value: function moo() {}
    }
  ],
  [
    {
      key: 'foo',
      value: function foo() {}
    }
  ]
);

function Child() {
  Parent.call(this);
  this.childAbc = 456;
}

Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child
  }
})

createClass(
  Child,
   [
    {
      key: 'childMoo',
      value: function childMoo() {}
    }
  ],
);

Object.setPrototypeOf(Child, Parent)


```
