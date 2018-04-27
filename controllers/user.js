let userModel = require('../models/user')
let md5 = require('md5')

// 添加用户
async function addUser (ctx, next) {
  var user = {
    name: ctx.request.body.name,
    account: ctx.request.body.account,
    password: ctx.request.body.password,
    sex: ctx.request.body.sex,
    plant: ctx.request.body.plant,
    factory: ctx.request.body.factory,
    job: ctx.request.body.factory,
    userNumber: ctx.request.body.userNumber
  }
  await userModel.insertData([user.name, md5(user.password), user.sex, user.account, user.factory, user.plant, user.job, user.userNumber])
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
async function getAllUsers (ctx) {
  await userModel.findAllUser().then((result) => {
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

async function findUserPage (ctx) {
  let start = (ctx.query.page - 1 ) * 7
  let name = ctx.query.name
  let factory = ctx.query.factory
  let plant = ctx.query.plant
  await userModel.findPageUser([name, factory, plant, start]).then((result) => {
    ctx.body = {
      code: 0,
      data: {
        value: result
      }
    }
  })
}


// 检查用户密码
async function checkUser (ctx) {
  let account = ctx.request.body.account
  let password = ctx.request.body.password
  await userModel.findUserByAccount(account).then((result) => {
    if (result.length) {
      if (md5(password) === result[0].password) {
        ctx.body = {
          code: 0,
          data: {
            msg: '登录成功',
            value: result
          }
        }
      } else {
        ctx.body = {
          code: -1,
          data: {
            msg: '密码错误'
          }
        }
      }
    } else {
      ctx.body = {
        code: -1,
        data: {
          msg: '用户不存在'
        }
      }
    }
  })
}

// 删除用户
async function deleteUser (ctx) {
  await userModel.deleteUserById(ctx.query.id).then((result) => {
    ctx.body = {
      code: 0,
      data: {
        msg: '成功删除'
      }
    }
  }).catch(() => {
    let msg
    if (err.code === 'ER_DUP_ENTRY') {
      msg = '登录账户已存在'
    } else {
      msg = '更新用户失败'
    }
    ctx.body = {
      code: -1,
      data: {
        msg: msg
      }
    }
  })
}

// 更新用户数据
async function updateUser (ctx) {
  let account = ctx.request.body.account
  let password = ctx.request.body.password

  await userModel.findUserByAccount(account).then((result) => {
    if (result.length === 0) {
      ctx.body = {
        code: -1,
        data: {
          msg: '用户不存在'
        }
      }
      return
    }
  })
  await userModel.updateUser([md5(password), account]).then(() => {
    ctx.body = {
      code: 0,
      data: {
        msg: '用户密码修改成功'
      }
    }
  }).catch(() => {
    ctx.body = {
      code: -1
    }
  })
}

module.exports = {
  addUser,
  getAllUsers,
  deleteUser,
  checkUser,
  updateUser,
  findUserPage
}
