# Css

<details>
<summary>父容器定宽不定高，实现子元素正方形</summary>

```html
<div class="parent">
  <div class="child"></div>
</div>
```

```css
.parent {
  width: 100px;
}


.child {
  padding-top: 100%; 
}

/* or */
.child {
  padding-bottom: 100%;
}

/* or */
.child {
  padding: 50%;
}

```

</details>
