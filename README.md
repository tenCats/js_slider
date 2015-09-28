# js_slider

用js实现滚动条效果的一个小插件，它对应如下的dom结构：
```
	<div class="parent">
		<div class="slide slide-1 hide"></div>
		<div class="slide slide-2"></div>
		<div class="slide slide-3 hide"></div>
	</div>
```
在css中对parent，slide和slide-$(0~4)进行设置（slide-0和slide-4是看不见的元素）

How to use
---

step 1.  创建实例：
```
	var slider = new Slider(dom, className);
```

dom是包裹滚动条的父元素$('.parent')，className='slide'

step 2. 创建动作:
```
slider.execute('up',{arr:[1,2,3]}, delay);
```

```
slider.execute('down',{arr:[1,2,3]}, delay);
```



> tenCats: 2015-09-28
