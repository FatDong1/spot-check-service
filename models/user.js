let query = require('./utils/query').query

let userTable =
`create table if not exists user(
  id VARCHAR(32) NOT NULL,
  account VARCHAR(30) NOT NULL,
  sex TINYINT(1) NOT NULL,
  name VARCHAR(30) NOT NULL,
  password VARCHAR(50) NOT NULL,
  factory VARCHAR(30) NOT NULL,
  plant VARCHAR(30) NOT NULL,
  PRIMARY KEY (account)
)character set = utf8;`

// 创建用户表
query(userTable)

// 注册用户
let insertData = function( value ) {
  let _sql = "insert into user(id, name,password,sex,account,factory, plant) values(UUID_SHORT(),?,?,?,?,?,?);"
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

// 查找用户的数量
let findNumber = function () {
  let _sql = 'SELECT count(*) as number FROM user'
  return query(_sql)
}

// 更新用户数据
let updateUser = function (value) {
  let _sql = `UPDATE user SET name=?, account=?, checkType=?, deviceGroup=? WHERE id=?`
  return query(_sql, value)
}

// 初始化数据
findNumber().then((result) => {
  if (result[0].number == 0) {
    insertData(['小明','123456', 1, 'xiaoming', '第一工厂', '第一车间'])
    insertData(['小红','123456', 2, 'xiaohong', '第一工厂', '第二车间'])
    insertData(['小白','123456', 1, 'xiaobai', '第二工厂', '第二车间'])
    insertData(['小东','123456', 1, 'xiaodong', '第二工厂', '第一车间'])
    insertData(['小龙','123456', 2, 'xiaolong', '第三工厂', '第一车间'])
    insertData(['小陈','123456', 2, 'xiaochen', '第三工厂', '第二车间'])
  }
})

module.exports={
  insertData,
  findAllUser,
  findUserByAccount,
  findUserByNameBlur,
  deleteUserById,
  updateUser
}


