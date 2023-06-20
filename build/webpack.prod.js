const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

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
            filename: 'static/css/[name].[contenthash:8].css' // 打包后的文件路径 + 文件名 + 文件后缀
        })
    ],
    optimization: {
        minimizer: [
            new CssMinimizerWebpackPlugin(), // 压缩css
            new TerserWebpackPlugin({
                parallel: true, // 开启多进程并行压缩
                terserOptions: {
                    compress: {
                        pure_funcs: ['console.log'] // 去除console.log
                    }
                }
            })
        ]
    }
})
