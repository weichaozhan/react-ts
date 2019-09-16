const express = require('express');
const webpack = require('webpack');
const merge = require('webpack-merge');
const chalk = require('chalk');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const SimpleProgressWebpackPlugin = require( 'simple-progress-webpack-plugin' );
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const proxy = require('http-proxy-middleware');
const history = require('connect-history-api-fallback');

const port = process.env.PORT || 3009;
const app = express();
const config = merge(require('./webpack.config.js'), {
  devtool: 'cheap-module-source-map',
})

config.plugins = config.plugins.concat([
  new SimpleProgressWebpackPlugin({
    format: 'compact',
  }),
  new FriendlyErrorsWebpackPlugin({
    compilationSuccessInfo: {
      notes: [chalk.green(`Application is running here http://localhost:${process.env.PORT}`)],
    },
  }),
  // new OpenBrowserPlugin({ 
  //   url: `http://localhost:${process.env.PORT}`, 
  // }),
]);

const compiler = webpack(config);

app.use(history());

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  hot: true,
  logLevel: 'silent',
}));
app.use(webpackHotMiddleware(compiler));

var proxyObj = {

  target: `http://localhost:9001`, // 本地 mock server
  
  // router: {
  //   '/i/song.mp3': 'http://www.w3school.com.cn',
  // },
  changeOrigin: true,
  onProxyReq(proxyReq, req, res) {
    proxyReq.setHeader('Cookie', 'name=weichaozhan',);
  },
}

var filter = function (pathname, req) {
  return ((pathname.match('^/') && req.method === 'GET') || req.method !== 'GET');
};

app.use(proxy(filter, proxyObj));

// Serve the files on port 3001.
app.listen(port, function() {
});