'use strict'
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  entry: resolve('src/demo/main.js'),
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true,
    overlay: {
      errors: true
    }
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('src/demo/index.html'),
      inject: true
    })
  ]
})
