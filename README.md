# ExportJS
`ExportJS`可以将`JS`中的数组对象输出成`CSV`文件，解决了`CSV`的中文编码问题，常见的转码问题。

## 兼容性
提供了一个专门检查当前浏览器是否兼容`ExportJS`的API`ExportJS.support()`会返回一个`Boolean`，推荐在后台管理系统中使用。
Safari、Firefox、Chrome新版均能够支持。

## 安装
```
npm install exportjs
```

## 使用方式

### 传统方式 (UMD)
可以通过script标签直接引入:

```html
<script src="path/to/exportjs.js"></script>
<script>
  ExportJS.toCSV({
    // options...
  });
</script>
```

### ES6 模块方式
现在支持ES6模块导入，可以只导入需要的函数:

```javascript
// 导入整个库
import ExportJS from 'exportjs';
ExportJS.toCSV({
  // options...
});

// 或者只导入需要的函数
import { toCSV, support } from 'exportjs';
toCSV({
  // options...
});
```

## API

### toCSV

#### 参数说明

##### el (DOM Element)
设置`a`标签的`href`和`download`属性，随后点击`a`标签就会激发下载

##### fileName (String)
设置下载的`CSV`文件名，默认为**data.csv**

##### auto (Boolean)
是否自动启动下载，默认为**true**

##### mime (String)
导出文件的`mime`，默认为**data:text/csv;charset=utf-8;**

##### columns (Array)
导出文件的标题，以及对应的`data`的属性值，示例:

- title: 标题
- key: 对应`data`里面的属性名

```js
[
    { title: 'ID', key: 'id' },
    { title: '名称', key: 'name' },
    { title: '年龄', key: 'age' },
]
```

##### data (Array)
导出数据的对象数组，其中对象的属性名和`columns`里面的`key`值对应

#### 示例

```js
ExportJS.toCSV({
  columns: [
    { title: 'ID', key: 'id' },
    { title: '名称', key: 'name' },
    { title: '网址', key: 'url' },
  ],
  data: [
    { id: 1, name: '腾讯', url: 'http://qq.com' },
    { id: 2, name: '网易', url: 'http://163.com' },
  ]
});
```

##### 导出效果预览

![exportjs-mac](http://oap12gnk8.bkt.clouddn.com/exportjs-mac.png)