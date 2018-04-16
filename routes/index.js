const user = require('./user')
const deviceGroup = require('./device')

module.exports = (app) => {
  app.use(user.routes())
  app.use(deviceGroup.routes())
}
