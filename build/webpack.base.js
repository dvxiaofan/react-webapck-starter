// webpack.base.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
                test: /\.(js|jsx|ts|tsx)$/, // 匹配文件
                use: {
                    loader: 'babel-loader', // 使用babel-loader处理
                    options: {
                        // 预设执行顺序由右往左,所以先处理ts,再处理jsx
                        presets: [
                            '@babel/preset-react',
                            '@babel/preset-typescript'
                        ]
                    }
                }
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
        })
    ]
}
