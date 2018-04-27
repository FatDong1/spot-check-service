let checkModel = require('../models/check')
let workModel = require('../models/work')
let uuid = require('node-uuid');  

async function insertData (ctx) {
  let result = ctx.request.body
  let times = result.checkerId.length
  let createDate = new Date()
  let startDate = new Date(result.startDate)
  let flag = false
  if (createDate.getFullYear() === startDate.getFullYear() && createDate.getMonth() === startDate.getMonth() && createDate.getDate() === startDate.getDate()) {
    flag = true
  }
  for (let i = 0; i < times; i++) {
    let spotId = uuid.v1()
    let value = [spotId, result.name, result.number, result.element, result.unit, result.special, result.norm, result.normType, result.normOptions, result.method, result.tool, result.deviceState, result.cycle,result.checkerId[i], result.deviceId, createDate, startDate]
    Promise.all([
      await checkModel.insertData(value),
      flag ? await workModel.insertData([spotId]) : ''
    ]).then(() => {
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

async function updateData (ctx) {
  let result = ctx.request.body
  let times = result.checkerId.length
  let createDate = new Date()
  let startDate = new Date(result.startDate)
  let flag = false
  if (createDate.getFullYear() === startDate.getFullYear() && createDate.getMonth() === startDate.getMonth() && createDate.getDate() === startDate.getDate()) {
    flag = true
  }
  for (let i = 0; i < times; i++) {
    let value = [result.name, result.number, result.element, result.unit, result.special, result.norm, result.normType, result.normOptions, result.method, result.tool, result.deviceState, result.cycle,result.checkerId[i], result.deviceId, createDate, startDate, result.id]
    Promise.all([
      await checkModel.updateData(value),
      flag ? await workModel.insertData([result.id]) : ''
    ]).then(() => {
      ctx.body = {
        code: 0,
        data: {
          msg: '点检计划编辑成功'
        }
      }
    }).catch((err) => {
      console.log(err)
      ctx.body = {
        code: -1,
        data: {
          msg: '点检编辑失败'
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
  findcheckByDevice,
  updateData
}
