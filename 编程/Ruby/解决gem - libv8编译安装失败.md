# 解决gem install libv8报错的问题
这个gem直接安装会下载源码进行编译，不管新版还是旧版都编译不过，旧版的因为有负数左移位语法不兼容新版GCC，新版则因为找不到python2报错，明明安装好了...

参考[StackOverFlow答案](https://stackoverflow.com/questions/27260199/libv8-3-16-14-3-fails-to-install-rails-4-1-8)

我用的命令是
```ruby
 gem install libv8 -v '3.16.14.19' -- --with-system-v8
```
安装直接通过，应该是下载的预编译版本。
