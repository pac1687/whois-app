const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/lookup',
    createProxyMiddleware({
      target: `http://backend:8000`,
      changeOrigin: true,
    })
  );
};