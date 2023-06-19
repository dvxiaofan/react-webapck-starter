const prodConfig = require('./webpack.prod.js') // 生产环境配置
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin') // 打包速度分析
const smp = new SpeedMeasurePlugin() // 初始化
const { merge } = require('webpack-merge') // 合并配置

module.exports = smp.wrap(merge(prodConfig, {
    
})) // 合并配置并导出
