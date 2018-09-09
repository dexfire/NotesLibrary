# 初识 Butter-Knife

Butter-Knife 是 Android 开发领域著名的开源库。
![butterknife](https://jakewharton.github.io/butterknife/static/logo.png)
[butterknife官网](https://jakewharton.github.io/butterknife/)

## 自动绑定 View

Annotate fields with @BindView and a view ID for Butter Knife to find and automatically cast the corresponding view in your layout.
使用 @BindView(资源id) 来自动find并cast你的View。

```java
class ExampleActivity extends Activity {
  @BindView(R.id.title) TextView title;
  @BindView(R.id.subtitle) TextView subtitle;
  @BindView(R.id.footer) TextView footer;

  @Override public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.simple_activity);
    ButterKnife.bind(this);
    // TODO Use fields...
  }
}
```

Instead of slow reflection, code is generated to perform the view look-ups. Calling bind delegates to this generated code that you can see and debug.
使用慢反射？我们为view查找生成代码。调用call函数实际上会调用下面这串易读易调试的代码。

The generated code for the above example is roughly equivalent to the following:
上例中生成的代码差不多和下面的相同。

```java
public void bind(ExampleActivity activity) {
  activity.subtitle = (android.widget.TextView) activity.findViewById(2130968578);
  activity.footer = (android.widget.TextView) activity.findViewById(2130968579);
  activity.title = (android.widget.TextView) activity.findViewById(2130968577);
}
```

## 资源绑定

RESOURCE BINDING

Bind pre-defined resources with @BindBool, @BindColor, @BindDimen, @BindDrawable, @BindInt, @BindString, which binds an R.bool ID (or your specified type) to its corresponding field.
快速绑定，绑定后可以把资源值变为java变量。

```java
class ExampleActivity extends Activity {
  @BindString(R.string.title) String title;
  @BindDrawable(R.drawable.graphic) Drawable graphic;
  @BindColor(R.color.red) int red; // int or ColorStateList field
  @BindDimen(R.dimen.spacer) Float spacer; // int (for pixel size) or float (for exact value) field
  // ...
}
```

## 非 Activity 场合绑定

NON-ACTIVITY BINDING

You can also perform binding on arbitrary objects by supplying your own view root.
你可以在非Activity中通过提供view root来进行绑定。

```java
public class FancyFragment extends Fragment {
  @BindView(R.id.button1) Button button1;
  @BindView(R.id.button2) Button button2;

  @Override public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
    View view = inflater.inflate(R.layout.fancy_fragment, container, false);
    ButterKnife.bind(this, view);
    // TODO Use fields...
    return view;
  }
}
```

Another use is simplifying the view holder pattern inside of a list adapter.
在 ListAdapter 中使用butterknife。

```java
public class MyAdapter extends BaseAdapter {
  @Override public View getView(int position, View view, ViewGroup parent) {
    ViewHolder holder;
    if (view != null) {
      holder = (ViewHolder) view.getTag();
    } else {
      view = inflater.inflate(R.layout.whatever, parent, false);
      holder = new ViewHolder(view);
      view.setTag(holder);
    }

    holder.name.setText("John Doe");
    // etc...

    return view;
  }

  static class ViewHolder {
    @BindView(R.id.title) TextView name;
    @BindView(R.id.job_title) TextView jobTitle;

    public ViewHolder(View view) {
      ButterKnife.bind(this, view);
    }
  }
}
```

You can see this implementation in action in the provided sample.

Calls to `ButterKnife.bind` can be made anywhere you would otherwise put findViewById calls.

Other provided binding APIs:

Bind arbitrary objects using an activity as the view root. If you use a pattern like MVC you can bind the controller using its activity with ButterKnife.bind(this, activity).
Bind a view's children into fields using `ButterKnife.bind(this)`. If you use `<merge>` tags in a layout and inflate in a custom view constructor you can call this immediately after. Alternatively, custom view types inflated from XML can use it in the `onFinishInflate()` callback.

## 生成控件list

VIEW LISTS

You can group multiple views into a List or array.

```java
@BindViews({ R.id.first_name, R.id.middle_name, R.id.last_name })
List<EditText> nameViews;
```

The apply method allows you to act on all the views in a list at once.

```java
ButterKnife.apply(nameViews, DISABLE);
ButterKnife.apply(nameViews, ENABLED, false);
Action and Setter interfaces allow specifying simple behavior.

static final ButterKnife.Action<View> DISABLE = new ButterKnife.Action<View>() {
  @Override public void apply(View view, int index) {
    view.setEnabled(false);
  }
};
static final ButterKnife.Setter<View, Boolean> ENABLED = new ButterKnife.Setter<View, Boolean>() {
  @Override public void set(View view, Boolean value, int index) {
    view.setEnabled(value);
  }
};
```

An Android Property can also be used with the apply method.

```java
ButterKnife.apply(nameViews, View.ALPHA, 0.0f);
```

## 绑定事件监听器

LISTENER BINDING

Listeners can also automatically be configured onto methods.

```java
@OnClick(R.id.submit)
public void submit(View view) {
  // TODO submit data to server...
}
```

All arguments to the listener method are optional.

```java
@OnClick(R.id.submit)
public void submit() {
  // TODO submit data to server...
}
```

Define a specific type and it will automatically be cast.

```java
@OnClick(R.id.submit)
public void sayHi(Button button) {
  button.setText("Hello!");
}
```

Specify multiple IDs in a single binding for common event handling.

```java
@OnClick({ R.id.door1, R.id.door2, R.id.door3 })
public void pickDoor(DoorView door) {
  if (door.hasPrizeBehind()) {
    Toast.makeText(this, "You win!", LENGTH_SHORT).show();
  } else {
    Toast.makeText(this, "Try again", LENGTH_SHORT).show();
  }
}
```

Custom views can bind to their own listeners by not specifying an ID.

```java
public class FancyButton extends Button {
  @OnClick
  public void onClick() {
    // TODO do something!
  }
}
```

## 取消绑定

BINDING RESET

Fragments have a different view lifecycle than activities. When binding a fragment in onCreateView, set the views to null in onDestroyView. Butter Knife returns an Unbinder instance when you call bind to do this for you. Call its unbind method in the appropriate lifecycle callback.

```java
public class FancyFragment extends Fragment {
  @BindView(R.id.button1) Button button1;
  @BindView(R.id.button2) Button button2;
  private Unbinder unbinder;

  @Override public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
    View view = inflater.inflate(R.layout.fancy_fragment, container, false);
    unbinder = ButterKnife.bind(this, view);
    // TODO Use fields...
    return view;
  }

  @Override public void onDestroyView() {
    super.onDestroyView();
    unbinder.unbind();
  }
}
```

## 条件绑定

OPTIONAL BINDINGS

By default, both @Bind and listener bindings are required. An exception will be thrown if the target view cannot be found.
默认使用bind如果目标view没找到会抛出Exception。

To suppress this behavior and create an optional binding, add a @Nullable annotation to fields or the @Optional annotation to methods.
你可以添加 `@Nullable` `Optional` 注解来避免这种行为。

Note: Any annotation named @Nullable can be used for fields. It is encouraged to use the @Nullable annotation from Android's "support-annotations" library.

```java
@Nullable @BindView(R.id.might_not_be_there) TextView mightNotBeThere;

@Optional @OnClick(R.id.maybe_missing) void onMaybeMissingClicked() {
  // TODO ...
}
```

## 多方法监听器

MULTI-METHOD LISTENERS

Method annotations whose corresponding listener has multiple callbacks can be used to bind to any one of them. Each annotation has a default callback that it binds to. Specify an alternate using the callback parameter.

```java
@OnItemSelected(R.id.list_view)
void onItemSelected(int position) {
  // TODO ...
}

@OnItemSelected(value = R.id.maybe_missing, callback = NOTHING_SELECTED)
void onNothingSelected() {
  // TODO ...
}
```

## 下载、使用

Download

GRADLE

```conf
implementation 'com.jakewharton:butterknife:(insert latest version)'
annotationProcessor 'com.jakewharton:butterknife-compiler:(insert latest version)'
```