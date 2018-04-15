var Koa = require('koa')
var path = require('path')
var bodyParser = require('koa-bodyparser')
var session = require('koa-session-minimal')
var MysqlStore = require('koa-mysql-session')
var config = require('./config/default.js')
var router = require('./routes/index')
var app = new Koa()


// session存储配置
const sessionMysqlConfig = {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST,
}

// 配置session中间件
app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig)
}))

app.use(bodyParser())

//  路由
router(app)

if (module.parent) {
  	module.exports = app;
}else{
	app.listen(4010)
}

console.log(`listening on port ${config.port}`)
