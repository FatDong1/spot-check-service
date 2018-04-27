let query = require('./utils/query').query
let md5 = require('md5')

let scoreTable =
`create table if not exists score(
  id VARCHAR(32) NOT NULL,
  total INT(10),
  attitude INT(10),
  attendance INT(10),
  ability INT(10),
  efficiency INT(10),
  userId VARCHAR(32),
  PRIMARY KEY (id),
  assessDate VARCHAR(30),
  FOREIGN KEY (userId) REFERENCES user(id)
)character set = utf8;`

// 创建用户表
query(scoreTable)

// 注册用户
let insertData = function( value ) {
  let _sql = "insert into score(id, total,attitude,attendance,ability,efficiency, assessDate, userId) values(UUID_SHORT(),?,?,?,?,?,?,?);"
  return query( _sql, value )
}



module.exports={
  insertData
}


