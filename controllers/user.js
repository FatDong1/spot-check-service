let userModel = require('../models/user')
let md5 = require('md5')
let addUser = async (ctx, next) => {
  console.log(ctx.request.body)
  var user = {
    name: ctx.request.body.name,
    account: ctx.request.body.account,
    password: ctx.request.body.password,
    checkType: ctx.request.body.checkType,
    deviceGroup: ctx.request.body.deviceGroup
  }
  await userModel.findDataByName(user.name).then(result => {
    if (result.length) {
        try {
          throw Error('用户已经存在')
        } catch (error) {
          //处理err
          console.log(error)
        }
        ctx.body = {
          data: -1
        }
    } else {

      ctx.body = {
        data: 0
      }

      console.log('注册成功')
      userModel.insertData([user.name, md5(user.password), user.checkType, user.deviceGroup, user.account])
    }
  })
}
module.exports = {
  addUser
}
