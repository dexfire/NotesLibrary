# Android JSON Reader

tags： Android 数据处理 JSON

---

## JSON 文件格式

JSON 是 JavaScript 的 Obj 标记语言的简称，符合 RFC-4627 标准，其中包含字面量（strings,numbers,booleans,null）和 块状结构的数组和对象。  
JSON可以 **表达复杂的字面数据结构**  
但是这也带来了一大问题：**解析困难**。正因为JSON结构多样，创建的时候自然是十分方便。解析的时候则正相反，因为JSON是弱类型语言，所以我们在强类型语言中解析的时候就要判断其类型，甚至是记忆下其类型，然后根据id来对应其类型来解析。
array: 使用 `[]` 包裹(warp)的数据  
object: 使用 `{}` 包裹(warp)的数据

## 使用 Android JSON Reader 解析

JSON解析采用**深度优先顺序**(Depth-First Order)
**解析具体流程**：  

- array对象
  - 首先调用 `beginArray()` 通知 Reader 读取一个左括弧
    - 使用 `hasNext()` 方法判断是否有数据可读。
    - 使用 `nextName()` 方法来获取下一个数据的id，这 **不会**导致迭代器移动
    - 循环调用 `next<Type>()` 方法获取数据
    - 可以使用 `skipValue()` 方法来跳过数据
  - 当 `hasNext()` 返回 `false` 时，使用 `endArray()` 方法通知 Reader 跳过右括弧
- object对象
  - 首先调用 `beginObject()` 通知 Reader 读取一个左括弧
    - 使用 `hasNext()` 方法判断是否有数据可读。
    - 使用 `nextName()` 方法来获取下一个数据的id，这 **不会**导致迭代器移动
    - 循环调用 `next<Type>()` 方法获取数据
    - 可以使用 `skipValue()` 方法来跳过数据
  - 当 `hasNext()` 返回 `false` 时，使用 `endObject()` 方法通知 Reader 跳过右括弧
