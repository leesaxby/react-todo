const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
    devtool: 'eval',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
    },
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        host: '0.0.0.0',
        disableHostCheck: true,
        port: 9999,
        hot: true
    }
});