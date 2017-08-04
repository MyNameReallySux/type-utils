const path = require('path')
const app_path = path.resolve(__dirname, '../')
const env = process.env.NODE_ENV || 'development'

module.exports = {
  build: env,
  port: env === 'production' ? process.env.PORT : 4000,
  is_prod: env === 'production',
  is_dev: env === 'development',
  paths: {
    build: path.resolve(app_path, 'dist'),
    main: path.resolve(app_path, 'src', 'index.js'),
    node_modules: path.resolve(app_path, 'node_modules'),
  }
}
