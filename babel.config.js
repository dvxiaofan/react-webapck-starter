// babel.config.js

const isDEV = process.env.NODE_ENV === 'development'; // 判断是否是开发环境
module.exports = {
    // 执行顺序由右往左,所以先处理ts,再处理jsx,最后再试一下babel转换为低版本语法
    "presets": [
        [
            "@babel/preset-env",
            {
                // 设置兼容目标浏览器版本,这里可以不写,babel-loader会自动寻找上面配置好的文件.browserslistrc
                // "targets": {
                //  "chrome": 35,
                //  "ie": 9
                // },
                "useBuiltIns": "usage", // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
                "corejs": 3 // 配置使用core-js使用的版本
            }
        ],
        "@babel/preset-react",
        "@babel/preset-typescript"
    ],
    "plugins": [
        isDEV && require.resolve('react-refresh/babel'), // 开发环境下才使用react-refresh/babel
        ["@babel/plugin-proposal-decorators", { "legacy": true  }]
    ].filter(Boolean) // 过滤掉false,undefined,null等值
}
