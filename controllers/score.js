let scoreModel = require('../models/score')


async function insertData (ctx) {
  let body = ctx.request.body
  await scoreModel.insertData([body.total, body.attitude, body.attendance, body.ability, body.efficiency, body.assessDate, body.userId]).then((result) => {
    ctx.body = {
      code: 0,
      data: {
        msg: '评分成功'
      }
    }
  })
}

async function findScores (ctx) {
  let checkerId = ctx.query.checkerId
  await scoreModel.findScores([checkerId]).then((result) => {
    console.log(result)
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

module.exports = {
  insertData,
  findScores
}
