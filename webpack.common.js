const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: [
        'react-hot-loader/patch',
        './index.js',
    ],
    output: {
        publicPath: '/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.jsx$/,
            loader: 'babel-loader',
            exclude: /node_modules/
      }]
  },
  plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
          template: 'index.html',
          inject: 'body',
    })
  ]
};