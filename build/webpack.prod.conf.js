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
    app: [resolve('src/index.js')]
  },
  output: {
    path: resolve('lib'),
    filename: 'vue-carousel-card.js',
    chunkFilename: '[id].js',
    libraryExport: 'default',
    library: 'VueCarouselCard',
    libraryTarget: 'commonjs2'
  },
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new UglifyJsPlugin({
      sourceMap: false
    })
  ]
})
