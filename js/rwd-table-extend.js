/**
 * rwd-table-extend.js
 * A RWD-based html table extend tool which made by pure JavaScript and CSS
 * see: https://github.com/sean1093/html-rwd-table for details
 * @version: v1.0.2
 * @author: Sean Chou
 * @licensed: under MIT (https://github.com/sean1093/html-rwd-table/blob/master/LICENSE)
 */

(function () {
    "use strict";
    
    //public 
    var rwdTableExtend = function(divId) {
        this.divId = divId;
        this.div = document.getElementById(divId);
        this.table = null;
    };
    //const
    rwdTableExtend.REDCircle = "red_circle";
    rwdTableExtend.GREENCircle = "green_circle";
    rwdTableExtend.prototype.initTable = function(flag) {
        console.log("[rwd-table-extend] initTable");
        this.table = document.createElement("table");
        this.table.id = "rwd-table_" + Date.now();
        this.table.className = "rwd-table";
        this.thead = document.createElement("thead");
        this.tbody = document.createElement("tbody");
        this.table.appendChild(this.thead);
        this.table.appendChild(this.tbody); 
        this.div.appendChild(this.table);
        if(flag) this.setAutoView();
    };
    rwdTableExtend.prototype.setAutoView = function() {
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = "@media screen and (max-width: 451px) {"+
        ".rwd-table tr {border: 1px solid #DDDDDD;}"+
        ".rwd-table th {display: none;}"+
        ".rwd-table td {display: block; border: none; text-indent: 10px;}"+
        ".rwd-table td:before {content: attr(data-th) ''; float: left; font-weight: bold; color: #2196F3;";
        document.body.appendChild(css);
        console.log("[rwd-table-extend] setAutoView: true ");
    };
    rwdTableExtend.prototype.addTableHead = function(array) {     
        var hRow = this.thead.insertRow(0);
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
    rwdTableExtend.prototype.updateHead = function(array) {
        if(this.thead === undefined || this.thead === null) {
            console.error("[rwd-table-extend] Please add table header first!");
        }
        else {
            var hRow = this.thead.deleteRow(0); 
            this.addTableHead(array);
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
                if(typeof data[key] == "object") {
                    console.log("object");
                    var t = document.createTextNode(data[key].value);
                    div.appendChild(t);
                    div.style.color = data[key].foreColor ? data[key].foreColor : "black";
                    div.style.background = data[key].background ? data[key].background : "white";
                }
                else if(data[key] == rwdTableExtend.REDCircle) {                    
                    div.className += 'red-circle';
                }
                else if(data[key] == rwdTableExtend.GREENCircle) {
                    div.className += 'green-circle';
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
    rwdTableExtend.prototype.deleteRow = function(idx, count) {
        count = count ? count : 1;
        while(count>0){
            this.tbody.deleteRow(idx);
            count--;  
        }        
    };
    rwdTableExtend.prototype.insertRow = function(idx, count, edit) {
        count = count ? count : 1;
        while(count>0){
            var dRow = this.tbody.insertRow(idx);
            for(var i = 0; i < this.titleLength; i++){                
                var cell = dRow.insertCell(i);
                if(edit) {
                    cell.setAttribute("contenteditable",true);
                }
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

    //set header
    rwdTableExtend.prototype.setHeaderBackColor = function(color) {
        this.thead.style.background = color;
    };
    rwdTableExtend.prototype.setHeaderTextColor = function(color) {
        this.thead.style.color = color;
    };

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
        module.exports = rwdTableExtend;
    else
        window.rwdTableExtend = rwdTableExtend;
})();
