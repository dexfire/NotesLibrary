# Python向文件写入定长二进制数据
- 例如要向test_data.bin写入1024个0x00:
```python
file('test_data.bin','wb').write('\x00'*1024)
```
- 在文件 **末尾**再写入512个0x01
```python
file('test_data.bin','wb').write('\x01'*512)
```