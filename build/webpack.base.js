// webpack.base.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

console.log('NODE_ENV: ', process.env.NODE_ENV);
console.log('BUILD_ENV: ', process.env.BUILD_ENV);

module.exports = {
    entry: path.join(__dirname, '../src/index.tsx'),
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'static/js/[name].js',
        clean: true,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/, // 匹配文件
                use: 'babel-loader', // 使用的loader
            },
            {
                test: /.(css|less)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'], // 自动解析确定的扩展
    },
    plugins: [
        // 生成html文件
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../public/index.html'),
            inject: 'body',
        }),
        new webpack.DefinePlugin({
            'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
        })
    ]
}
