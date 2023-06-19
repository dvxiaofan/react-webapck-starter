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
                include: path.resolve(__dirname, '../src'), // 指定检查的目录
                test: /\.(ts|tsx)$/, // 匹配文件
                use: ['thread-loader', 'babel-loader'],
            },
            {
                test: /.css$/, // 匹配css文件
                include: path.resolve(__dirname, '../src'), // 指定检查的目录
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
                type: 'asset', // 依赖于webpack5, 会根据文件大小自动在base64和文件之间切换
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // 10kb 以下的图片会被转为base64
                    }
                },
                generator: {
                    // 打包后的文件路径 + 文件名 + hash值 + 文件后缀
                    filename: 'static/images/[name].[hash:6][ext]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/, // 匹配字体文件
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // 10kb 以下的会被转为base64
                    }
                },
                generator: {
                    // 打包后的文件路径 + 文件名 + hash值 + 文件后缀
                    filename: 'static/fonts/[name].[hash:6][ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // 10kb 以下的会被转为base64
                    }
                },
                generator: {
                    // 打包后的文件路径 + 文件名 + hash值 + 文件后缀
                    filename: 'static/media/[name].[hash:6][ext]'
                }
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'], // 自动解析确定的扩展
        alias: {
            '@': path.join(__dirname, '../src') // 配置@指向src目录
        },
        modules: [path.resolve(__dirname, '../node_modules')], // 指定第三方模块的绝对路径
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
    ],
    cache: {
        type: 'filesystem', // 使用文件缓存
    }
}
