let query = require('./utils/query').query

let checkTable =
  `create table if not exists spot_check (
    id VARCHAR(40) NOT NULL,
    name VARCHAR(30) NOT NULL,
    number VARCHAR(30) NOT NULL,
    element VARCHAR(30) NOT NULL,
    unit VARCHAR(30),
    special VARCHAR(30) NOT NULL,
    norm VARCHAR(30),
    normType VARCHAR(10) NOT NULL,
    normOptions VARCHAR(50),
    method VARCHAR(30) NOT NULL,
    tool VARCHAR(30) NOT NULL,
    deviceState VARCHAR(30) NOT NULL,
    cycle INT(10) NOT NULL,
    checkerId VARCHAR(30) NOT NULL,
    deviceId VARCHAR(30) NOT NULL,
    createDate date NOT NULL,
    startDate date NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (checkerId) REFERENCES user(id),
    FOREIGN KEY (deviceId) REFERENCES device(id)
  )character set = utf8;`

query(checkTable)

let startWorkSql = 
  `create event if not exists auto_event
    on schedule every 1 day
    on completion preserve enable
    do call auto_work();`

query(startWorkSql)


// 查找设备的数量
let findNumber = function () {
  let _sql = 'SELECT count(*) as number FROM spot_check'
  return query(_sql)
}

// 插入数据
let insertData = function (value) {
 let _sql = `INSERT INTO spot_check(id, name, number, element, unit, special, norm, normType, normOptions, method, tool, deviceState, cycle, checkerId, deviceId,createDate,startDate) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
 return query(_sql, value)
}

let updateData = function (value) {
 let _sql = `UPDATE spot_check SET name=?, number=?, element=?, unit=?,special=?, norm=?, normType=?, normOptions=?,method=?, tool=?, deviceState=?, cycle=?, checkerId=?, deviceId=?, createDate=?, startDate=? WHERE id=?`
 return query(_sql, value)
}

// 根据deviceId筛选
let findcheckByDevice = function (value) {
  let _sql = `SELECT spot_check.id, spot_check.name, spot_check.number, spot_check.element, spot_check.unit, spot_check.special, spot_check.norm, spot_check.method, spot_check.tool, spot_check.cycle, spot_check.normOptions,  spot_check.deviceState, spot_check.normType, spot_check.startDate, spot_check.createDate, user.id as checkerId, user.name as checker FROM spot_check LEFT JOIN user ON user.id = spot_check.checkerId WHERE deviceId = ?`
  return query(_sql, value)
}

// 根据设备名称筛选
let findcheckByName = function (value) {
  let _sql = `SELECT * FROM spot_check WHERE name = ?`
  return query(_sql, value)
}

// 初始化数据
findNumber().then((result) => {
  if (result[0].number == 0) {
        
  }
})

module.exports = {
  insertData,
  findcheckByDevice,
  updateData
}
