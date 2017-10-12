var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var NgTemplateLoader = require('ngtemplate-loader')

module.exports = {
  entry: {
    app: './src/app/app.module.js',
    vendor: [ 'angular' , 'angular-ui-router']
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js'
  },

  plugins: [
    new ExtractTextPlugin('src/stylesheets/home.css'),
    new HtmlWebpackPlugin({
      title: 'Home',
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      favicon: './src/images/favicon.ico'
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: ['auto-ngtemplate-loader', 'babel-loader']
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.html$/,
        exclude: [
          path.resolve(__dirname, '/node_modules/'),
          path.resolve(__dirname, './src/index.html')
        ],
        use: [
            {
                loader: 'ngtemplate-loader',
                options: {
                    relativeTo: path.resolve(__dirname, 'src/app/components')
                }
            },
            {
                loader: 'html-loader'
            }
        ]
      }
      // {
      //   test: /\.(png|svg|jpg|gif)$/,
      //   use: [
      //     'file-loader'
      //   ]
      // },
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/,
      //   use: [
      //     'file-loader'
      //   ]
      // }
    ]
  }
};
