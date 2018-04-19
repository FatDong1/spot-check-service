let checkModel = require('../models/check')

async function insertData (ctx) {
  let result = ctx.request.body
  let times = result.checkerId.length
  let createDate = Date.now()
  for (let i = 0; i < times; i++) {
    let value = [result.name, result.number, result.element, result.unit, result.special, result.norm,  result.method, result.tool, result.cycle,result.checkerId[i], result.deviceId, createDate, result.startDate]
    await checkModel.insertData(value).then((result) => {
      ctx.body = {
        code: 0,
        data: {
          msg: '点检添加成功'
        }
      }
    }).catch((err) => {
      console.log(err)
      ctx.body = {
        code: -1,
        data: {
          msg: '点检添加失败'
        }
      }
    })
  }
}

async function findcheckByDevice (ctx) {
  await checkModel.findcheckByDevice([ctx.query.deviceId]).then((result) => {
    ctx.body = {
      code: 0,
      data: {
        value: result
      }
    }
  }).catch((err) => {
    ctx.body = {
      code: 0,
      data: {
        value: err
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
  insertData,
  findcheckByDevice
}
