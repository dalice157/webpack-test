const path = require('path');
const express = require('express');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.dev.config.js');

const app = express();
const compiler = webpack(webpackConfig);

webpackConfig.entry.Dev = [
  'webpack/hot/dev-server', 
  'webpack-hot-middleware/client?http://localhost:3000'
];
webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

app.use(webpackDevMiddleware(compiler, {
  // publicPath: '/',
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true 
  },
  noInfo: true,
  hot: true,
  inline: true
}));

app.use(webpackHotMiddleware(compiler));

app.listen("3000", (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(' start server at port ' +'3000');
});