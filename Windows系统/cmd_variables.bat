@echo off
echo 目录中有空格也可以加入""避免找不到路径

echo 当前盘符："%~d0"
echo 当前盘符和路径："%~dp0"
echo 当前批处理全路径："%~f0"
echo 当前盘符和路径的短文件名格式："%~sdp0"
echo 当前CMD默认目录："%cd%"

pause