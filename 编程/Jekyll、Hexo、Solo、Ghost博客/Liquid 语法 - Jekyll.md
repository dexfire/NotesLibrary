---
title: Liquid 语法
---
# Liquid

Liquid 是 Jekyll 中支持的一种脚本语言，ruby 和 网络文件处理之间契合度很高，这也是 Jekyll 选择liquid脚本的原因。
参考：
  [Liquid中文文档 @bootcss](https://liquid.bootcss.com/)
  [Liquid docs by shopify](https://shopify.github.io/liquid/)

## 初识 Liquid

Liquid是一门开源的模板语言，由Shopify创造并使用Ruby实现。它是Shopify主题的骨骼，并且被用于加载店铺系统的动态内容。
从2006年起

## 语言基础

Liquid 代码是**内嵌**到web文件中的，所有代码需要包含于 双花括号 `{{`  `}}` 之间。
Liquid 语法包含`对象(Objects)`，`标记(Tags)`，`过滤器(Filter)`三类。
Liquid 作为一种脚本语言，属于`弱类型语言`（弱类型语言是指不需要显式标记一个变量的类型，变量类型根据变量存储的值来自动判断。弱类型不代表没有类型）。
Liquid 中的变量类型：对象、对象数组。对象类型：数值、字符串。

#### 真值

除了 `nil` `false` 为假值外，其余全为真值。

## 对象

对象即Liquid中的变量，我们脚本中所有操作目标(Target)都是对象，对象也符合 **数据**的定义，因此在本文中 `对象`  `变量`  `数据` 的意义相近。

- 所有Liquid变量都是一个Liquid对象。
- **对象使用 `{%` `%}` 包裹。**
- Liquid对象和Java对象机制几乎完全相同（存在细微差别）。
- 使用 parent.child 访问对象的子对象。
- 定义变量：
    1. 在配置文件中定义，例如 Jekyll中的 `_config.yaml` 等。例如: `site.url = 'http://facker.github.io/'`
    2. 使用 `assign` 关键字，例如 `{{ assign page.title = 'Welcome to zhexue's Home' }}`
- 引用变量
    1. 单独一个变量意味着输出这个变量，例如 `{{ site.url }}` 将会打出 http://facker.github.io
    2. 在标记(Tag)语句中使用变量，例如：`{% if user %}`，user是一个变量。

## 标记

这里的标记更接近 `Html是一门标记语言` 中的标记的意义，这种标记的意义其实非常广泛。
主要分为以下三个大类：

- 控制流
- 迭代
- 变量赋值

### 语句块

#### **for 循环**

#### **if else elseif endif 条件分支**

#### **case ... when 分支结构**

#### **cycle 周期组**

周期性循环一组字符串并按照它们传入的顺序将其输出。每次调用 cycle 时，传入的参数中的下一个字符串将被输出。

**cycle 必须用在 for 循环中。**

输入
```s
{% cycle 'one', 'two', 'three' %}
{% cycle 'one', 'two', 'three' %}
{% cycle 'one', 'two', 'three' %}
{% cycle 'one', 'two', 'three' %}
```
输出
```s
one
two
three
one
```
cycle 的使用场景包括：

对表格中的奇数／偶数行输出相应的类（class）
在一行中的最后一列输出一个唯一的类（class）
**cycle (parameters)**

cycle 能够接受一个叫做 cycle group 的参数，以便满足你在模版中需要使用多个 cycle 代码块的情况。如果没有为 cycle group 命名，那么将会假定带有相同参数的 cycle 调用属于同一个组（group）。


## 管道(pipe) 过滤器(Filters)

管道设计或者叫做流处理几乎在所有编程语言中都有各具特色的实现，比如Java中的 `Stream`，bash中的 `|` `>` ，C++ 中的 `>>` `<<`。
在Liquid中，过滤器担当的就是这个角色，你可以在Liquid脚本中看到许多 `|` 符号，这就是过滤器的应用，在Liquid中使用得十分广泛。

输入

`{{ "adam!" | capitalize | prepend: "Hello " }}`

输出

`Hello Adam!`

---

## **关键字：**
### **特殊值**  
  **nil**
  **true**
  **false**

  **assign**

  **capture**
    属于tags 


### **流程控制**  
  **for** ... **in**  ...  ... **endfor**
    参数：
      - **limit** - 限定循环体执行次数 例如：`{% for item in array limit:2 %}`
      - **offset** - 从指定的索引开始执行 例如：`{% for item in array offset:2 %}`
      - **range** - 指定循环范围 例如：`{% for i in (3..5) %}`
      - **reversed** - 倒序循环 例如：`{% for item in array reversed %}`
    跳出控制、辅助命令：
      - **break** ：立即终止for循环
      - **continue** :跳出本次循环体
      - **cycle**：周期性输出 例如：`{% cycle 'one', 'two', 'three' %}` 第一次循环时输出 one，第三次输出three。
        - 参数：**cycle group** ： `{% cycle 'group': 'one', 'two', 'three' %}`
    迭代时参数：
      - **forloop.first** boolean 是否为第一项
      - **forloop.index** number 从1开始的下标值
      - **forloop.index0** number 从0开始的下标值 `= forloop.index - 1`
      - **forloop.last** boolean 是否为最后一项
      - **forloop.length** number 循环长度
      - **forloop.rindex** number 逆序下标 `= forloop.length - forloop.index`
      - **forloop.rindex0** number 逆序下标 `= forloop.length - forloop.index -1`
  **if** ... **else** ... **elseif** ... **endif**
  **unless** ... **endunless** : 效果相当于一个默认否定的if语句
  **case** ... **when**
### **生成命令**  
  **tablerow** ... **endtablerow** ：生成表格，请手动添加`<table></table>`标签包裹。
    - **cols** - 定义表格列数 例如：`{% tablerow product in collection.products cols:2 %}`
    - **limit** - 生成指定条数后退出 例如：`{% tablerow product in collection.products cols:2 limit:3 %}`
    - **offset** - 从指定下标开始 例如：`{% tablerow product in collection.products cols:2 offset:3 %}`
    - **[range]** - 范围循环 例如：`{% tablerow i in (1..90) %}`
  **date** - 获取当前日期、时间
### **过滤器**  
  **字符串**  
  **capitalize**
  (https://shopify.github.io/liquid/filters/compact/)
  append  `{{ "/my/fancy/url" | append: ".html" }}`
  concat
  remove  从字符串中 **查找并删除**指定的子串
  truncatewords 长句缩短，保留前n个字符 例如：`{{ "Ground control to Major Tom." | truncatewords: 3 }}` -> `Ground control to...`

### **数组操作**  
  uniq  
  compact 从数组中过滤掉全部`nil`项目 [usages of compat]

### **数值操作**  
  abs 绝对值
  at_least  至少
  at_most 至多
  ceil  天花板，设置上限
  plus  加
  minus 减
  modulo  求余
  round 四舍五入

### **通用工具**  
  map arrays 提取公共属性 `{% assign all_categories = (site.pages | map: "category") %}` all_categories包含了所有page的category信息。
  default 变量为 `nil` `false` `[empty]` 时的**默认值**
  size  可以当做filter来使用，也可以使用array.size。`{% if site.pages.size > 10 %}` `{{ my_array | size }}`
  times

  split
  divided_by
  
  url_decode
  url_encode

  downcase
  upcase


## **五大数据类型**
    **String** ：将变量的值包裹在单引号或双引号之间就相当于声明了一个字符串值。
    **Number** ：包括浮点数和整数，浮点数不需要额外标记，直接书写即可。
    **Boolean** ：只有两个值 true 和 false。如果你为他们加上引号，得到的将会是字符串！
    **Nil** ：
        - nil是未声明变量的默认值
        - 输出 nil 将会得到空文本（并不意味着 nil == ""）
        - 条件判断中nil和false效果一致。
    **Array** :
        - 使用 for ... in ... 来遍历数组
        - 使用 `[x]` 来访问数组中第x个对象，例如 {{ site.users[3] }}
        - 你无法只通过 Liquid 语法初始化一个数组。然而，你可以利用 split 过滤器将一个字符串分割为一个子字符串数组。

## **细节问题**

  1. **空白符剔除**
  在 Liquid 模版中，你可以将连字符放在标记（tag）中，例如 {{-、-}}、{%- 和 -%}，用于将标记（tag）渲染之后的输出内容的左侧或右侧的空拍符剔除。
  **输入**
  {% assign username = "John G. Chalmers-Smith" %}
  {% if username and username.size > 10 %}
    Wow, {{ username }}, you have a long name!
  {% else %}
    Hello there!
  {% endif %}
  **不做空白符控制的输出**
  <br>
  <br>
  <br>
    Wow, John G. Chalmers-Smith, you have a long name!
  <br>

  **输入**
  {%- assign username = "John G. Chalmers-Smith" -%}
  {%- if username and username.size > 10 -%}
    Wow, {{ username }}, you have a long name!
  {%- else -%}
    Hello there!
  {%- endif -%}
  **带有空白符控制的输出**
  Wow, John G. Chalmers-Smith, you have a long name!
  
  2.缩进
    Liquid 不注重空白符，所以缩进与不缩进按照你的编码习惯来就可以。





# Jekyll 特定语法

### 其他 & 扩展

#### **tags**  
- post_url
- link
- `include <included_fn> param1=value1 p2=v2 ... `: 引用一个文件，可以附加参数
    例如： 下列语句包含了五个参数：`url`,`max-width`,`file`,`caption`,`alt`
      要在引用这些参数，在`被引文件`中可以使用`include.url`，`include.max-width`..来引用参变量。
      例如：
    ```
    {% include image.html url="http://jekyllrb.com"
    max-width="200px" file="logo.png" alt="Jekyll logo"
    caption="This is the Jekyll logo." %}
    ```

- include_relative 
- highlight ruby 

#### **Filters**  
- absolute_url
- relative_url
- strip_index

### 重要变量

[全局变量](https://jekyllrb.com/docs/variables/)
  - **site** 全站变量
    - **site.time** 网站构建时间
    - **site.pages** 所有网页的数组
    - **site.posts** 时间顺序排列的post
    - **site.related_posts** 最多10个相关联的post，
    - **site.static_files**
    - **site.html_pages**
    - **site.collections** collection数组
    - **site.data** `_data`目录中的yaml文件数据
    - **site.documents** 所有文件
    - **site.category.CATEGORY** 属于`CATEGORY`的所有post
    - **site.tags.TAG** 属于`TAG`的所有post
    - **site.url** 网站的root url
    - **site.[var_name]** 定义在`_config.yml`中的变量
  - page 当前网页 `页面`
    - **page.content** 页面内容
    - **page.title** 页面标题
    - **page.excerpt** **原始文本**摘要
    - **page.url** html文件路径，`/`开头，e.g. `/2008/12/14/my-post.html`
    - **page.date** post的日期，可以通过头部信息来指定日期，格式YYYY-MM-DD HH:MM:SS
    - **page.id** collection或者post数组中的一个唯一id，例如`/2008/12/14/my-post /my-collection/my-document`
    - **page.tags** 当前页面的tags
    - **page.category** 当前页面所属category，jekyll会 **按照目录结构自动分类**，例如`/work/code/_posts/2008-12-24-closures.m` 至少会拥有`work` `code` 两个分类。
    - **page.path** 当前page的源文件
    - **page.next** 下一页面，尾部返回`nil`
    - **page.previous** 上一个页面，头部返回`nil`
    - **page.[var_name]** 定义在post头部的变量
  - **layout** layout信息 + **头部信息**
  - **content** **仅仅在layout中定义**，post或者page的内容
  - **paginator** 页码标识器，仅仅适用于index页面，也就是 **首页**
    - **paginator.per_page** 每一page的post数量
    - **paginator.posts** **本页内**的post数组
    - **paginator.total_posts** post总数
    - **paginator.total_pages** page总数
    - **paginator.page** 当前 **页码**
    - **paginator.previous_page** 前一页的page **页码**
    - **paginator.previous_page_path** 前一页的path
    - **paginator.next_page** 后一页的 **页码**
    - **paginator.next_page_path** 后一页的path


### **content**
  content is a special variable which has the value of the rendered content of the page its called on.

### site
```ruby
module Jekyll
  class Site
    attr_reader   :source, :dest, :config
    attr_accessor :layouts, :pages, :static_files, :drafts,
                  :exclude, :include, :lsi, :highlighter, :permalink_style,
                  :time, :future, :unpublished, :safe, :plugins, :limit_posts,
                  :show_drafts, :keep_files, :baseurl, :data, :file_read_opts,
                  :gems, :plugin_manager, :theme

    attr_accessor :converters, :generators, :reader
    attr_reader   :regenerator, :liquid_renderer, :includes_load_paths
```

  
### page

这是默认的文档内容，主要在layout中引用这个属性。
如`{{ page.content }}`会将整个文档内容包含到当前位置。
你也可以使用yaml头来定义属性，例如
```yaml
---
title: 文章标题
---
```
然后再Layout中来使用， 下例显示了文章标题。
```html
<h1>{{ page.title }}</h1>
```

```ruby
module Jekyll
  class Page
    include Convertible

    attr_writer :dir
    attr_accessor :site, :pager
    attr_accessor :name, :ext, :basename
    attr_accessor :data, :content, :output
```

### layout

```ruby
module Jekyll
  class Layout
    include Convertible

    attr_reader 
     :site,  # Gets the Site object.
     :name,  # Gets the name of this layout.
     :path,  # Gets the path to this layout.
     :relative_path,  # Gets the path to this layout relative to its base
    attr_accessor 
     :ext,  # Gets/Sets the extension of this layout.
     :data,  # Gets/Sets the Hash that holds the metadata for this layout.
     :content,  # Gets/Sets the content of this layout.
```

### theme

```ruby
module Jekyll
  class Theme
    extend Forwardable
    attr_reader :name
    def_delegator :gemspec, :version, :version
```


### url

```ruby
    # options - One of :permalink or :template must be supplied.
    #           :template     - The String used as template for URL generation,
    #                           for example "/:path/:basename:output_ext", where
    #                           a placeholder is prefixed with a colon.
    #           :placeholders - A hash containing the placeholders which will be
    #                           replaced when used inside the template. E.g.
    #                           { "year" => Time.now.strftime("%Y") } would replace
    #                           the placeholder ":year" with the current year.
    #           :permalink    - If supplied, no URL will be generated from the
    #                           template. Instead, the given permalink will be
    #                           used as URL.
    # Examples
    #     :template => /:categories/:title.html",
    #     :placeholders => {:categories => "ruby", :title => "something"}
```
### excerpt 

摘要。

```ruby
module Jekyll
  class Excerpt
    extend Forwardable

    attr_accessor :doc
    attr_accessor :content, :ext
    attr_writer   :output

    def_delegators :@doc, :site, :name, :ext, :extname,
                          :collection, :related_posts,
                          :coffeescript_file?, :yaml_file?,
                          :url, :next_doc, :previous_doc
```

### document

```ruby
module Jekyll
  class Document
    include Comparable
    extend Forwardable

    attr_reader :path, :site, :extname, :collection
    attr_accessor :content, :output

    def_delegator :self, :read_post_data, :post_read
```

