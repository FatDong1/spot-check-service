let query = require('./utils/query').query


let deviceTable =
  `create table if not exists device(
    id VARCHAR(32) NOT NULL,
    name VARCHAR(30) NOT NULL,
    department VARCHAR(30) NOT NULL,
    category VARCHAR(50) NOT NULL,
    deviceModel VARCHAR(50) NOT NULL,
    serialNumber VARCHAR(50) NOT NULL,
    usePlace VARCHAR(50) NOT NULL,
    productionAddress VARCHAR(50) NOT NULL,
    remark VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
  )character set = utf8;`

query(deviceTable)

// 查找设备的数量
let findNumber = function () {
  let _sql = 'SELECT count(*) as number FROM device'
  return query(_sql)
}

// 插入数据
let addDevice = function (value) {
 let _sql = `INSERT INTO device(id, name, department, category, deviceModel, serialNumber, usePlace, productionAddress, remark) VALUES(UUID_SHORT(),?,?,?,?,?,?,?,?)`
 return query(_sql, value)
}

// 初始化数据
findNumber().then((result) => {
  if (result[0].number == 0) {
    addDevice(['MJ-1000数控车床','第一工厂第一车间', '数控车床', 'QTN200IIML/500', '34533465436', '第一工厂第一车间','宁夏MAZAK', '无'])
    addDevice(['CNC车床','第二工厂第一车间', '普通车床', 'QTN200IIL/500', '567567658658', '第一工厂第一车间','宁夏MAZAK', '加工范围/MM：φ276*230*575,主轴转速：5000/动力头转速：4000,定位精度：0.004,加工精度：0.005'])   
    addDevice(['MJ-900数控车床','第一工厂第一车间', '数控车床', 'QTN200IIML/500', '34533465436', '第一工厂第一车间','宁夏MAZAK', '无'])
    addDevice(['MJ-800数控车床','第一工厂第一车间', '数控车床', 'QTN200IIML/500', '34533465436', '第一工厂第一车间','宁夏MAZAK', '无'])
  }
})

module.exports = {
  addDevice
}
