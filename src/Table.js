module.exports = Table;

function Table () {
  this.headers = {}; // dict of headers by name
  this.cols = {}; // dict of cols by name of header
  this.noname = 0;
  this.currentRow = 0;
};

Table.prototype.header = function() {
  var header = '';
  for (var hdr in this.headers) {
    header += (header.length == 0) ? hdr : ',' + hdr;
  }
  return header;
};

Table.prototype.ncol = function() {
  var n = 0;
  for (var hdr in this.headers) {
    n++;
  }
  return n;
};

Table.prototype.nrow = function() {
  var collen = 0;
  for (var col in this.cols) {
    collen = Math.max(collen, this.cols[col].length);
  }
  return collen;
};

Table.prototype.get = function(row, col) {
  return this.cols[col][row];
};

Table.prototype.rowToCSVString = function(row) {
	if (row < 0 || row > this.nrow()) {
		return '';
	}
    var numcols = this.ncol() - 1;	
    var str = '';
    var colcount = 0;
    for (var hdr in this.headers) {
      var val = (this.cols[hdr][row] == undefined) ? '' : this.cols[hdr][row];
      var comma = (colcount++ < numcols) ? ',' : '';
      str += val + comma;
    }
    return str;
};

Table.prototype.findRow = function(what, col) {
  var res = [];
  var rows = this.cols[col];
  if (rows != null) {
    for (var i = 0; i < rows.length; i++) {
      if (rows[i].match(what)) {
        res.push(i);
      }
    }
  }
  return res;
};

Table.prototype.toCSVString = function() {
  var header = this.header();
  if (header.length == 0) {
    return '';
  }
  var strs = '';
  var numcols = this.ncol() - 1;
  var collen = this.nrow();
  for (var i = 0; i< collen; i++) {
    var str = '';
    var colcount = 0;
    for (var hdr in this.headers) {
      var val = (this.cols[hdr][i] == undefined) ? '' : this.cols[hdr][i];
      var comma = (colcount++ < numcols) ? ',' : '';
      str += val + comma;
    }
    strs += str + '\n';
  }
  return header + '\n' + strs; 
};

Table.prototype.newRow = function() {
  this.currentRow++;
};

/*
 * Add or replace the name:value in the current row
 * The next row is added when newRow is called.
 */
Table.prototype.addToRow = function(name, value) {
  if (!(name in this.headers)) {  // needs the brackets
    if (this.isNotEmpty(name)) {
      this.headers[name] = name;
    } else {
      var nonamestr = 'noname:' + this.noname++;
      this.headers[nonamestr] = nonamestr;
    }
    this.cols[name] = [];
  }
  this.cols[name][this.currentRow] = value;
};

/*
 * Adds an extra row for each name:value at the column level
 * This means a row of data can be added as long as each row has the same number of columns by name
 */
Table.prototype.addRow = function(name, value) {
  if (!(name in this.headers)) {  // needs the brackets
    if (this.isNotEmpty(name)) {
      this.headers[name] = name;
    } else {
      var nonamestr = 'noname:' + this.noname++;
      this.headers[nonamestr] = nonamestr;
    }
    this.cols[name] = [];
  }
  this.cols[name].push(value);
};

Table.prototype.isNotEmpty = function (str) {
  return str != null && str.length > 0;
};
