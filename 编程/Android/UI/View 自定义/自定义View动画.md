## 从源码学习控件开发

属性动画
贝塞尔动画
behavior
Toast
popupWindow

- 一线企业一般考虑性能比较多。

- 平台很重要
腾讯、阿里等企业都是有大牛带新人，
技术进步很快。

### Activity的根布局
RootViewGroupImpl
获取窗体主container：
SnakeBar
`((Activity)view.getContext).getWindow().getDecorView().findViewById()`
ViewStub
DecorView extends FrameLayout
id = com.android.internal.R.id.content @android:id/content

```java
public class MainActivity extends Activity(){
    protected void onCreate(){
        setContentView(v);

        // getWindow().setContentView(v) --> PhoneWindow()

    }
}
```

## 自定义View onDraw()
onDraw()

## 让View动起来
### 值变换器
ValueAnimator

### 属性动画
ObjectAnimator.ofFloat()

RecyclerView.scheduleLayoutAnimation()