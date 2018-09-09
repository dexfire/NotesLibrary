## Android 系统框架 -- Context 理解
先看看 Android 对 Context 的注释
```java
/**
 * Interface to global information about an application environment.  This is
 * an abstract class whose implementation is provided by
 * the Android system.  It
 * allows access to application-specific resources and classes, as well as
 * up-calls for application-level operations such as launching activities,
 * broadcasting and receiving intents, etc.
 */
 ```
> 应用环境的全局变量信息接口。这是一个抽象类，它的实现由Android系统提供。它允许操作应用相关的资源和类，也包括向上请求application级别的操作，如启动Activity，广播和接受intent等等。