
var TableDefinition = require('../index.js').TableDefinition;
var Table = require('../index.js').Table;
var assert = require('assert');

describe('Tables', function(){
  before(function(){
    // ...
  });

  describe('TableDefinition Behavior', function(){
    it('should create a TableDefinition with one col', function(){
      var tdef = new TableDefinition(0, [1]);
      assert.equal("namecol:0, valcols:{ '1': 1 }", tdef.toString());
    });
    
    it('should create a TableDefinition with two cols', function(){
      var tdef = new TableDefinition(0, [1, 2]);
      assert.equal("namecol:0, valcols:{ '1': 1, '2': 2 }", tdef.toString());
    });
  });
  
  describe('Table Behaviour', function(){
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

      assert.equal('col1,col2,col3', tab.header());
      assert.equal('col1,col2,col3\n'+
          '1,,\n'+
          '2,,\n'+
          '3,2.0,4\n', tab.toCSVString());

      tab.newRow();
      tab.addToRow('col3', 5.0);
      tab.newRow();
      tab.addToRow('col4', 4.5);
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

    it('should add row', function(){
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
       
    it('should access table at rows and columns', function(){
      var tab = new Table();
      tab.addToRow('col1', 1);
      tab.newRow();                 // 0
      tab.addToRow('col1', 2); 
      tab.newRow();                 // 1
      tab.addToRow('col1', 3);
      tab.addToRow('col2', '2.0');
      tab.addToRow('col3', 4.0);
      tab.newRow();                 // 2
      tab.addToRow('col3', 5.0);
      tab.newRow();                 // 3
      tab.addToRow('col4', 4.5);
                                    // 4
      assert.equal(5, tab.nrow());
      assert.equal(4, tab.ncol());
      
      assert.equal(2, tab.get(1, 'col1'));
      assert.equal(4.0, tab.get(2, 'col3'));
      assert.equal(4.5, tab.get(4, 'col4'));
      assert.equal(null, tab.get(3, 'col1'));
    });

    it('should access table by searching rows and columns', function(){
      var tab = new Table();
      tab.addToRow('col1', 'abc');
      tab.addToRow('col2', 2);
      tab.newRow();                 // 0
      tab.addToRow('col1', '123');
      tab.addToRow('col2', 4);
      tab.newRow();                 // 1
      tab.addToRow('col1', 'xyz');
      tab.addToRow('col2', 4);
      tab.newRow();                 // 2
      tab.addToRow('col1', '123');
      tab.addToRow('col2', 5);
                                    // 3
      
      assert.equal(4, tab.nrow(), 'expect 4 rows');
      assert.equal(2, tab.ncol(), 'expect 2 cols');
      assert.equal(0, tab.findRow('456', 'col1').length, 'expect empty array');
      assert.deepEqual([0], tab.findRow('abc', 'col1'), 'expect [0] for abc');
      assert.deepEqual([1,3], tab.findRow('123', 'col1'), 'expect [1,3] for 123');
    });

  });

});


function log(str) {
  console.log(str);
}
