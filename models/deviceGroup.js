let query = require('./query').query


let devicegGroupTable =
  `create table if not exists deviceGroup(
    id VARCHAR(32) NOT NULL,
    name VARCHAR(100) NOT NULL,
    hasDevices VARCHAR(100) NOT NULL,
    meaning VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
  )character set = utf8;`

query(devicegGroupTable)

// 通过name查找
let findGroupByName = function (name) {
  console.log(name)
  let _sql = `SELECT * FROM device WHERE name="${name}"`
  return query(_sql)
}

// 插入数据
let addDeviceGroup = function (value) {
 let _sql = `INSERT INTO device(id, name, hasDevices, desc) VALUES(UUID_SHORT(),?,?,?)`
 return query(_sql, value)
}

module.exports = {
  addDeviceGroup,
  findGroupByName
}
