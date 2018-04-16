let deviceModel = require('../models/device')

async function addDevice (ctx) {
  let result = ctx.request.body
  let value = [result.name, result.department, result.category, result.deviceModel, result.serialNumber, result.usePlace, result.productionAddress, result.remark]
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

module.exports = {
  addDevice
}
