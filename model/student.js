const db  = require('../database/db.js');
var async = require('async');
const { query } = require('../database/db.js');
//const moment =  require('moment')

var tables = {
	select:function(){
		return db.query('select * from student');
	},
    
	selectWhere:function(label){
		return db.query(`select * from student WHERE ${label} `);
	},
    insert:function(data){
        return db.query('Insert Into  student SET ?',[data]);
    },
    delete:function(id){
        var query = db.query('Delete from student Where id = ?',[id]);
        return query;
    },
    update:function(data,id){
        var query = db.query('UPDATE student SET ? where id=?',[data,id]);
        //console.log(query);
        return query;
        
    }
}

module.exports = tables;