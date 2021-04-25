
// count.js
let count = 1;

function increment () {
  count++;
}

module.exports = {
  count,
  increment
}

// index.js
const counter = require('counter.js');

counter.increment();
console.log(counter.count); 
请写出console.log输出的结果


// counter.mjs
export let count = 1;

export function increment () {
  count++;
}

// index.mjs
import { increment, count } from './counter.mjs'

increment();
console.log(count); 
请写出console.log输出的结果


3
function Foo(){ this.getName = function(){console.log('1')}; return this;}
Foo.getName = function() { console.log('2'); };
Foo.prototype.getName=function(){console.log('3');};
var getName=function(){console.log('4')};
function getName(){console.log('5');};


4
// 打印
Foo.getName();
getName();
Foo().getName();
getName();
new (Foo.getName)();
(new Foo()).getName();

实现 mergePromise 函数，把传进去的数组顺序先后执行，并且把返回的数据先后放到数组 data 中

const timeout = ms =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })

const ajax1 = () =>
  timeout(2000).then(() => {
    console.log('1')
    return 1
  })

const ajax2 = () =>
  timeout(1000).then(() => {
    console.log('2')
    return 2
  })

const ajax3 = () =>
  timeout(2000).then(() => {
    console.log('3')
    return 3
  })

const mergePromise = ajaxArray => {
  // 在这里实现你的代码
}

mergePromise([ajax1, ajax2, ajax3]).then(data => {
  console.log('done')
  console.log(data) // data 为 [1, 2, 3]
})

// 分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]


5
写一个定时器函数 myTimer(fn, a, b),每次间隔 a,a+b,a+2b,...,a+nb 的时间执行fn，该定时器返回一个函数为 myClear，可以停止上面的定时器 myTimer（请使用setTimeout来实现该题目，myTimer函数只调用一次）


function myTimer(fun, a, b) {
  let timer
  function inner(i = 0) {
    timer = setTimeout(() => {
      fun(i)
      inner(++i)

    }, a + b * i)
  }

  inner()
  return () => clearTimeout(timer)
}

clear = myTimer(console.log, 0, 1000)

function sum(...list) {
    sum.list.push(...list)
    return sum
}

sum[Symbol.toPrimitive]= function () {
    return this.list.reduce((a, b) => a + b)
}
sum.list = []

console.log(sum(1,2,3)(4)) 