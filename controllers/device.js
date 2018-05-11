let deviceModel = require('../models/device')

async function addDevice (ctx) {
  let result = ctx.request.body
  let department = result.department.join('')
  let value = [result.name, department, result.category, result.deviceModel, result.serialNumber, result.usePlace, result.productionAddress, result.remark,result.parts]
  await deviceModel.addDevice(value).then((result) => {
    ctx.body = {
      code: 0,
      data: {
        msg: '设备添加成功'
      }
    }
  }).catch((err) => {
    console.log(err)
    ctx.body = {
      code: -1,
      data: {
        msg: '设备添加失败'
      }
    }
  })
}

async function findDevicePage (ctx) {
  let start = (ctx.query.page - 1 ) * 7
  await deviceModel.findPageDevice([start]).then((result) => {
    ctx.body = {
      code: 0,
      data: {
        value: result
      }
    }
  })
}

async function findDeviceByDept (ctx) {
  let dept = ctx.query.department
  await deviceModel.findDeviceByDept([dept]).then((result) => {
    ctx.body = {
      code: 0,
      data: {
        value: result
      }
    }
  }).catch((err) => {
    ctx.body = {
      code: -1,
      data: {
        msg: err
      }
    }
  })
}

async function findDeviceByName (ctx) {
  let name = ctx.query.name
  await deviceModel.findDeviceByName([name]).then((result) => {
    ctx.body = {
      code: 0,
      data: {
        value: result
      }
    }
  }).catch((err) => {
    ctx.body = {
      code: -1,
      data: {
        msg: err
      }
    }
  })
}

module.exports = {
  addDevice,
  findDevicePage,
  findDeviceByDept,
  findDeviceByName
}
