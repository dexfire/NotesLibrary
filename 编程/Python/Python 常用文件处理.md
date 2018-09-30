---
---
# Python 常用文件操作

1. 当前执行的py文件路径(raw)
    `print sys.argv[0]`
2. 当前工作路径 
    `print os.path.abspath('.')`
3. 当前工作路径
    `print os.path.abspath(os.curdir)`
4. 改变工作路径
    `os.chdir(path)`

## 真文件操作

1. 打开文件
    `fp = open(path)`
2. 关闭文件
    `fp.close()`
