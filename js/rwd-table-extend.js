/**
 * rwd-table-extend.js
 * A RWD-based html table extend tool which made by pure JavaScript and CSS
 * see: https://github.com/sean1093/html-rwd-table for details
 * @version: v1.0.4-dev
 * @author: Sean Chou
 * @licensed: under MIT (https://github.com/sean1093/html-rwd-table/blob/master/LICENSE)
 */

(function () {
    "use strict";
    
    var _nullable = function(v, t) { // variable, target
        return v !== null && v !== undefined ? v : t;   
    };

    //public 
    var rwdTableExtend = function(divId) {
        this.divId = divId;
        this.div = document.getElementById(divId);
        this.table = null;
    };

    //const
    rwdTableExtend.TYPEDiv = "div";
    rwdTableExtend.TYPETable = "table";
    rwdTableExtend.REDCircle = "red_circle";
    rwdTableExtend.GREENCircle = "green_circle";
    rwdTableExtend.BORDERTop = "border_top";
    rwdTableExtend.BORDERBottom = "border_bottom";
    rwdTableExtend.BORDERLeft = "border_left";
    rwdTableExtend.BORDERRight = "border_right";
    rwdTableExtend.ALIGNLeft = "left";
    rwdTableExtend.ALIGNRight = "right";
    rwdTableExtend.ALIGNCenter = "center";

    //method
    rwdTableExtend.prototype.initTable = function(type, flag) {
        // default type: table, auto view: false
        console.log("[rwd-table-extend] initTable");
        type = type || rwdTableExtend.TYPETable;
        if(type == rwdTableExtend.TYPETable) {
            this.table = document.createElement("table");
            this.table.id = "rwd-table_" + Date.now();
            this.table.className = "rwd-table";
            this.thead = document.createElement("thead");
            this.tbody = document.createElement("tbody");
            this.table.appendChild(this.thead);
            this.table.appendChild(this.tbody); 
            this.div.appendChild(this.table);
            this.rows = null;
            this.rowCount = 0;
            this.titleRowCount = 0;
            this.columnCount = 0;
            if(flag) this.setAutoView();           
        }
    };
    rwdTableExtend.prototype.setSize = function(height, width) {
        this.table.style.height = height;
        this.table.style.width = width !== undefined ? width : "100%";
    };
    rwdTableExtend.prototype.setAutoView = function() {
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = "@media screen and (max-width: 451px) {"+
        ".rwd-table tr {border: 1px solid #DDDDDD;}"+
        ".rwd-table th {display: none;}"+
        ".rwd-table td {display: block; border: none; text-indent: 10px;}"+
        ".rwd-table td:before {content: attr(data-th) ''; float: left; font-weight: bold; color: #2196F3;}}";
        document.body.appendChild(css);
        console.log("[rwd-table-extend] setAutoView: true ");
    };
    rwdTableExtend.prototype.addTableHead = function(idx, array) {     
        var hRow = this.thead.insertRow(idx);
        var count = 0;              
        for(var idx in array){
            var header = document.createElement("th");
            header.innerHTML = array[idx];
            hRow.appendChild(header);
            count ++;
        }
        this.titleLength = count;
        console.log("[rwd-table-extend] addTableHead"); 
    };
    rwdTableExtend.prototype.updateHead = function(idx, array) {
        if(this.thead === undefined || this.thead === null) {
            console.error("[rwd-table-extend] Please add table header first!");
        }
        else {
            var hRow = this.thead.deleteRow(idx); 
            this.addTableHead(idx, array);
        }
    };
    rwdTableExtend.prototype.addDatas = function(source, editable, locate) { // data{}/[{},...{}], editable, row index
        var rowIdx = locate ? locate : this.tbody.rows.length;
        var length = Array.isArray(source) ? source.length : 1;
        for(var i = 0; i < length; i++) {
            var dRow = this.tbody.insertRow(rowIdx);
            var idx = 0;
            var data = Array.isArray(source)? source[i]: source;
            for(var key in data){                  
                var cell = dRow.insertCell(idx); 
                var div = document.createElement("div");
                div.className += ' cell';
                if(typeof data[key] == "object") {
                    var t = document.createTextNode(data[key].value);
                    div.appendChild(t);
                    div.style.color = _nullable(data[key].foreColor, "black");
                    div.style.background = _nullable(data[key].background, "white");
                    div.style.fontSize = _nullable(data[key].fontSize, "none");
                    div.style.fontFamily = _nullable(data[key].fontFamily, "none");
                    div.style.textAlign = _nullable(data[key].textAlign, rwdTableExtend.ALIGNLeft);
                }
                else if(data[key] == rwdTableExtend.REDCircle) {                    
                    div.className += ' red-circle';
                }
                else if(data[key] == rwdTableExtend.GREENCircle) {
                    div.className += ' green-circle';
                }
                else {
                    var text = document.createTextNode(data[key]);
                    div.appendChild(text); 
                } 
                cell.appendChild(div);                
                cell.setAttribute("data-th", key);
                cell.setAttribute("contenteditable", editable ? editable : false);
                idx ++;
            }
            rowIdx ++;                
        }
    };
    rwdTableExtend.prototype.addRowDatas = function(idx, data, editable) {     
        var length = this.getColumnCount();
        var row = this.tbody.insertRow(idx);
        for(var i = 0; i < length; i++) {
            var cell = row.insertCell(i);
            var div = document.createElement("div");
            var text = document.createTextNode(_nullable(data[i],""));
            div.appendChild(text);
            div.className += ' cell'; 
            cell.appendChild(div);
            cell.setAttribute("data-th", i);
            cell.setAttribute("contenteditable", editable ? editable : false);
        }
    };
    rwdTableExtend.prototype.deleteRow = function(idx, count) {
        count = count ? count : 1;
        while(count>0){
            this.tbody.deleteRow(idx);
            count--;  
        }        
    };
    rwdTableExtend.prototype.insertRow = function(idx, count, editable) {
        count = count ? count : 1;
        while(count>0){
            var dRow = this.tbody.insertRow(idx);
            for(var i = 0; i < this.titleLength; i++){                
                var cell = dRow.insertCell(i);
                cell.setAttribute("contenteditable", editable ? editable : false);     
            }            
            count--;  
        }        
    };
    rwdTableExtend.prototype.hideContent = function(key) {
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = "@media screen and (max-width:451px) { #"+this.table.id+" td[data-th='"+key+"'] { display: none; }}";
        document.body.appendChild(css);
    };
    rwdTableExtend.prototype.fixHeader = function() {
        this.div.addEventListener("scroll", function(){
            var translate = "translate(0,"+this.scrollTop+"px)";
            this.querySelector("thead").style.transform = translate;
        });
        this.div.style.overflow = "auto";
        this.div.style.height = this.div.style.height !== undefined ? this.div.style.height : "300px"
    };



    //get info
    rwdTableExtend.prototype.getColumnCount = function() {      
        this._updateColumnCount();
        return this.columnCount;
    };
    rwdTableExtend.prototype.getRowCount = function() {       
        this._updateRowCount();
        return this.rowCount;
    };
    rwdTableExtend.prototype._updateRowCount = function() { 
        this.rows = this.tbody.rows; // update now row 
        this.rowCount = this.rows.length;        
    }
    rwdTableExtend.prototype._updateColumnCount = function() { 
        this.titleRowCount = this.thead.rows.length;
        for(var i = 0; i<this.titleRowCount ; i++) {
            this.columnCount = this.table.rows[i].cells.length > this.columnCount ? this.table.rows[i].cells.length : this.columnCount;
        }       
    }

    //style
    rwdTableExtend.prototype.setHeaderBackColor = function(headerIdx, color) {
        var rows = this.thead.rows;
        rows[headerIdx].style.background = color;
    };
    rwdTableExtend.prototype.setRowBackColor = function(rowIdx, color) {
        var rows = this.tbody.rows;
        rows[rowIdx].style.background = color;
    };
    rwdTableExtend.prototype.setHeaderTextColor = function(headerIdx, color) {
        var rows = this.thead.rows;
        rows[headerIdx].style.color = color;
    };
    rwdTableExtend.prototype.setRowBorder = function(rowIdx, locate, color) {
        this.rows = this.tbody.rows;
        if(locate == rwdTableExtend.BORDERTop) {
            this.rows[rowIdx].style.borderTop = "1px solid "+_nullable(color,"black");
        }
        else if(locate == rwdTableExtend.BORDERBottom) {
            this.rows[rowIdx].style.borderBottom = "1px solid "+_nullable(color,"black");
        }
    };
    rwdTableExtend.prototype.setHeaderBorder = function(headerIdx, locate, color) {
        this.rows = this.thead.rows;
        if(locate == rwdTableExtend.BORDERTop) {
            this.rows[headerIdx].style.borderTop = "1px solid "+_nullable(color,"black");
        }
        else if(locate == rwdTableExtend.BORDERBottom) {
            this.rows[headerIdx].style.borderBottom = "1px solid "+_nullable(color,"black");
        }
    };
    rwdTableExtend.prototype.setColBorder = function(colIdx, locate, color, withTitle) {
        this.rows = this.table.rows;
        for(var i = 0; i< this.rows.length; i++){
            if(!withTitle && i === 0) continue;
            var cell = this.rows[i].childNodes;
            if(locate == rwdTableExtend.BORDERLeft) {
                cell[colIdx].style.borderLeft = "1px solid "+_nullable(color,"black");
            }
            else if(locate == rwdTableExtend.BORDERRight) {               
                cell[colIdx].style.borderRight = "1px solid "+_nullable(color,"black");
            }
        }
    };
    rwdTableExtend.prototype.tableConfig = function(config) {
        console.warn("[rwd-table-extend] tableConfig() need to be the last function.");
        if(config.border) {
            var rows = this.table.rows;
            for(var i = 0; i< rows.length; i++) {        
                rows[i].style.borderTop = "1px solid "+ _nullable(config.borderColor,"black");               
                if(i == rows.length-1){
                    rows[i].style.borderBottom = "1px solid "+ _nullable(config.borderColor,"black"); 
                }
                var cells = rows[i].cells;
                for(var j = 0; j<cells.length; j++) {
                    cells[j].style.borderLeft = "1px solid "+ _nullable(config.borderColor,"black");
                    if(j == cells.length-1){
                        cells[j].style.borderRight = "1px solid "+ _nullable(config.borderColor,"black"); 
                    }
                }
            }
        }
    };


    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
        module.exports = rwdTableExtend;
    else
        window.rwdTableExtend = rwdTableExtend;
})();
