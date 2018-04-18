let query = require('./utils/query').query

let checkTable =
  `create table if not exists spotCheck (
    id VARCHAR(32) NOT NULL,
    name VARCHAR(30) NOT NULL,
    number VARCHAR(30) NOT NULL,
    element VARCHAR(30) NOT NULL,
    unit VARCHAR(30) NOT NULL,
    special VARCHAR(30) NOT NULL,
    norm VARCHAR(30) NOT NULL,
    method VARCHAR(30) NOT NULL,
    cycle INT(10) NOT NULL,
    checkerId VARCHAR(30) NOT NULL,
    deviceId VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
  )character set = utf8;`

query(checkTable)

// 查找设备的数量
let findNumber = function () {
  let _sql = 'SELECT count(*) as number FROM check'
  return query(_sql)
}

// 插入数据
let insertData = function (value) {
 let _sql = `INSERT INTO check(id, name, number, element, unit, special, norm, cycle, checkerId, deviceId) VALUES(UUID_SHORT(),?,?,?,?,?,?,?,?,?,?)`
 return query(_sql, value)
}

// 设备数据分页，每页7条
let findPagecheck = function (value) {
  let _sql = `SELECT * FROM check LIMIT ?,7`
  return query(_sql, value)
}

// 根据部门筛选
let findcheckByDept = function (value) {
  let _sql = `SELECT * FROM check WHERE department = ?`
  return query(_sql, value)
}

// 根据设备名称筛选
let findcheckByName = function (value) {
  let _sql = `SELECT * FROM check WHERE name = ?`
  return query(_sql, value)
}

// 初始化数据
findNumber().then((result) => {
  if (result[0].number == 0) {
        
  }
})

module.exports = {
  insertData
}
