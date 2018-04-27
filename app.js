var Koa = require('koa')
var path = require('path')
var bodyParser = require('koa-bodyparser')
var session = require('koa-session-minimal')
var MysqlStore = require('koa-mysql-session')
var config = require('./config/default.js')
var router = require('./routes/index')
var app = new Koa()

app.use(bodyParser())

//  路由
router(app)

if (module.parent) {
  	module.exports = app;
}else{
	app.listen(4010)
}

console.log(`listening on port ${config.port}`)
