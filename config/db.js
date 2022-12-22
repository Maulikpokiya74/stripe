
var db_config = require('./config');

var mysql = require("mysql");
var confData = {
    multipleStatements: true,
    host: db_config.hostname,
    user: db_config.user,
    password: db_config.password,
    database: db_config.database,
    connectionLimit: 1000,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,

}

// var connection = mysql.createConnection(confData);

// connection.connect(function (err) {
//     if (err) throw err;
//     console.log('succ => db connect')
// })

var connection = mysql.createPool(confData);

module.exports = connection;
