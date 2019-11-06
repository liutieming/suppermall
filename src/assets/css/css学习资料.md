# 伪类;伪元素
css3为了区分伪类和伪元素，伪元素采用双冒号写法。

常见伪类 :hover,:link,:active,:target,:not(),:focus。

常见伪元素 ::first-letter,::first-line,::before,::after,::selection。

::before和::after下特有的content，用于在css渲染中向元素逻辑上的头部或尾部添加内容。

这些添加不会出现在DOM中，不会改变文档内容，不可复制，仅仅是在css渲染层加入。

所以不要用:before或:after展示有实际意义的内容，尽量使用它们显示修饰性内容，例如图标。

举例：网站有些联系电话，希望在它们前加一个icon☎，就可以使用:before伪元素，如下：

复制代码
```html
<!DOCTYPE html>
<meta charset="utf-8" />
<style type="text/css">
    .phoneNumber::before {
    content:'\260E';
    font-size: 15px;
}
</style>
<p class="phoneNumber">12345645654</p>
```

# 视窗单位
视口单位(Viewport units)

什么是视口？ 

在PC端，视口指的是在PC端，指的是浏览器的可视区域；

而在移动端，它涉及3个视口：Layout Viewport（布局视口），Visual Viewport（视觉视口），Ideal Viewport（理想视口）。

视口单位中的“视口”，PC端指的是浏览器的可视区域；移动端指的就是Viewport中的Layout Viewport。

根据CSS3规范，视口单位主要包括以下4个：
1. vw：1vw等于视口宽度的1%。
2. vh：1vh等于视口高度的1%。
3. vmin：选取vw和vh中最小的那个。
4. vmax：选取vw和vh中最大的那个。

vh and vw：相对于视口的高度和宽度，而不是父元素的（CSS百分比是相对于包含它的最近的父元素的高度和宽度）。1vh 等于1/100的视口高度，1vw 等于1/100的视口宽度。

比如：浏览器高度950px，宽度为1920px, 1 vh = 950px/100 = 9.5 px，1vw = 1920px/100 =19.2 px。

vmax相对于视口的宽度或高度中较大的那个。其中最大的那个被均分为100单位的vmax。

vmin相对于视口的宽度或高度中较小的那个。其中最小的那个被均分为100单位的vmin。