
# Python 网络访问基础

## 使用 requests 模块

特点：

    - 稳定、Bug少
    - 速度快
    - 无需关心细节

```python
import requests
url = 'http://***/test/demo.zip'
path = r'.\demo.zip'
res = requests.get(url)
fp = open(path,'wb')
fp.write(res.content)
```

## 方法一

```python
import urllib
import urllib2
import requests
print "downloading with urllib"
url = 'http://***/test/demo.zip'
print "downloading with urllib"
urllib.urlretrieve(url, "demo.zip")
```

## 方法二

```python
import urllib2
print "downloading with urllib2"
url = 'http://***/test/demo.zip'
f = urllib2.urlopen(url)
data = f.read()
with open("demo2.zip", "wb") as code:
code.write(data)
```

## 方法三：

```python
import requests 
print "downloading with requests"
url = 'http://***/test/demo.zip'
r = requests.get(url)
with open("demo3.zip", "wb") as code:
code.write(r.content)
```
