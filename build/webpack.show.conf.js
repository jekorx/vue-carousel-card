'use strict'
const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const pkgInfo = require('../package.json')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  entry: resolve('src/demo/main.js'),
  output: {
    filename: 'index.min.js',
    path: resolve('dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 模版
      template: resolve('src/demo/index.html')
    }),
    new UglifyJsPlugin({
      sourceMap: false
    })
  ]
})
