const prod = process.env.NODE_ENV === "production";
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const bundleName = prod ? '[name].[hash].js' : '[name].js'

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: bundleName,
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
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 9999
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body',
    })
  ]
}