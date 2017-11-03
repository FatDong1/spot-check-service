let query = require('./query').query

// 注册用户
let insertData = function( value ) {
  let _sql = "insert into user(name,password,checkType,deviceGroup,account) values(?,?,?,?,?);"
  return query( _sql, value )
}

// 通过名字查找用户
let findDataByName = function (  name ) {
  let _sql = `SELECT * from user where name="${name}"`
  return query( _sql)
}

module.exports={
  insertData,
  findDataByName
}


