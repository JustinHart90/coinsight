import webpack from 'webpack';
import path from 'path';
import WebpackConfig from 'webpack-config';

module.exports = new WebpackConfig().extend('./webpack.config.common.babel.js').merge({
  entry: {
    bundle: path.join(__dirname,'/app/app.module.js'),
    vendor: ['angular','angular-ui-router', 'localforage', 'angular-localforage']
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'app.[name].js'
  },
  devtool: '#eval',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor')
  ]
});
