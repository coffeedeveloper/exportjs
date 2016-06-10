# ExportJS
`ExportJS`可以将`JS`中的数组对象输出成`CSV`文件

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
    el: document.getElementById('xxoo'),
    columns: [
        { title: 'ID', key: 'id' },
        { title: '名称', key: 'name' },
        ],
    data: [
        { id: 1, name: '小明,ah'},
         { id: 2, name: '小红'},
    ]
});
```