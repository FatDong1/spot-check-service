let query = require('./utils/query').query

let checkTable =
  `create table if not exists spot_check (
    id VARCHAR(32) NOT NULL,
    name VARCHAR(30) NOT NULL,
    number VARCHAR(30) NOT NULL,
    element VARCHAR(30) NOT NULL,
    unit VARCHAR(30) NOT NULL,
    special VARCHAR(30) NOT NULL,
    norm VARCHAR(30) NOT NULL,
    method VARCHAR(30) NOT NULL,
    tool VARCHAR(30) NOT NULL,
    cycle INT(10) NOT NULL,
    checkerId VARCHAR(30) NOT NULL,
    deviceId VARCHAR(30) NOT NULL,
    createDate timestamp NOT NULL,
    startDate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (checkerId) REFERENCES user(id),
    FOREIGN KEY (deviceId) REFERENCES device(id)
  )character set = utf8;`

query(checkTable)

// let procedureSql = 
//   `delimiter //
//     create procedure auto_work()
//     begin
    //   `INSERT INTO work(spotCheckId) SELECT id FROM spot_check;
    // end //`


let startWorkSql = 
  `create event if not exists auto_event
    on schedule every 10 second
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
 let _sql = `INSERT INTO spot_check(id, name, number, element, unit, special, norm, method, tool, cycle, checkerId, deviceId) VALUES(UUID_SHORT(),?,?,?,?,?,?,?,?,?,?,?)`
 return query(_sql, value)
}

// 根据deviceId筛选
let findcheckByDevice = function (value) {
  let _sql = `SELECT spot_check.name, spot_check.number, spot_check.element, spot_check.unit, spot_check.special, spot_check.norm, spot_check.method, spot_check.tool, spot_check.cycle, user.name as checker FROM spot_check LEFT JOIN user ON user.id = spot_check.checkerId WHERE deviceId = ?`
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
  findcheckByDevice
}
