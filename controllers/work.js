let workModel = require('../models/work')


async function findWorkPage (ctx) {
  let start = (ctx.query.page - 1 ) * 7
  let name = ctx.query.name
  let state = ctx.query.state
  let checkerId = ctx.query.checkerId
  let department = ctx.query.department ? ctx.query.department : ''
  await workModel.findPageWork([checkerId, name, state, department, start]).then((result) => {
    ctx.body = {
      code: 0,
      data: {
        value: result
      }
    }
  })
}

async function findExpiredWork (ctx) {
  let deviceId = ctx.query.deviceId
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  let current = new Date(year, month, day, 0, 0, 0)

  await workModel.findExpiredWork([deviceId, current]).then((result) => {
    ctx.body = {
      code: 0,
      data: {
        value: result
      }
    }
  }).catch((err) => {
    console.log(err)
    ctx.body = {
      code: -1,
      data: {
        msg: '获取失败'
      }
    }
  })
}


async function updateWork (ctx) {
  let body = ctx.request.body
  await workModel.updateWork([body.isProblem, body.result, body.problem, body.id]).then((result) => {
    ctx.body = {
      code: 0,
      data: {
        msg: '工单录入成功'
      }
    }
  }).catch((err) => {
    console.log(err)
    ctx.body = {
      code: -1,
      data: {
        msg: '工单录入失败'
      }
    }
  })
}

module.exports = {
  findWorkPage,
  updateWork,
  findExpiredWork
}
