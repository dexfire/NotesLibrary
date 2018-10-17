---
title: Java文件名排序 - Comparator
category: Java常用算法
tags:
  - 排序
  - 算法
  - 比较器
  - Comparator
---

# Java文件名排序 - Comparator

Java中常常需要对文件进行按某个顺序排序，一些常用顺序有`文件名` `修改日期` `大小` `创建日期`等，
这里按日期、大小排序都是好办的，直接比较数值即可，但是对于文件名排序来说我们需要花点心思。
不过还好，String有compareTo()方法。