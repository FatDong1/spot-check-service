let query = require('./utils/query').query


let deviceTable =
  `create table if not exists device(
    id VARCHAR(32) NOT NULL,
    deviceName VARCHAR(30) NOT NULL,
    department VARCHAR(30) NOT NULL,
    category VARCHAR(50) NOT NULL,
    deviceModel VARCHAR(50) NOT NULL,
    serialNumber VARCHAR(50) NOT NULL,
    usePlace VARCHAR(50) NOT NULL,
    productionAddress VARCHAR(50) NOT NULL,
    remark VARCHAR(100) NOT NULL,
    parts VARCHAR(100) NULL,
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
 let _sql = `INSERT INTO device(id, deviceName, department, category, deviceModel, serialNumber, usePlace, productionAddress, remark,parts) VALUES(UUID_SHORT(),?,?,?,?,?,?,?,?,?)`
 return query(_sql, value)
}

// 设备数据分页，每页7条
let findPageDevice = function (value) {
  let _sql = `SELECT * FROM device LIMIT ?,7`
  return query(_sql, value)
}

// 根据部门筛选
let findDeviceByDept = function (value) {
  let _sql = `SELECT * FROM device WHERE department = ?`
  return query(_sql, value)
}

// 根据设备名称筛选
let findDeviceByName = function (value) {
  let _sql = `SELECT * FROM device WHERE deviceName = ?`
  return query(_sql, value)
}

// 初始化数据
findNumber().then((result) => {
  if (result[0].number == 0) {
    addDevice(['MJ-1000数控车床','第一工厂第一车间', '数控车床', 'QTN200IIML/500', '34533465436', '第一工厂第一车间','宁夏MAZAK', '加工范围/MM：φ276*230*575,主轴转速：5000/动力头转速：4000,定位精度：0.004,加工精度：0.005',])
    addDevice(['CNC车床','第二工厂第一车间', '普通车床', 'QTN200IIL/500', '567567658658', '第一工厂第二车间','宁夏MAZAK', '加工范围/MM：φ276*230*575,主轴转速：5000/动力头转速：4000,定位精度：0.004,加工精度：0.005'])   
    addDevice(['MJ-900数控车床','第一工厂第一车间', '数控车床', 'QTN200IIML/500', '34533465436', '第而工厂第一车间','宁夏MAZAK', '加工范围/MM：φ276*230*575,主轴转速：5000/动力头转速：4000,定位精度：0.004,加工精度：0.005'])
    addDevice(['MJ-800数控车床','第一工厂第一车间', '数控车床', 'QTN200IIML/500', '34533465436', '第三工厂第一车间','宁夏MAZAK', '加工范围/MM：φ276*230*575,主轴转速：5000/动力头转速：4000,定位精度：0.004,加工精度：0.005'])
    addDevice(['MJ-800数控车床','第一工厂第一车间', '数控车床', 'QTN200IIML/500', '34533465436', '第一工厂第一车间','宁夏MAZAK', '加工范围/MM：φ276*230*575,主轴转速：5000/动力头转速：4000,定位精度：0.004,加工精度：0.005'])
    addDevice(['NJ-700数控镗床','第一工厂第一车间', '数控镗床', 'QTN200IIML/500', '34533465436', '第一工厂第一车间','宁夏MAZAK', '加工范围/MM：φ276*230*575,主轴转速：5000/动力头转速：4000,定位精度：0.004,加工精度：0.005'])
    addDevice(['MJ-1001数控铣床','第一工厂第一车间', '数控铣床', 'QTN200IIML/500', '34533465436', '第一工厂第一车间','宁夏MAZAK', '加工范围/MM：φ276*230*575,主轴转速：5000/动力头转速：4000,定位精度：0.004,加工精度：0.005'])
    addDevice(['MJ-800数控铣床','第一工厂第一车间', '数控铣床', 'QTN200IIML/500', '34533465436', '第一工厂第一车间','宁夏MAZAK', '加工范围/MM：φ276*230*575,主轴转速：5000/动力头转速：4000,定位精度：0.004,加工精度：0.005'])
    addDevice(['MJ-800车床','第一工厂第一车间', '普通车床', 'QTN200IIML/500', '34533465436', '第一工厂第一车间','宁夏MAZAK', '加工范围/MM：φ276*230*575,主轴转速：5000/动力头转速：4000,定位精度：0.004,加工精度：0.005'])
    addDevice(['MJ-800铣床','第一工厂第一车间', '普通铣床', 'QTN200IIML/500', '34533465436', '第一工厂第一车间','宁夏MAZAK', '加工范围/MM：φ276*230*575,主轴转速：5000/动力头转速：4000,定位精度：0.004,加工精度：0.005'])
        
  }
})

module.exports = {
  addDevice,
  findPageDevice,
  findDeviceByDept,
  findDeviceByName
}
