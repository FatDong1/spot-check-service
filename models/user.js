let query = require('./utils/query').query
let md5 = require('md5')

let userTable =
`create table if not exists user(
  id VARCHAR(32) NOT NULL,
  account VARCHAR(30) NOT NULL unique,
  sex TINYINT(1) NOT NULL,
  name VARCHAR(30) NOT NULL,
  password VARCHAR(50) NOT NULL,
  factory VARCHAR(30) NOT NULL,
  job VARCHAR(30),
  userNumber VARCHAR(30),
  plant VARCHAR(30) NOT NULL,
  isAdmin TINYINT(10) DEFAULT 0,
  PRIMARY KEY (id)
)character set = utf8;`

// 创建用户表
query(userTable)

// 注册用户
let insertData = function( value ) {
  let _sql = "insert into user(id, name,password,sex,account,factory, plant, job, userNumber) values(UUID_SHORT(),?,?,?,?,?,?,?,?);"
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
let findUserByNameBlur = function ( name ) {
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
  let _sql = `UPDATE user SET password=? WHERE account=?`
  return query(_sql, value)
}

// 根据factory、plant、name查找所有用户，每页为7
let findPageUser = function (value) {
  let params = []
  let arr = ['isAdmin != 1']
  if (value[0] !== '') {
    arr.push('name = ?')
    params.push(value[0])
  }
  if (value[1] !== '') {
    arr.push('factory = ?')
    params.push(value[1])
  }
  if (value[2] !== '') {
    arr.push('plant = ?')
    params.push(value[2])
  }
  params.push(value[3])
  let str = arr.join(' and ')
  let _sql = `SELECT * FROM user WHERE ${str} LIMIT ?,7`
  return query(_sql, params)
}

// 初始化数据
findNumber().then((result) => {
  if (result[0].number == 0) {
    insertData(['小明',md5('123456'), 1, 'xiaoming', '第一工厂', '第一车间', '日常点检员', '12312312'])
    insertData(['小红',md5('123456'), 2, 'xiaohong', '第一工厂', '第二车间', '专业点检员', '12312312'])
    insertData(['小白',md5('123456'), 1, 'xiaobai', '第二工厂', '第二车间', '日常点检员', '12312312'])
    insertData(['小东',md5('123456'), 1, 'xiaodong', '第二工厂', '第一车间', '精密点检员', '12312312'])
    insertData(['小龙',md5('123456'), 2, 'xiaolong', '第三工厂', '第一车间', '日常点检员', '12312312'])
    insertData(['小陈',md5('123456'), 2, 'xiaochen', '第三工厂', '第二车间', '日常点检员', '12312312'])
  }
})

module.exports={
  insertData,
  findAllUser,
  findUserByAccount,
  findUserByNameBlur,
  deleteUserById,
  updateUser,
  findPageUser
}


