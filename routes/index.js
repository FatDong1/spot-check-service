const user = require('./user')
const deviceGroup = require('./deviceGroup')

module.exports = (app) => {
  app.use(user.routes())
  app.use(deviceGroup.routes())
}
