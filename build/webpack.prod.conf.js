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
  entry: {
    'vue-carousel-card': resolve('src/index.js')
  },
  output: {
    path: resolve('lib'),
    filename: '[name].js',
    library: 'VueCarouselCard', // 指定的就是你使用require时的模块名
    libraryTarget: 'umd', // 指定输出格式
    umdNamedDefine: true
  },
  plugins: [
    new UglifyJsPlugin({
      sourceMap: false
    })
  ]
})
