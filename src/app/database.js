const mysql = require('mysql2');
const config = require('./config.js')

// 创建连接池


const connections = mysql.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  database: config.MYSQL_DATABASE,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD
})


// 测试连接
connections.getConnection((err, conn) => {
  if (err) throw err;
  conn.connect((err) => {
    if (err) throw err;
    console.log('\033[30;32m[database]  Connection successfully\033[0m')
  })
})


module.exports = connections.promise();

