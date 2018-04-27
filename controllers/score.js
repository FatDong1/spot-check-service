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


module.exports = {
  insertData
}
