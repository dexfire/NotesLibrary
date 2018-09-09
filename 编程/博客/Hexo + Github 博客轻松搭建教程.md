# Hexo 安装

`npm install hexo-cli -g`

## Hexo 初始化

`hexo init`  
这样hexo环境就ok了，我们使用 `hexo server` 就可以启动hexo本地服务，浏览器打开`https://localhost:4000`就可以预览效果了。  

## 切换主题

默认的主题是`landscape`，本人并不很喜欢，可以在[hexo themes](https://hexo.io/themes)预览主题样式，选择一个喜欢的样式clone到你的博客目录下的`themes`文件夹下，然后修改`_config.yml`中的 `theme` 键值为你的主题文件夹名称即可。

## 写博客

可以使用 `hexo new "blog_name"` 来创建一篇新的博客

## 将博客部署到github

github官方的博客是jekyll格式，hexo并不受github原生支持，所以我们需要一点手段才可以用好github这个平台。
一个不错的方案是使用静态网页，刚刚好hexo就是用来生成静态网页的，因此我们只需要使用`hexo build`来构建静态网页目录，然后将静态网页内容放到github上去即可。这个操作看起来并不复杂，但是我们需要一个更简单的操作方法，那么，hexo-deploy-git这个插件就是为这个目的而生的。

### 使用npm安装hexo-deploy-git

`npm install hexo-deploy-git -g -save-dev`

### 配置_config.yml中的 deploy 字段

```yml
deploy:
 type: git
 repository: git@github.com:<github_username>/<project_name>
 branch: master
```

### 使用 hexo 部署 blog

`hexo deploy -g`