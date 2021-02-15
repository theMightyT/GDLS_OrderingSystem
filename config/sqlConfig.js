const mysql = require('mysql');

const config = {
    host: "localhost", //"us-cdbr-iron-east-02.cleardb.net",
    port : 3306,
    user: "root", //"bff282c2fc3e3b",
    password: "hopalong", //"b5c8cc3f",
    database: "GDLS_Ordering_System" //"heroku_2fd7198f05de2b0"
};

let connect = mysql.createPool({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
    connectionLimit: 20,
    queueLimit: 100,
    waitForConnection: true
})

module.exports = connect;