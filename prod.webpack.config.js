const webpack = require('webpack');

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
  }),
  new webpack.optimize.UglifyJsPlugin({
    parallel: true,
    uglifyOptions: {
      ie8: false,
    }
  })
];

const config = require("./base.webpack.config.js")

config.plugins.push(...plugins);

module.exports = config;