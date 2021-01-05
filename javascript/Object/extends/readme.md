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
    this.childAbc = 456;
  }

  childMoo() {

  }
}

```

## 实现

```js
function Parent() {
  this.abc = 123;
}

Parent.prototype.moo = function moo() {
  this.xyz = 123;
}
```
