const proxy = require('http-proxy-middleware'); // eslint-disable-line

module.exports = function setupProxy(app) {
  app.use(proxy('/api', { target: 'http://localhost:6000/' }));
  app.use(proxy('/events', { target: 'ws://localhost:6000/', ws: true }));
};
