// Node Modules
const path = require('path')

// Installed Packages
const Webpack = require('webpack')

// Local Packages
const env = require('./config/environment')
const paths = env.paths

const config = {
  entry: [
    paths.main
  ],
  output: {
    path: paths.build,
    filename: 'js/app.bundle.js'
  },
  module: {
    loaders: [{
      enforce: 'pre',
      test: /\.js$/,
      exclude: [paths.node_modules],
      loader: 'eslint-loader'
    }, {
      test: /\.js$/,
      exclude: [paths.node_modules],
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new Webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ]
}

module.exports = config
