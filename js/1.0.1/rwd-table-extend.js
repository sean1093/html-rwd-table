/**
 * rwd-table-extend.js
 * A RWD-based html table extend tool which made by pure JavaScript and CSS
 * see: https://github.com/sean1093/html-rwd-table for details
 * @version: v1.0.1
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
    rwdTableExtend.prototype.initTable = function() {
        this.table = document.createElement("table");
        this.table.id = "rwd-table_" + Date.now();
        this.table.className = "rwd-table";
        this.thead = document.createElement("thead");
        this.tbody = document.createElement("tbody");
        this.table.appendChild(this.thead);
        this.table.appendChild(this.tbody); 
        this.div.appendChild(this.table);
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
    rwdTableExtend.prototype.addDatas = function(data, locate) { // data, row index
        var rowIdx = this.tbody.rows.length;
        if(locate !== undefined || locate !== null) {
            rowIdx = locate;
        }
        var dRow = this.tbody.insertRow(rowIdx);
        var idx = 0;
        for(var key in data){
            var cell = dRow.insertCell(idx);    
            cell.innerHTML = data[key];
            cell.setAttribute("data-th",key);
            cell.setAttribute("contenteditable",true);
            idx ++;
        } 
    };
    rwdTableExtend.prototype.deleteRow = function(idx, count) {
        if(count === undefined) count = 1;
        while(count>0){
            this.tbody.deleteRow(idx);
            count--;  
        }        
    };
    rwdTableExtend.prototype.insertRow = function(idx, count, edit) {
        if(count === undefined) count = 1;
        console.log(this.titleLength);
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
