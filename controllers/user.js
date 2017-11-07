let userModel = require('../models/user')
let md5 = require('md5')

// 添加用户
async function addUser (ctx, next) {
  var user = {
    name: ctx.request.body.name,
    account: ctx.request.body.account,
    password: ctx.request.body.password,
    checkType: ctx.request.body.checkType,
    deviceGroup: ctx.request.body.deviceGroup
  }

  await userModel.insertData([user.name, md5(user.password), user.checkType, user.deviceGroup, user.account])
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

// 根据用户名查找用户
async function searchUsers (ctx) {
  await userModel.findUserByNameBlur(ctx.query.name).then((result) => {
    if (result.length) {
      ctx.body = {
        code: 0,
        data: {
          value: result
        }
      }
    }
  })
}

// 删除用户
async function deleteUser (ctx) {
  await userModel.deleteUserById(ctx.query.id).then((result) => {
    console.log(result)
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
  let value = [ctx.request.body.name, ctx.request.body.account, ctx.request.body.checkType, ctx.request.body.deviceGroup,ctx.request.body.id]
  await userModel.updateUser(value).then((data) => {
    ctx.body = {
      code: 0,
      data: {
        msg: '更新用户成功'
      }
    }
  }).catch((err) => {
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

module.exports = {
  addUser,
  getAllUsers,
  searchUsers,
  deleteUser,
  updateUser
}
