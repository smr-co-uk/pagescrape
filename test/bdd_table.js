
var TableDefinition = require('../index.js').TableDefinition;
var Table = require('../../pagescrape').Table;
var assert = require('assert');

describe('BDD Tables', function(){
  before(function(){
    // ...
  });

  describe('BDD TableDefinition', function(){
    it('TableDefinition constructor 1', function(){
      var tdef = new TableDefinition(0, [1]);
      assert.equal("namecol:0, valcols:{ '1': 1 }", tdef.toString());
    });
    it('TableDefinition constructor 2', function(){
        var tdef = new TableDefinition(0, [1, 2]);
        assert.equal("namecol:0, valcols:{ '1': 1, '2': 2 }", tdef.toString());
      });
  });
  
  describe('BDD Table', function(){
    it('should add to row', function(){
      var tab = new Table();
      assert.equal("", tab.toCSVString());

      tab.addToRow('col1', 1);
      tab.newRow();
      tab.addToRow('col1', 2);
      tab.newRow();
      tab.addToRow('col1', 3);
      tab.addToRow('col2', '2.0');
      tab.addToRow('col3', 4.0);

      //log(tab.toCSVString());

      assert.equal('col1,col2,col3', tab.header());
      assert.equal('col1,col2,col3\n'+
          '1,,\n'+
          '2,,\n'+
          '3,2.0,4\n', tab.toCSVString());

      tab.newRow();
      tab.addToRow('col3', 5.0);
      //log(tab);
      tab.newRow();
      tab.addToRow('col4', 4.5);
      //log(tab);
      assert.equal('col1,col2,col3,col4', tab.header());
      assert.equal('col1,col2,col3,col4\n'+
                   '1,,,\n'+
                   '2,,,\n'+
                   '3,2.0,4,\n'+
                   ',,5,\n'+
                   ',,,4.5\n'
                   , tab.toCSVString());
      assert.equal(5, tab.nrow());
      assert.equal(4, tab.ncol());

      tab = new Table();
      tab.addRow('col1', 1);
      tab.addRow('col2', '2.0');
      tab.addRow('col3', 4.0);
      tab.addRow('col1', 2);
      tab.addRow('col2', '3.0');
      tab.addRow('col3', 5.0);

      assert.equal('col1,col2,col3', tab.header());
      assert.equal('col1,col2,col3\n'+
          '1,2.0,4\n'+
          '2,3.0,5\n', tab.toCSVString());
    });

    it('should add rows', function(){
        var tab = new Table();
        assert.equal("", tab.toCSVString());

        tab.addRow('col1', 1);
        tab.addRow('col2', '2.0');
        tab.addRow('col3', 4.0);
        tab.addRow('col1', 2);
        tab.addRow('col2', '3.0');
        tab.addRow('col3', 5.0);

        assert.equal('col1,col2,col3', tab.header());
        assert.equal('col1,col2,col3\n'+
            '1,2.0,4\n'+
            '2,3.0,5\n', tab.toCSVString());
      });
  });

});


function log(str) {
  console.log(str);
}
