const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(baseConfig, {
    mode: 'production',
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../public'),
                    to: path.resolve(__dirname, '../dist'),
                    filter: source => {
                        return !source.includes('index.html'); // 过滤掉index.html
                    }
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].css' // 打包后的文件路径 + 文件名 + 文件后缀
        })
    ]
})
