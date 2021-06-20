const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/graphql',
    createProxyMiddleware({
      target: `http://backend:4000`,
      changeOrigin: true,
    })
  );
};