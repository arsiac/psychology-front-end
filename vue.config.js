'use strict'
// const path = require('path')
//
// function resolve (dir) {
//   return path.join(__dirname, '..', dir)
// }

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  lintOnSave: true,
  productionSourceMap: false,
  runtimeCompiler: false,
  devServer: {
    port: 9000,
    open: true,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  configureWebpack: {
    name: 'Psychology',
    resolve: {
      alias: {
        // '@':resolve('src')
      }
    }
  }
}
