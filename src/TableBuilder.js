
var Table = require('./Table');

var self = {

  getElemetByIdAndExtractTableByRow: function($, selector, context, tbldef) {
    var tables = $(selector, context);
    var thetable = new Table();
    $(tables).each(function(i, table) {
      //log.info('table ' + table.name);
      $(table).children('tr').each(function(i, row) {
        var colname = null;
        var colvalue = '';
        $(row).children('td').each(function(j, col) {
          if (j == tbldef.namecol) {
            colname = self.removeNonChars($(col).text());
          }
          if (j in tbldef.valcols) {
            if (self.isNotEmpty(colvalue)) {
              colvalue += '|' + self.removeNonChars($(col).text());
            } else {
              colvalue = self.removeNonChars($(col).text());
            }
          }
        });
        if (self.isNotEmpty(colname) && self.isNotEmpty(colvalue)) {
          thetable.addRow(colname, colvalue);
        } else {
          //log.debug("data not found" + $(row).text());        
        }
       });
    });
    return thetable;
  },

  isNotEmpty: function (str) {
    return str != null && str.length > 0;
  },
  
  trimHtml: function (str) {
    str = str.trim(); // trim spaces from either end
    str = str.replace(/(\r\n|\n|\r)/gm," ");  // replace cr/lf with spaces
    str = str.replace(/\s+/g," ");  // replace double spaces with spaces
    return str;
  },
  
  removeNonChars: function (str) {
    str = self.trimHtml(str);
    str = str.replace(/:/, ''); 
    return str;  
  }

};

module.exports = self;