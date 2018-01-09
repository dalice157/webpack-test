const path = require('path');
const webpack = require('webpack');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/',
  hot: true,
  headers: {'Access-Control-Allow-Origin': '*'},
  inline: true,
  historyApiFallback: true,
  watchOptions: {
    poll: 500
  }
}));

app.use(webpackHotMiddleware(compiler));

app.listen(3000, () => {
  console.log('server is runing at http://localhost:3000')
});