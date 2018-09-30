
单例模式很常用。
适合：管理器这类需要初始化，内容又很大的类。
和“static类”比较:没有外部公开static主类，这里的意思是里面全是static方法的类。这里主要是适用性的问题，   static类似于函数式编程思想，好处是解耦，坏处是参数一大坨，开发大项目可能要写参数写到死。

常用初始化方法：
1. 按需初始化，在使用时检查是否null进行初始化。
2. 初始化方法：Doublecheck = check Synchronized check create

```java
public static void init(Context context) {
    if (sInfo == null) {
        synchronized (KwbDeviceInfo.class) {
            if (sInfo == null) {
                sInfo = new KwbDeviceInfo(context);
            }
        }
    }
}
```
