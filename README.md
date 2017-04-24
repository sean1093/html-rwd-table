# html-rwd-table
A RWD-based html table extend tool which made by pure JavaScript and CSS, you don't need to add any other dependency libaraies.

* demo:
http://sean1093.github.io/demo/rwd-table-extend/rwd-table.html
![rwd-table](https://github.com/sean1093/html-rwd-table/blob/master/img/rwd-table.png "rwd-table")

### Getting Started:
When you want to use RWD html table extension, you need to include both CSS file and JavaScript file.

```html
<link href="http://sean1093.github.io/lib/css/rwd-table-extend/1.0.3/rwd-table-extend.min.css" rel="stylesheet">
<script src="http://sean1093.github.io/lib/js/rwd-table-extend/1.0.3/rwd-table-extend.min.js"></script>
```


#### Create Container
First, you need to create a <code>div</code> with id.

```html
<div id="myTable"></div>
```


#### Initial RWD Table
Then, create <code>rwdTableExtend</code> object and initial table. 

```js
var myTable = new rwdTableExtend("myTable");
myTable.initTable(setAutoView);
```

You can give a boolean value "setAutoView" to decide set auto change view when small device or not. 
![setAutoView](https://github.com/sean1093/html-rwd-table/blob/master/img/setAutoView.png "setAutoView")

#### Setting Your Header 
You need to insert an array for your header.

```js
myTable.addTableHead(['ID','Name', 'Number', 'Class', 'Address']);
```
or 

```js
var header = ['ID','Name', 'Number', 'Class', 'Address'];
myTable.addTableHead(header);
```

#### Add Data

```js
/**
 * addDatas
 * @param {object/object[]} source: data source
 * @param {boolean} editable: cell editable or not
 * @param {number} locate: row index
 * @return {null}
 */
rwdTableExtend.addDatas(source, editable, locate)
```

We use the concept of data binding, the data source will auto mapping your header. Therefore, when you want to add table data, you need to define a schema JSON mapping your header like this:
```js
var dataSource = 
{
    "ID": "test1",
    "Name": "Tom",
    "Number":234,
    "Class": "A",
    "Address": "Taiwan, Taipei"
};
myTable.addDatas(dataSource);          
```

You also can use an array of JSON data source:
```js
var dataSource = [
    {
        "ID": "test4",
        "Name": "BBB",
        "Number":2222,
        "Class": "A",
        "Address": "Taiwan, New Taipei"
    },
    {
        "ID": "test5",
        "Name": "AAA",
        "Number":55555,
        "Class": "A",
        "Address": "USA"
    }
];
myTable.addDatas(dataSource); 
```


If you want to insert with specific row index, you can give row index in third parameter. For example, insert data into row 5. 
```js
myTable.addDatas(dataSource, false, 5);        
```

#### Set Data Style
If you want to set cell style, you can give the object value when you add data:
(we only provide foreColor in v1.0.2, will increase in future version)
```js
var dataSource = {
    "ID": "test3",
    "Name": "AAA",
    "Number": { "value": -1, "foreColor": "red" },
    "Class": "A",
    "Address": "Taiwan, New Taipei"
};
```

#### Color Light
Sometimes, you will use light singal for some requirment, you can give these const in your value: (<code>rwdTableExtend.REDCircle</code> / <code>rwdTableExtend.GREENCircle</code>)
```js
var dataSource = {
    "ID": "test3",
    "Name": "AAA",
    "Number": { "value": -1, "foreColor": "red" },
    "Class": rwdTableExtend.GREENCircle,
    "Address": "Taiwan, New Taipei"
};
```


### Other API Function

#### Update Header 
After setting your header, you also can update header by using this function.

```js
myTable.updateHead(['ID','Name', 'Number', 'Class', 'Address']);
```
or 

```js
var header = ['ID','Name', 'Number', 'Class', 'Address'];
myTable.updateHead(header);
```


#### Set Header's Color
You can set header's text color and background color by using <code>setHeaderBackColor(color)</code> and <code>setHeaderTextColor(color)</code>
```js
myTable.setHeaderBackColor("white");
myTable.setHeaderTextColor("black");
```


#### Set Hide Column
If you want to let something unimportant columns hide when screen is small, use <code>hideContent(header-name)</code>
```js
myTable.hideContent("Address");
```


#### Delete Row
Delete row by using <code>deleteRow(row-index, delete-count)</code>
```js
/**
 * deleteRow
 * @param {number} idx: delete row start location
 * @param {number} count: number of rows you want to delete 
 * @return {null}
 */
myTable.deleteRow(idx, count);
```


#### Insert Row
Insert row by using <code>insertRow(row-index, insert-count, editable)</code>
```js
/**
 * insertRow
 * @param {number} idx: insert row start location
 * @param {number} count: number of rows you want to insert 
 * @param {boolean} editable: cell editable or not
 * @return {null}
 */
rwdTableExtend.insertRow(idx, count, editable);
```


#### Get Row Count
It will return table row count.
```js
/**
 * getRowCount
 * @return {number} return table row count
 */
rwdTableExtend.getRowCount();
```

#### Set Row Border

```js
/**
 * setRowBorder
 * @param {number} idx: column index
 * @param {const} locate: rwdTableExtend.BORDERTop /rwdTableExtend.BORDERBottom
 * @param {string} color: border's color (ex: "red")
 * @return {null}
 */
rwdTableExtend.setRowBorder(idx, locate, color);
```

#### Set Column Border

```js
/**
 * setColBorder
 * @param {number} idx: column index
 * @param {const} locate: rwdTableExtend.BORDERLeft /rwdTableExtend.BORDERRight
 * @param {string} color: border's color (ex: "red")
 * @param {boolean} withTitle: column border with title row or not
 * @return {null}
 */
rwdTableExtend.setColBorder(idx, locate, color, withTitle);
```


### Change Log
#### 1.0.3 
* Add new feature:
    + addRowDatas (by array of data)
    + data cell fontSize, fontFamily and textAlign
    + setRowBackColor
    + tableConfig

#### 1.0.2 
* Add new feature:
    + addDatas (multiple data)
    + data cell foreColor & background
    + setAutoView
    + getRowCount
    + setRowBorder
    + setColBorder 

#### 1.0.1 
* Add new feature


