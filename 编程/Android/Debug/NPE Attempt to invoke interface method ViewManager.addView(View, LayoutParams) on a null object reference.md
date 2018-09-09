


完整StackTrace
```s
Process: work.mathwiki, PID: 11658
    java.lang.NullPointerException: Attempt to invoke interface method 'void android.view.ViewManager.addView(android.view.View, android.view.ViewGroup$LayoutParams)' on a null object reference
        at android.app.ActivityThread.handleResumeActivity(ActivityThread.java:3671)
        at android.app.ActivityThread.handleLaunchActivity(ActivityThread.java:2863)
        at android.app.ActivityThread.-wrap11(Unknown Source:0)
        at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1590)
        at android.os.Handler.dispatchMessage(Handler.java:106)
        at android.os.Looper.loop(Looper.java:164)
        at android.app.ActivityThread.main(ActivityThread.java:6499)
        at java.lang.reflect.Method.invoke(Native Method)
        at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:440)
        at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:807)
```


```xml
<LinearLayout
    android:orientation="vertical"
    android:id="@+id/activity_main_container"
    android:layout_width="match_parent"
    android:layout_height="match_parent"/>
```

```java
    // 默认显示主页
    ContentManager.addView(content.index,(ViewGroup) getLayoutInflater().inflate(R.layout.layout_index,null));
    ContentManager.addView(content.context,(ViewGroup) getLayoutInflater().inflate(R.layout.layout_context,null));
    ContentManager.addView(content.toys,(ViewGroup) getLayoutInflater().inflate(R.layout.layout_context,null));
    setContentView(R.layout.activity_main);
    mContainer = findViewById(R.id.activity_main_container);
    showContent(content.index);

    private void showContent(content key) {
        if(mContainer!=null){
            mContainer.removeAllViews();
            mContainer.addView(ContentManager.getView(key),-1,-1);
        }
    }
```

错误猜测：

- setContentView()产生的错误。
- mContainer.addView() Container不支持添加