
## 一些需要注意的基本常识
1. Fragment是Google首推的设计模式，也是比较符合逻辑的，推荐使用
2. Fragment的一些基本特性
  - 组件化设计模式
  - 一个Activity可以使用多个Fragment，可以用Fragment实现多窗口效果
  - Fragment可以不初始化UI，而是仅仅作为一个工作管理器
3. Fragment是存在一些坑点的，需要注意一下
  - 不注意的话可能会出现UI叠加问题
  - 栈处理问题可能导致crash
  - 异步操作可能导致`getActivity()`返回`null`
3. Fragment常常搭配ViewPager实现划切效果。
