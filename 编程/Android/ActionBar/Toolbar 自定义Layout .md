# Toolbar 自定义Layout
用AS初始化一个空项目，会自动生成一个项目框架，我们看到默认使用的 ActionBar 是 Support 包内的 `android.support.v7.widget.Toolbar` ，
但是，很多大公司的项目都不使用 Android 原生的 Toolbar ? Why ?
其实没有用过肯定不知道为什么，我们先来试着用一用把。

### setSupportActionBar(toolbar)
这个方法的直观效果是这个 toolbar 的 title 被设置成了 Activity 的 title ，
然后后续对 ActionBar 的操作也会自动转向对这个 Toolbar 的操作。
