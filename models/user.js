let query = require('./query').query

let userTable =
`create table if not exists user(
  id VARCHAR(32) NOT NULL,
  account VARCHAR(30) NOT NULL,
  name VARCHAR(10) NOT NULL,
  password VARCHAR(50) NOT NULL,
  checkType VARCHAR(10) NOT NULL,
  deviceGroup VARCHAR(10) NOT NULL,
  PRIMARY KEY (account)
)character set = utf8;`

query(userTable)

// 注册用户
let insertData = function( value ) {
  let _sql = "insert into user(id,name,password,checkType,deviceGroup,account) values(UUID_SHORT(),?,?,?,?,?);"
  return query( _sql, value )
}

// 通过id删除用户
let deleteUserById = function (id) {
  let _sql = `DELETE FROM user WHERE id="${id}"`
  return query(_sql)
}

// 通过账户查找用户
let findUserByAccount = function (account) {
  let _sql = `SELECT * from user where account="${account}"`
  return query( _sql)
}

// 模糊查找
let findUserByNameBlur = function (  name ) {
  let _sql = `SELECT * from user where name LIKE "%${name}%"`
  return query( _sql)
}

// 查找所有用户
let findAllUser = function () {
  let _sql = 'SELECT * FROM user'
  return query(_sql)
}

// 更新用户数据
let updateUser = function (value) {
  let _sql = `UPDATE user SET name=?, account=?, checkType=?, deviceGroup=? WHERE id=?`
  return query(_sql, value)
}
module.exports={
  insertData,
  findAllUser,
  findUserByAccount,
  findUserByNameBlur,
  deleteUserById,
  updateUser
}


