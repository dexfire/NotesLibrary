# WebView + ContentProvider 实现安卓查看本地网页正常跳转

## 本地网页浏览的弊端

  浏览器的确可以打开本地网页文件，可是一般都无法正常显示，这是为什么呢？
我们知道，浏览器组织内联文件的方式有以下几种：

- 内嵌
- 相对链接
- 绝对链接

为了保证网页在不同的服务器间的一致性，我们大量使用 **相对路径**来链接css和js文件以及其他网页的跳转链接，浏览器处理相对链接的原则是获取当前网页的访问方式`scheme`，主机名`host`和目标路径`path`，然后目标的绝对位置就是`scheme://host/path`。

但是如果我们把网页放在本地，按照相同的原则处理出来的结果会出现问题，导致网页内的css样式及js脚本无法加载，链接无法正常跳转，原因正在于这种相对链接处理机制。从当前网页(假如是/var/www/html/index.html)获取的信息就是  
`scheme: 'file'`
`host: ''`
`path: '/var/www/html/index.html'`
发现问题了吗？加入我们有一个相对链接，指向`./js/toc.js`那么通过这种机制处理得到的结果url为`file://./js/toc.js`，显然这个结果是错误的。

## 解决方案

为了解决这个问题，我们容易想到以下几种方法。

- 为每个网页请求重定向
- 把所有网页链接都修改为绝对路径
- 搭建一个httpd或者nginx服务器
- 模拟服务器
  - 搭建一个简单的java服务器
  - ContentProvider

一一分析一下：
**使用网页重定向**  
我们需要监听webview的onLoadResource()事件和shouldOverrideUrlLoading()事件，并重定向。
事实上这并不是一个简单的问题，因为webview并没有开放重定向资源文件地址的方法，因此这个方法注定行不通的。

**把所有网页链接都修改为绝对路径**  
这也不是一个好方法，因为代价实在太大了，全局修改。

**搭建一个httpd或者nginx服务器**  
同样的，代价过高，为了兼容性，我们要准备arm平台的二进制文件，为了性能，还需要准备arm64的二进制文件，还有配置，性能、配置文件等多种问题，同时因为需要调用shell接口来完成，实际操作时比较难以实现和维护的。

**模拟服务器**

- 用java写一个服务器  
    这个还是比较复杂的，但是可能有现成的开源项目供使用。
- 使用Provider  
    这种方法是比较有优势的，代码量小，方便维护，而且完美跳转，性能方面可能要差一些。
Provider代码

```java
public class LocalFileContentProvider extends ContentProvider {

    public static final String URI_PREFIX = "content://work.mathwiki.data";

    @Nullable
    @Override
    public ParcelFileDescriptor openFile(@NonNull Uri uri, @NonNull String mode) throws FileNotFoundException {
        String path = uri.getPath();
        path = DataManager.getDataPath() + File.separator + path;

        File target = new File(path);
        if(!target.exists()){
            path = DataManager.get404Path();
        }

        Logger.si("LocalFileContentProvider: Loading file "+ path);
        return ParcelFileDescriptor.open(new File(path),ParcelFileDescriptor.MODE_READ_WRITE);
    }
    ...
}
```

在AndroidManifest.xml中注册：

```xml
<provider
    android:authorities="work.mathwiki.data"
    android:name=".core.content.LocalFileContentProvider"/>
```

使用webview读取本地html页面。

```java
webView.loadUrl(LocalFileContentProvider.URI_PREFIX + File.separator + "index.html");
```

实际效果完全ok，所有的css和js都能正常加载。