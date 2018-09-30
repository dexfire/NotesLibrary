---
title: EditText 源码分析
---

# EditText 源码分析

最近因为要做一个编辑器，所以需要自定义界面，但是对于文本输入部分不是很熟悉，都说Android源码是好东西，那就看看系统是怎么实现EditText的吧。

## 代码结构

我们发现EditText.java 只有 4KB 大小，而一个功能完整的TextView的完整实现绝对不可能通过三行代码就搞定。
结果；我们还注意到EditText继承自TextView，唯一的解释就是EditText的可编辑特点来源于 TextView 。

### EditText做了什么？

1. 继承了一些需要自定义的函数，

#### 读取样式表

```Java
/*
    * Look the appearance up without checking first if it exists because
    * almost every TextView has one and it greatly simplifies the logic
    * to be able to parse the appearance first and then let specific tags
    * for this View override it.
    */
TypedArray a = theme.obtainStyledAttributes(attrs,
        com.android.internal.R.styleable.TextViewAppearance, defStyleAttr, defStyleRes);
TypedArray appearance = null;
int ap = a.getResourceId(
        com.android.internal.R.styleable.TextViewAppearance_textAppearance, -1);
a.recycle();
if (appearance != null) {
    int n = appearance.getIndexCount();
    for (int i = 0; i < n; i++) {
        int attr = appearance.getIndex(i);

        switch (attr) {
            case com.android.internal.R.styleable.TextAppearance_textColorHighlight:
                textColorHighlight = appearance.getColor(attr, textColorHighlight);
                break;

            case com.android.internal.R.styleable.TextAppearance_textColor:
                textColor = appearance.getColorStateList(attr);
                break;

            case com.android.internal.R.styleable.TextAppearance_textColorHint:
                textColorHint = appearance.getColorStateList(attr);
                break;
...

```

主要是根据主题和Appearence来获取一些样式、设置属性。

#### 

---

1. Android 代码中的注释也是多种混合使用，块注释，函数注释，行内/\*注释\*//注释，但有一点是他们无疑都很规范。
2. **默认访问修饰符**的使用
3. Android 基本为每一个类都加了一个固定成员 private static final LOG_TAG = "TextView";
4. Button, CompoundButton, WebView 等都是继承自 TextView。