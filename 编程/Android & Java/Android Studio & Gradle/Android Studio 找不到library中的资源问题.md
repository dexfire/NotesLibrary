# Android Studio 找不到support library资源的问题
	用AS导入一个项目，结果经常build不过，报错信息如下：
```
error: resource color/theme_color_secondary (aka work.mathwiki:color/theme_color_secondary) not found.
Message{kind=ERROR, text=error: resource color/theme_color_secondary (aka work.mathwiki:color/theme_color_secondary) not found., sources=\[/media/dexfire/dev/android/projects/mathwiki/app/src/main/res/color/selector_tab_item.xml:4\], original message=, tool name=Optional.of(AAPT)}
```
```
Cannot resolve symbol 'Theme' 
```
## 出错原因分析
	找不到资源说明没有这些资源的index，但是检查发现已经在Gradle中配置了这些包，所以问题应该在AS处理index这方面。

## 尝试解决
- 重启AS，无效
- Build - Clean Project，Build，无效
- 删掉 selector_tab_item.xml中的无效引用，build finished ，问题解决

## 总结
 AS还是一头Super Cow，出错还是很少的，多找找自己哪里不够细心，AS都把位置给你指出来了，...，好好善待它～～

