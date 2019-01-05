'use strict'
const path = require('path')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  entry: resolve('src/index.js'),
  output: {
    filename: 'vue-carousel-card.min.js',
    path: resolve('lib')
  },
  plugins: [
    new UglifyJsPlugin({
      sourceMap: false
    })
  ]
})
