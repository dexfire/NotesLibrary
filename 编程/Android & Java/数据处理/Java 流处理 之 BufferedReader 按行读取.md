---
title: Java 流处理 之 BufferedReader 按行读取
category: Java
tags:
  - Java
  - 流处理
  - BufferedReader
---

# Java 流处理 之 BufferedReader 按行读取

```java
BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(),"UTF-8"));
StringBuilder sb = new StringBuilder();
String line = reader.readLine();
if (line!=null){
    sb.append(line).append("\n");
    line = reader.readLine();
}
Content  = sb.toString();
```