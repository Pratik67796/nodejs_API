const mysql = require('mysql');
// const dbConfig = require('./configLoader').databaseConfig;
class Database {
    constructor() {
        var config = {
          host: "localhost",
          user: "root",
          password: "",
          database: "node_api"
        }
        this.connection = mysql.createPool(config);
    }
    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }
    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
}

module.exports = new Database();
