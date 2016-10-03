/**
 * rwd-table-extend.js
 * A RWD-based html table extend tool which made by pure JavaScript and CSS
 * see: https://github.com/sean1093/html-rwd-table for details
 * @version: v1.0.0
 * @author: Sean Chou
 * Licensed under MIT (https://github.com/sean1093/html-rwd-table/blob/master/LICENSE)
 */

(function () {
	"use strict";
	
	//public 
	var rwdTableExtend = function(divId) {
		this.divId = divId;
		this.div = document.getElementById(divId);
	};
	rwdTableExtend.prototype.initTable = function() {
		var target = document.getElementById(this.divId);
		var table = document.createElement("table");
		table.id = "rwd-table";
		table.className = "rwd-table";
		var thead = document.createElement("thead");
		var tbody = document.createElement("tbody");
		table.appendChild(thead);
		table.appendChild(tbody);
		target.appendChild(table);	
	};
	rwdTableExtend.prototype.addTableHead = function(array) {
		this.table = document.getElementById("rwd-table");
		this.thead = this.table.getElementsByTagName('thead')[0];
        var hRow = this.thead.insertRow(0);              
        for(var idx in array){
            var header = document.createElement("th");
            header.innerHTML = array[idx];
            hRow.appendChild(header);
        }
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
    rwdTableExtend.prototype.addTableRow = function(data, locate) { // data, row index
    	this.table = document.getElementById("rwd-table");
        this.tbody = this.table.getElementsByTagName('tbody')[0];

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
            idx ++;
        } 
    };
    rwdTableExtend.prototype.deleteRow = function(idx) {
		document.getElementById("rwd-table").deleteRow(idx);
    };
    rwdTableExtend.prototype.hideContent = function(key) {
    	var css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = "@media screen and (max-width:451px) { .rwd-table td[data-th='"+key+"'] { display: none; }}";
		document.body.appendChild(css);
    };

	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    	module.exports = rwdTableExtend;
 	else
    	window.rwdTableExtend = rwdTableExtend;
})();
