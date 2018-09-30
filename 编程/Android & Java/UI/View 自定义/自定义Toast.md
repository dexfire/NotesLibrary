---
title: 自定义Toast
---
# Android 自定义 Toast 样式

Toast 吐司是Android一大特色， 也是最容易自定义的一大组件，通过简单的样式修改可以收获良好的体验。

## 系统Toast解析

构造函数：  

```Java
/**
    * Construct an empty Toast object.  You must call {@link #setView} before you
    * can call {@link #show}.
    *
    * @param context  The context to use.  Usually your {@link android.app.Application}
    *                 or {@link android.app.Activity} object.
    */
public Toast(Context context) {
    this(context, null);
}

/**
    * Constructs an empty Toast object.  If looper is null, Looper.myLooper() is used.
    * @hide
    */
public Toast(@NonNull Context context, @Nullable Looper looper) {
    mContext = context;
    mTN = new TN(context.getPackageName(), looper);
    mTN.mY = context.getResources().getDimensionPixelSize(
            com.android.internal.R.dimen.toast_y_offset);
    mTN.mGravity = context.getResources().getInteger(
            com.android.internal.R.integer.config_toastDefaultGravity);
}
```

最常用的方法：
makeText()

自定义方法：

```Java
public class StyledToast {

    public static final int TYPE_INFO_GREEN = 0;
    public static final int TYPE_INFO_BLUE = 1;
    public static final int TYPE_WARNING = 2;
    public static final int TYPE_ERROR = 3;

    // 空 private 构造函数，防止被实例化
    private StyledToast(){}

    public static Toast makeText(Context context,int type, @StringRes int resId, int durationMs){
        Toast toast = new Toast(context);
        int layoutId = R.layout.toast_info_green;
        switch (type){
            case TYPE_INFO_GREEN:
                // Do nothing
                break;
            case TYPE_INFO_BLUE:
                layoutId = R.layout.toast_info_blue;
                break;
            case TYPE_WARNING:
                layoutId = R.layout.toast_warning;
                break;
            case TYPE_ERROR:
                layoutId = R.layout.toast_error;
                break;
        }
        View view = ((LayoutInflater)context.getSystemService(Context.LAYOUT_INFLATER_SERVICE)).inflate(layoutId,null);
        TextView text = view.findViewById(R.id.message);
        text.setText(resId);
        toast.setView(view);
        toast.setDuration(durationMs);
        return toast;
    }

    public static Toast makeText(Context context,int type, CharSequence str, int durationMs){
        Toast toast = new Toast(context);
        int layoutId = R.layout.toast_info_green;
        switch (type){
            case TYPE_INFO_GREEN:
                // Do nothing
                break;
            case TYPE_INFO_BLUE:
                layoutId = R.layout.toast_info_blue;
                break;
            case TYPE_WARNING:
                layoutId = R.layout.toast_warning;
                break;
            case TYPE_ERROR:
                layoutId = R.layout.toast_error;
                break;
        }
        View view = ((LayoutInflater)context.getSystemService(Context.LAYOUT_INFLATER_SERVICE)).inflate(layoutId,null);
        TextView text = view.findViewById(R.id.message);
        text.setText(str);
        toast.setView(view);
        toast.setGravity(Gravity.CENTER_HORIZONTAL |  Gravity.BOTTOM ,0,-300);
        toast.setDuration(durationMs);
        return toast;
    }
}
```