const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(proxy('/api', { target: 'http://localhost:7001' }));
  app.use(proxy('/m', { target: 'http://localhost:7001' }));
}