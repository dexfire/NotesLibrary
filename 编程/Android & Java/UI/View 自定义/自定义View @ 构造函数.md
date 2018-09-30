# 自定义View 之 构造函数

我们知道，自定义View不调用父类的构造函数会出错，因此基本都会标配至少3个构造函数。

```java
public WaterFlowProgressBar(Context context) {
    super(context,null);
}

public WaterFlowProgressBar(Context context, @Nullable AttributeSet attrs) {
    super(context, attrs,android.R.style.Theme_DeviceDefault);
}

public WaterFlowProgressBar(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
    super(context, attrs, defStyleAttr);
}

public WaterFlowProgressBar(Context context, @Nullable AttributeSet attrs, int defStyleAttr, int defStyleRes) {
    super(context, attrs, defStyleAttr, defStyleRes);
}
```

使用Android开发，而不了解、不遵循Android开发框架将会是一件痛苦的事，这里主要讲的是主题系统，主题系统不仅仅只是在配置布局时使用 `@drawable/icon_info` 这种形式，更有 Java 部分的动态配置颜色，比如 夜间模式的实现：

- 如果不适用Android主题框架，那么就要自己搭建定义颜色配置的切换实现，更要命的是，你要为所有类都加一个interface来接收主题变化，这会是很麻烦的一件事；或者可以使用EventBus来解决，但是为什么不使用Android的style这种触手可得的现成工具呢?

参数1. context 不解释
参数2. @Nullable AttributeSet attrs ，这是Android从xml资源文件（Layout）中解析出来的属性集
参数3. int defStyleAttr, 根据字面意思 默认样式属性
参数4. int defStyleRes, 字面意思：默认样式资源

属性集好理解，defStyleAttr是什么呢？