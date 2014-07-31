var DatabaseService = angular.module('dbService', []);
angular.module('dbService').
service('DatabaseService',['$window', 
  function($window) {
	console.log("DatabaseService DatabaseService DatabaseService DatabaseService");
    this.openDB = function() {
    	console.log("openDB openDB openDB DatabaseService");
    	db = window.sqlitePlugin.openDatabase({name: "Database"});
    };
    this.creatDB = function(){
    	console.log("creatDB creatDB creatDB DatabaseService");
    	db.transaction(function(tx) {
        	tx.executeSql('CREATE TABLE IF NOT EXISTS student_table (studentId integer primary key, name text, interest integer,schoolName text)');
    	});
    };
    this.getStudentList = function(){
    	console.log("getStudentList getStudentList getStudentList DatabaseService");
    	this.rows;
    	db.transaction(function(tx) {
        	tx.executeSql("SELECT * from student_table;", [], function(tx, res) {
        	console.log("res.rows.length: " + res.rows.length + " -- should be 1");
        	//alert("res.rows.item(0).name: " + res.rows.item(0).name + " -- should be 100");
        	rows = res.rows;
        	},function(tx, e) {
        		console.log("Error: " + e.message);
        	} );
        	
		});	
    	return rows;
     };
    this.insertStudent = function(name,interest,schoolName){
    	console.log("insertStudent insertStudent insertStudent DatabaseService");
     	db.transaction(function(tx) {
     		tx.executeSql("INSERT INTO student_table (name, interest,schoolName) VALUES (?,?,?)", [name,interest,schoolName], function(tx, res) {
         	console.log("insertId: " + res.insertId + " -- probably 1"); // check #18/#38 is fixed
         	//alert("insertId: " + res.insertId + " -- should be valid");
     		},function(tx, e) {
     			console.log("Error: " + e.message);
     		} );
     		
          
 		});	
    };
}]);
