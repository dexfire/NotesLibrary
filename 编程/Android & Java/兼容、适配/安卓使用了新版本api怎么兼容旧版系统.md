## 资源兼容性
资源兼容性Android已经考虑到了，只需要使用不同的文件夹即可
- 尺寸兼容
> mdpi，hdpi，xhdpi，xxhdpi，xxxhdpi，400dpi，sw720dp，w820dp
- 横竖屏兼容
> land
- 版本兼容
> v8，v17，v26
- 语言兼容
> cn，jp，en，br，pt-rBR，zh

## Java API兼容性
- 可以使用 Build.SDK_VERSION 进行分支处理。
- 对于旧版没有的东西，自己写代码实现或者放弃。