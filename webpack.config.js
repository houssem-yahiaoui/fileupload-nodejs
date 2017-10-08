const webpack = require('webpack');

module.exports = {
  entry: ['./src/App'],
  output: {
    path: __dirname,
    filename: "./public/bundle.js"
  },
  resolve: {
    extensions:[".js",".jsx"]
  },
  module: {
    rules: [
      {
        loaders: 'babel-loader',
        exclude: /(node_modules)/
      }
    ]
  }
}
