const db  = require('../database/db.js');
var async = require('async');
const { query } = require('../database/db.js');
//const moment =  require('moment')

var tables = {
	select:function(){
		return db.query('select * from image');
	},
    
	selectWhere:function(label,values){
		return db.query(`select * from ad WHERE ${label} = ? order by created_at`,values);
	},
    insertt:function(data){
        return db.query('Insert Into image SET ?',[data]);
    },
    delete:function(id){
        var query = db.query('Delete from student Where id = ?',[id]);
        return query;
    },
    update:function(data,id){
        var query = db.query('UPDATE student SET ? where id=?',[data,id]);
        return query;
    }
}

module.exports = tables;