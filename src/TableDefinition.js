module.exports = TableDefinition;

function TableDefinition (namecol, valcols) {
  this.namecol = namecol;
  if (valcols instanceof Array) {
    cols = {};
    for (var i = 0; i < valcols.length; i++) {
      cols[valcols[i]] = valcols[i];
    }
    this.valcols = cols;
  } else {
    this.valcols = valcols;    
  }
};
  
TableDefinition.prototype.toString = function() {
  return 'namecol:' + this.namecol + ', valcols:' + require('util').inspect(this.valcols); 
};
 

