# Container + removeViews() + addView() 不显示View问题

最近在一个项目里使用这种View控制模型，结果发现添加的View不能被正确找到。

代码很简单，MainActivity

```java
public onCreate(Bundle save){
    super.onCreate(save);
    // 布局 Views
    // 默认显示主页
    log.dd("Main Activity starting");
    ContentManager.addView(ContentView.index,(ViewGroup) getLayoutInflater().inflate(R.layout.layout_index,null),mIndexCallBacks);
    ContentManager.addView(ContentView.context,(ViewGroup) getLayoutInflater().inflate(R.layout.layout_context,null),mContextCallBacks);
    ContentManager.addView(ContentView.toys,(ViewGroup) getLayoutInflater().inflate(R.layout.layout_context,null),mToyBoxCallBacks);
    setContentView(R.layout.activity_main);
    mContainer = findViewById(R.id.activity_main_container);
    ContentManager.showContent(ContentView.index,mContainer);
    log.dd("MainActivity views loaded success!");
}
//  ...
private ContentManager.ContentCallback mIndexCallBacks = new ContentManager.ContentCallback() {
    WebView webView;
    @Override
    public void onInit(ContentView key, ViewGroup view) {
        WebView webView = view.findViewById(R.id.layout_index_webview);
        WebViewSetup.initializeWebView(webView);
    }

    @Override
    public void onShow(ContentView key, ViewGroup view) {
        if(webView!=null){
            webView.loadUrl(DataManager.getInstance().getIndexUrl());
        }else{
            webView  = view.findViewById(R.id.layout_index_webview);
            log.e(" Error: Can't find WebView. Try to find again");
        }
    }

    @Override
    public void onHide(ContentView key, ViewGroup view) {

    }
};
```

然后,DataManager.showContent()

```java
public static void showContent(ContentView key, ViewGroup container){
    if(mViewGroups.containsKey(key) || container!=null || mViewGroups.get(key)!=null){
        log.ii("显示ViewGroup : "+ key.name());
        container.removeAllViewsInLayout();
        container.addView(getView(key),-1,-1);
        // 旧 View 的 onHide 事件
        if(mCallbacks.get(mCurrent)!=null){
            mCallbacks.get(mCurrent).onHide(key,getView(mCurrent));
        }
        // 当前view的 onShow 事件
        if(mCallbacks.get(key)!=null){
            mCallbacks.get(key).onShow(key,container);
        }
        mCurrent = key;
    }
}
```

打的log报错 **Error: Can't find WebView.**，也就是findviewbyid()找不到子View

```s
08-30 17:54:33.245 24743-24753/work.mathwiki I/zygote64: After code cache collection, code=27KB, data=29KB
08-30 17:54:33.247 24743-24753/work.mathwiki I/zygote64: Increasing code cache capacity to 128KB
08-30 17:54:33.266 24743-24743/work.mathwiki I/Hyper-Math #null: ========  显示ViewGroup : index  ========
08-30 17:54:33.267 24743-24743/work.mathwiki E/Hyper-Math #null:  Error: Can't find WebView. Try to find again
08-30 17:54:33.267 24743-24743/work.mathwiki D/Hyper-Math #null: ========  MainActivity views loaded success!  ========
```

## 起初几个猜测：

- ViewGroup为null？
    不可能，因为已经判空了
- View被遮挡了
    不合理，因为findviewbyid找不到view
- View没有被添加进布局？
    **很有可能**，原因同上，找不到肯定是没加进去。
    那原因到底是什么呢？

## 解决方法

仔细改来改去，发现... 其实把`showContent()`方法中的`container.removeAllViewsInLayout();`改成`container.removeAllViews();`就解决了;

## 原因分析

`container.removeAllViews();`

```java
public void removeAllViews() {
    removeAllViewsInLayout();
    requestLayout();
    invalidate(true);
}
```

这里重新`RequsetLayout()`了一遍，至于为什么会addView()失败，