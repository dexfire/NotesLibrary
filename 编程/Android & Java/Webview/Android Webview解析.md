# Android WebView

### 版本发展
1. 

### 基本用法
```Java
WebView web = new WebView(this);
setContentView(web);
//Simplest usage: loadUrl(),no exception will be thrown.
web.loadUrl("https://hyper-math.com");
//Load html: loadData()
String summary = "<html><body>You scored <b>192</b> points.</body></html>";
web.loadData(summary,"text/html",null);
```
## 主要配置
- WebChromeClient
	异常处理
- WebViewClient
	配置
- WebSettings
	访问控制

### 一些小技巧
- 获取当前Url
getRequest，getUrl
- 重定向
