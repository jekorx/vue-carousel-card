'use strict'
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  output: {
    filename: '[name].[hash:6].js',
    path: resolve('dist')
  },
  resolve: {
    extensions: ['.js', '.vue'],
    modules: [
      resolve('node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src')
        ]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
