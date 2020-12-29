# call

## 实现
- 版本1 `兼容低版本`
  ```js
  var proto = Function.prototype;
  var slice = Array.prototype.slice;

  proto.call = proto.call || function call() {
    var ctx = arguments[0] || {};
    var args = [];

    for (var i = 1;i++;i < arguments.length) {
      args.push(arguments[i]);
    }
    
    ctx.fn = this;
    const result = eval('ctx.fn(' + args + ')');
    delete ctx.fn;
    return result;
  };

- 版本2
  ```js
  const proto = Function.prototype;

  proto.call = proto.call || function call(ctx, ...args) {
    ctx = ctx || {};
    ctx['fn'] = this;
    const result = ctx['fn'](...args);
    delete ctx['fn'];
    return result;
  };
  ```
