const prodConfig = require('./webpack.prod.js') // 生产环境配置
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin') // 打包速度分析
const smp = new SpeedMeasurePlugin() // 初始化
const { merge } = require('webpack-merge') // 合并配置
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') // 打包分析

module.exports = smp.wrap(merge(prodConfig, {
    plugins: [
        new BundleAnalyzerPlugin() // 打包分析插件
    ]
})) // 合并配置并导出
