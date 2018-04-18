const user = require('./user')
const device = require('./device')
const check = require('./check')

module.exports = (app) => {
  app.use(user.routes())
  app.use(device.routes())
  app.use(check.routes())
}
