const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        port: 3000, // 端口号
        hot: true, // 热更新
        open: true, // 自动打开浏览器
        compress: false, // gzip压缩
        historyApiFallback: true, // 404页面返回index.html
        static: {
            directory: path.join(__dirname, '../public'), // 静态文件目录
        }
    },
    plugins: [
        new ReactRefreshWebpackPlugin() // 热更新插件
    ]
})
