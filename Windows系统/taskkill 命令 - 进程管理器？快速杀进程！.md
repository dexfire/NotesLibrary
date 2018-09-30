---
title: taskkill 命令 - 进程管理器？快速杀进程！
category: Windows使用经验
tags:
    Windows
    cli
    杀进程
---

# taskkill 命令 - 进程管理器？快速杀进程！

如果你一直是用 Windows 任务管理器来杀进程，就会发觉它有多么低效了：  
打开 `taskmgr.exe` ，读取进程信息。如果电脑卡顿可能要延迟好久窗口才出来。  
找进程名，kill！如果刷新频率较高，可能还会跳来跳去，Windows 10的话还会用窗口标题来代替进程名，难以找到。

## 但是，如果你知道进程名的话...

`cmd` 开命令行窗口。  
`taskkill /f /im '<task name>'` 搞定。