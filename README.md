# html-rwd-table
A RWD-based html table extend tool which made by pure JavaScript and CSS, you don't need to add any other dependency libaraies.

* demo: [rwd-table-extend demo]
[rwd-table-extend demo]: <http://sean1093.github.io/demo/rwd-table-extend/rwd-table.html>

### Getting Started:
When you want to use RWD html table extension, you need to include both CSS file and JavaScript file.

```html
<link href="http://sean1093.github.io/lib/css/rwd-table-extend/1.0.0/rwd-table-extend.css" rel="stylesheet">
<script src="http://sean1093.github.io/lib/js/rwd-table-extend/1.0.0/rwd-table-extend.min.js"></script>
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
myTable.initTable();
```

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
When you want to add table data, you need to define a schema JSON like this:
```js
var row1 = 
{
    "ID": "test1",
    "Name": "Tom",
    "Number":234,
    "Class": "A",
    "Address": "Taiwan, Taipei"
};
myTable.addTableRow(row1);          
```

If you want to insert with specific row index, you can give row index in second parameter. For example, insert data into row 5. 
```js
myTable.addTableRow(row1, 5);          
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


#### Set Hide Column
If you want to let something unimportant columns hide when screen is small, use <code>hideContent(header-name)</code>
```js
myTable.hideContent("Address");
```


#### Delete Row
Delete row by using <code>deleteRow(row-index)</code>
```js
myTable.deleteRow(1);
```




