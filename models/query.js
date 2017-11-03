var mysql = require('mysql');
var config = require('../config/default.js')

var pool  = mysql.createPool({
  host     : config.database.HOST,
  user     : config.database.USERNAME,
  password : config.database.PASSWORD,
  database : config.database.DATABASE
})

let query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        resolve( err )
      } else {
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
}

let user =
  `create table if not exists user(
    id INT NOT NULL AUTO_INCREMENT,
    account VARCHAR(40) NOT NULL,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(40) NOT NULL,
    checkType VARCHAR(40) NOT NULL,
    deviceGroup VARCHAR(40) NOT NULL,
    PRIMARY KEY (id)
  )character set = utf8;`

let device =
  `create table if not exists device(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    group VARCHAR(100) NOT NULL,
    record VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
  )character set = utf8;`

let createTable = function( sql ) {
  return query( sql, [] )
}

// 建表
createTable(user)
createTable(device)

module.exports = {
  query
}
