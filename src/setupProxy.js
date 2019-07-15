const proxy = require('http-proxy-middleware')
// import { config as dev } from './config/dev.env'
// import { config as prod } from './config/prod.env'
// console.log(dev)
const NODE_ENV = process.env.NODE_ENV
let hosturl
switch (NODE_ENV) {
  case 'development':
    hosturl = 'http://192.168.43.189:8080'
    break
  case 'production':
    hosturl = 'http://192.168.43.189:8080'
    break
}
console.log(NODE_ENV)
module.exports = function(app) {
  app.use(
    proxy("/api", {
      target: 'http://192.168.43.189:8080',
      changeOrigin: true,
      pathRewrite: {
        "^/api": 'http://192.168.43.189:8080'
      }
    })
  )
  app.use(
    proxy('/mock', {
      target: 'http://192.168.43.189:8080',
      changeOrigin: true,
      pathRewrite: {
        "^/mock": "http://192.168.43.189:8080"
      }
    })
  )
};