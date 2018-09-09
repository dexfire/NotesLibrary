# smali 语法

## 基本数据类型

`I`: `int`  
`L`: `long`  
`Z`: `boolean`  
`V`: `void`  
``:

## 基本语句

`.field private isFlag:z`　　定义变量

### 函数定义

`.line 12`　　行号标记

`.method`　　方法
`.locals 2`　　本地变量计数 __位于函数头部__
`.parameter` `.param`　　方法参数 __位于函数头部__
`.prologue`　　方法开始

`.end method`　　函数结束

invoke-super　　调用父函数

const/high16  v0, 0x7fo3　　把0x7fo3赋值给v0

invoke-direct　　调用函数

return-void　　函数返回void

new-instance　　创建实例

iput-object　　对象赋值

iget-object　　调用对象

invoke-static　　调用静态函数

```s
.method private isPrivate()Z
.end method
```