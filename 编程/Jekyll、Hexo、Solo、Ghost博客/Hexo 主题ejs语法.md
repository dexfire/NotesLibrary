---
title: Hexo 主题 ejs 语法
---
## tags

#### body

`<%- body %>`
    在layout中引用文章的`本体`。

#### partial(string filename, params, addition_params)

`<%- partial('_partial/sidebar', null, {cache: !config.relative_link}) %>`
    包含一个文件。
hexo中的这个命令的好处在于，它可以直接传递变量参数，而jekyll只能传递本地参数。
