# DOM

- analysisDom
```js
// 分析给定dom元素的包含的元素总个数，最深层级，最大子元素个数

<div class="test_el">
  <div>
    <span>f</span>
    <span>o</span>
    <span>o</span>
  </div>
  <div>
    <div>
      <span>f</span>
      <span>o</span>
      <span>o</span>
      <span>o</span>
    </div>
  </div>
</div>

{
  totalCount: 11,
  maxDepth: 4,
  maxChildredCount: 4,
}

function analysisDom(selector) {
  const els = document.querySelectorAll(selector);
  let totalCount = 0
  let maxDepth = 0
  let maxChildredCount = 0

  const loop = (_els) => {
    maxDepth++
    const currLevelChildren = []
    _els.forEach(el => {
      totalCount++
      if (el.childElementCount > maxChildredCount) {
        maxChildredCount = el.childElementCount
      }
      currLevelChildren.push(...el.children)
    })
    currLevelChildren.length && loop(currLevelChildren)
  }

  loop(els)

  return {
    totalCount,
    maxDepth,
    maxChildredCount
  }
}

analysisDom('.test_el')

```

