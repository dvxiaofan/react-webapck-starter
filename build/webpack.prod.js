const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const globAll = require('glob-all');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

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
                    },
                },
            ],
        }),
        // 分离css
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css', // 打包后的文件路径 + 文件名
                                                              // + 文件后缀
        }),
        // 去除无用的css
        new PurgeCSSPlugin({
            paths: globAll.sync([
                // 指定要做CSS TreeShaking的路径文件
                `${path.join(__dirname, '../src')}/**/*.tsx`,
                // 指定html文件，主要是为了解析html文件中的className
                path.join(__dirname, '../public/index.html'),
            ]),
            safelist: {
                // 保留antd和iconfont的样式
                standard: [/^ant-/, /^iconfont/, /^icon-/,],
            }
        }),
        // 开启gzip压缩
        new CompressionWebpackPlugin({
            test: /\.(js|css)$/, // 匹配文件名
            filename: '[path][base].gz', // 压缩后的文件名(保持原文件名，后缀加.gz)
            algorithm: 'gzip', // 压缩算法
            threshold: 10240, // 对超过10kb的数据进行压缩
            minRatio: 0.8, // 压缩比例，值为0 ~ 1
        }),
    ],
    optimization: {
        minimizer: [
            new CssMinimizerWebpackPlugin(), // 压缩css
            new TerserWebpackPlugin({
                parallel: true, // 开启多进程并行压缩
                terserOptions: {
                    compress: {
                        pure_funcs: ['console.log'], // 去除console.log
                    },
                },
            }),
        ],
        splitChunks: { // 分割代码块
            cacheGroups: { // 缓存组
                vendors: { // 第三方模块
                    test: /node_modules/, // 匹配规则
                    name: 'vendors', // 分割后的文件名
                    minChunks: 1, // 最小分割数量
                    chunks: 'initial', // 刚开始就分割
                    minSize: 0, // 最小体积
                    priority: 1, // 优先级
                },
                commons: { // 公共模块
                    name: 'commons',
                    minChunks: 2, // 最小分割数量
                    chunks: 'initial', // 刚开始就分割
                    minSize: 0, // 最小体积
                },
            },
        },
    },
})
