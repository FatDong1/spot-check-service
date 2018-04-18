let checkModel = require('../models/check')

async function insertData (ctx) {
  let result = ctx.request.body
  let value = [result.name, result.number, result.element, result.unit, result.special, result.norm, result.cycle, result.checkerId, result.deviceId]
  await checkModel.addcheck(value).then((result) => {
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

async function findcheckPage (ctx) {
  let start = (ctx.query.page - 1 ) * 7
  await checkModel.findPagecheck([start]).then((result) => {
    ctx.body = {
      code: 0,
      data: {
        value: result
      }
    }
  })
}

async function findcheckByDept (ctx) {
  let dept = ctx.query.department
  await checkModel.findcheckByDept([dept]).then((result) => {
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

async function findcheckByName (ctx) {
  let name = ctx.query.name
  await checkModel.findcheckByName([name]).then((result) => {
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
  insertData
}
