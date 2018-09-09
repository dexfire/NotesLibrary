## 京东阅读代码分析--Preference存储配置变量
使用过程的实例代码，使用的时候直接获取单例单例，然后存取数据都非常方便了。
```java
if (LocalUserSettingUtils.isNight() && this.isNeedNightModel) {
    if (SharedPreferencesUtils.getInstance().getInt(this, SharedPreferencesConstant.STATUSBAR_COLOR) == -1) {
        SharedPreferencesUtils.getInstance().putInt(this, SharedPreferencesConstant.STATUSBAR_COLOR, window.getStatusBarColor());
    }
    window.getDecorView();
    window.setStatusBarColor(getResources().getColor(R.color.gray_night));
}
```
### SharedPreferenceUtils实现
- 单例模式
- 单例创建线程锁(DCL,Double Check Lock)

```java
package com.jingdong.sdk.jdreader.common.base.utils.SharedPreferences;

// import ...;

public class SharedPreferencesUtils {
    public static final String PREFERENCES_NAME = "MZBookPreferences";
    private static volatile SharedPreferencesUtils instance = null;
    private Editor editor = null;
    private SharedPreferences preferences = null;

    public static SharedPreferencesUtils getInstance() {
        if (instance == null) {
            synchronized (SharedPreferencesUtils.class) {
                if (instance == null) {
                    instance = new SharedPreferencesUtils();
                }
            }
        }
        return instance;
    }

    private void init(Context context) {
        if (this.preferences == null || this.editor == null) {
            this.preferences = context.getSharedPreferences("MZBookPreferences", 0);
            this.editor = this.preferences.edit();
        }
    }

    public void putString(Context context, String str, String str2) {
        init(context);
        this.editor.putString(str, str2);
        this.editor.commit();
    }

    public String getString(Context context, String str, String str2) {
        init(context);
        return this.preferences.getString(str, str2);
    }

    public String getString(Context context, String str) {
        init(context);
        return this.preferences.getString(str, "");
    }

    public Set<String> getStringSet(Context context, String str) {
        init(context);
        return this.preferences.getStringSet(str, null);
    }

    
    // ... ...

    public boolean isInSet(Context context, String str, String str2) {
        init(context);
        Set stringSet = this.preferences.getStringSet(str, null);
        if (stringSet == null || stringSet.size() == 0) {
            return false;
        }
        return stringSet.contains(str2);
    }

    public Boolean putIntoSet(Context context, String str, String str2) {
        init(context);
        Set stringSet = this.preferences.getStringSet(str, null);
        if (stringSet == null) {
            stringSet = new HashSet();
        }
        if (!stringSet.contains(str2)) {
            stringSet.add(str2);
            this.editor.putStringSet(str, stringSet);
        }
        return Boolean.valueOf(this.editor.commit());
    }

    public Boolean deleteFromSet(Context context, String str, String str2) {
        init(context);
        Set stringSet = this.preferences.getStringSet(str, null);
        if (stringSet != null && stringSet.contains(str2)) {
            stringSet.remove(str2);
            this.editor.putStringSet(str, stringSet);
        }
        return Boolean.valueOf(this.editor.commit());
    }
}
```