let query = require('./utils/query').query

let workTable =
`create table if not exists work(
  workId VARCHAR(40) NOT NULL,
  isProblem TINYINT(1),
  problem VARCHAR(50),
  result VARCHAR(30),
  checkDate date,
  reason VARCHAR(70),
  solution VARCHAR(100),
  state TINYINT(1) DEFAULT 0,
  spotCheckId VARCHAR(40),
  PRIMARY KEY (workId),
  FOREIGN KEY (spotCheckId) REFERENCES spot_check(id)
)character set = utf8;`

// 创建用户表
query(workTable)


// 根据userId查找所有工单，每页为7
let findPageWork = function (value) {
  let params = []
  params.push(value[0])
  let arr = ['spot_check.checkerId = ?', 'checkDate = CURRENT_DATE()']
  if (value[1] !== '') {
    arr.push('device.deviceName = ?')
    params.push(value[1])
  }
  if (value[2] !== '') {
    arr.push('work.state = ?')
    params.push(value[2])
  }
  if (value[3] !== '') {
    arr.push('device.department = ?')
    params.push(value[3])
  }
  params.push(value[4])
  let str = arr.join(' and ')
  let _sql = `SELECT * FROM work LEFT JOIN spot_check ON spot_check.id = work.spotCheckId LEFT JOIN device ON spot_check.deviceId = device.id WHERE ${str} LIMIT ?,7`
  return query(_sql, params)
}

let findExpiredWork = function (value) {
  let _sql = `SELECT spot_check.id, spot_check.number, spot_check.deviceState, spot_check.name, spot_check.number, spot_check.element, spot_check.unit, spot_check.special, spot_check.norm, spot_check.method, spot_check.tool, spot_check.cycle, spot_check.normOptions,  spot_check.deviceState, spot_check.normType, spot_check.startDate, spot_check.createDate, user.name as checker, user.factory, user.plant, work.checkDate FROM work LEFT JOIN spot_check ON spot_check.id = work.spotCheckId LEFT JOIN user ON spot_check.checkerId = user.id WHERE spot_check.deviceId = ? and work.state = 0 and work.checkDate < ?`
  return query(_sql, value)
}

let findUnusualWork = function (value) {
  let params = []
  let arr = ['work.isProblem != 1']
  if (value[0] !== '') {
    arr.push('work.isProblem = ?')
    params.push(value[0])
  }
  if (value[1] !== '') {
    arr.push('device.deviceName = ?')
    params.push(value[1])
  }
  if (value[2] !== '') {
    arr.push('device.department = ?')
    params.push(value[2])
  }
  params.push(value[3])
  let str = arr.join(' and ')
  let _sql = `SELECT * FROM work LEFT JOIN spot_check ON spot_check.id = work.spotCheckId LEFT JOIN device ON spot_check.deviceId = device.id WHERE ${str} LIMIT ?,7`
  return query(_sql, params)
}

let insertData = function (value) {
  let _sql = `insert into work(workId, spotCheckId, checkDate) values(UUID_SHORT(), ?, CURRENT_DATE());`
  return query(_sql, value)
}

// 更新工单数据
let updateWork = function (value) {
  let _sql = `UPDATE work SET isProblem=?, result=?, problem=?, state=1 WHERE workId=?`
  return query(_sql, value)
}

// 解决异常工单
let solveUnusualWork = function (value) {
  let _sql = `UPDATE work SET reason=?, solution=?, isProblem=2 WHERE workId=?`
  return query(_sql, value)
}

module.exports={
  findPageWork,
  insertData,
  updateWork,
  findExpiredWork,
  findUnusualWork,
  solveUnusualWork
}


