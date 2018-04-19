let workModel = require('../models/work')

// 添加用户
async function addwork (ctx, next) {
  var work = {
    name: ctx.request.body.name,
    account: ctx.request.body.account,
    password: ctx.request.body.password,
    sex: ctx.request.body.sex,
    plant: ctx.request.body.plant,
    factory: ctx.request.body.factory
  }
  await workModel.insertData([work.name, md5(work.password), work.sex, work.account, work.factory, work.plant])
    .then(() => {
      ctx.body = {
        code: 0,
        data: {
          msg: '创建用户成功'
        }
      }
      console.log('注册成功')
    }).catch(() => {
      let msg
      ctx.body = {
        code: -1,
        data: {
          msg: '登录账户已经存在'
        }
      }
    })
}

// 查找所有用户
async function getAllworks (ctx) {
  await workModel.findAllwork().then((result) => {
    if (result.length) {
      ctx.body = {
        code: 0,
        data: {
          value: result
        }
      }
    } else {
      ctx.body = {
        code: -1,
        data: {
          msg: '没有数据'
        }
      }
    }
  })
}


module.exports = {

}
