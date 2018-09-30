---
---

# 校园网免流

## 最终目的：校园网免验证联网

如题。

## 条件

- 可以访问本地内网的电脑（待认证状态）
- 一台服务器
- 一个一级域名（**需要有自定义NS记录的权限**）

## 理想结果

- 上传128kb/s 下载300kb/s

## 原理

学校校园网，wifi没有密码，进去之后需要drcom web认证，然而这时候我们ping一下外网，发现**域名是可以正常解析的**，那么是不是53端口开放呢？  
很遗憾，答案是否定的。怎么证明呢？我们看了一下默认dns为`202.202.0.30`，是一个内网。从道理上讲也是说得通，直接开放53端口破解就太容易了，只要通过53端口开一个udp代理（OpenVPN）不就直接绕过验证了吗？

那么怎么解决这个问题呢？  
用dns的转发！！ ：发送`伪装dns解析请求`，让本地dns服务器转发dns请求到我们`伪装的dns服务器S`，服务器S解开伪装dns，获得原始请求数据，处理数据，再`将结果伪装成一个dns请求响应`，顺原路径发回我们的请求主机，完成一次请求。

### dns解析原理

原理：DNS转发。
简明解释：dns先由本地dns服务器，也就是你的tcp/ip配置中指定的那个dns来解析，如果我们向它请求一个非本地网域域名，它就会被转发，转发规则从右到左按层级逐层指定转发服务器，而我们的目的在于最终将解析请求发送到我们事先准备好的一台服务器

- 一个`dns域名服务器`只能解析自己网域的域名。
    这很容易理解：你拥有一个一级域名 `domain.cn` ，你就有权利自定义类似于 `*.domain.cn` 的任何子域名，也只有你才有权力这样做，而这些域名的解析你可以直接在你的域名提供商（百度、腾讯、阿里、亚马逊等）那里都可以通过添加`A记录`来解决，还有一种途径就是通过添加一个`NS记录` 来重定向到你指定的域名解析服务器。
- 自根域名向底层域名层层解析
    一个域名的解析是一个字段一个字段来解析的，顺序是从根向顶的顺序，或者通俗一点说是`自右向左的解析顺序`，  
    例如 `api.github.com` 的解析过程为（忽略dns缓存）：  
    1. 向本地域名服务器查询：在本地网域内则直接`返回`
    2. 向`.com`的域名服务器请求解析`api.github`记录：如果有A记录则直接`返回`,没有A记录的话进行步骤3
    3. `.com`的域名服务器转发解析请求至`api.github`指定的域名解析服务器（设它为`ns1.github.com`）：这时解析请求被转发到了`ns1.github.com`
        注：（`.com`是根域名服务器之一）  

### **方案一：dns2tcp**

实测通过，网速平均 36kb/ 峰值 70kb/s

**域名配置：**  
    假设有一级域名a.com  
1. 新建一个二级域名NS记录`con.a.com`，指向DNS服务器`dns.a.com`： `con.a.com` NS `dns.a.com`  
    意为：`con.a.com` 的IP由 域名服务器`dns.a.com` 来指定。  
2. 新建一个A记录`dns.a.com`，指向你的服务器ip：`dns.a.com` A `223.104.251.x`

**服务器端：**  
    启动服务daemon。
1. 安装dns2tcpd： `sudo apt install dns2tcpd`
2. 修改配置 `/etc/dns2tcpd.conf`:
    ```conf
    listen = 0.0.0.0
    port = 53
    # If you change this value, also change the USER variable in /etc/default/dns2tcpd
    user = nobody
    chroot = /tmp
    domain = dns.mathwiki.work
    resources = ssh:127.0.0.1:22 , smtp:127.0.0.1:25
    ```
3. 启动监听服务： `dns2tcpd -f`  
    注： 使用 `sudo netstat -apn` `sudo kill <pid>` 来处理端口占用

**客户端**
    被限制上网的计算机。
1. 安装dns2tcpc， [Windows 版本](https://source.qiuri.org/usr/uploads/2017/09/2864413989.zip) ，Linux `sudo apt install dns2tcp`  
2. 启动连接 `.\dns2tcpc.exe -r ssh -z dns.mathwiki.work 132.232.27.95 -l 8888 -d 0 &`
3. 使用 `xshell` 建立ssh代理
    - 会话：`127.0.0.1:8888`
    - 代理：`Dynamic 1080`
4. 配置浏览器/系统全局代理： `127.0.0.1:1080`
