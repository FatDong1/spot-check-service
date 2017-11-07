let deviceGroupModel = require('../models/deviceGroup')

async function addDeviceGroup (ctx) {
  console.log(ctx.request)
  await deviceGroupModel.findGroupByName(ctx.request.body.name).then((result) => {
    if (result.length) {
      ctx.body = {
        code: -1,
        data: {
          msg: '设备种类已经存在'
        }
      }
    } else {
      ctx.body = {
        code: 0,
        data: {
          msg: '创建设备种类成功'
        }
      }
      console.log('注册成功')
      deviceGroupModel.addDeviceGroup([ctx.request.body.name, ctx.request.body.hasDevices, ctx.request.body.desc])
    }
  })
}

module.exports = {
  addDeviceGroup
}
