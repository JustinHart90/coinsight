import webpack from 'webpack';
import path from 'path';
import WebpackConfig from 'webpack-config';
import ngAnnotatePlugin from 'ng-annotate-webpack-plugin';
import UglifyJsPlugin from 'webpack-uglify-js-plugin';

module.exports = new WebpackConfig().extend('./webpack.config.common.babel.js').merge({
  entry : path.join(__dirname,'/app/app.module.js'),
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ngAnnotatePlugin({
      add: true
    })
  ]
})
