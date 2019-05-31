# 使用 webpack 搭建一个简单的 React 脚手架

## 创建项目目录

在合适的位置创建一个项目目录, 可以叫做`react-webpack-starter`,然后使用 `npm init` 进行初始化,因为我们要用 node 进行包管理

## 安装所需依赖

### 安装 React

```
npm install react react-dom
```
### 安装 webpack

```
npm install webpack webpack-cli --save-dev
```

使用 `webpack-cli`方便的可以在命令行中执行`webpack`命令, 因为是开发环境使用,所以命令后面加上了 `--save-dev`

### 安装 webpack-dev-server  

```
npm install webpack-dev-server --save-dev
```

使用`webpack-dev-server`可以快速启动一个简易的 web 服务器, 使得我们在修改文件后会自动执行 webpack 的编译操作并且自动刷新浏览器, 不再需要我们手动操作刷新.

### 安装插件和其他 loader

```
npm install webpack-html-plugins style-loader css-loader --save-dev
```

使用`webpack-html-plugins`可以自动生成`index.html`文件, 并会在`index.html`中自动添加对 bundle 文件的引用;
使用`style-loader` 和 `css-loader` 可以方便加载 CSS 文件

### 安装 babel 

```
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader
```

因为 React 中会使用 class, import 等等 ES6 的语法, 为了提高项目浏览器兼容性,我们需要用 babel 打包转换一下;
`@babel/core`是 babel 的核心模块, 具有 babel 的核心功能;
`@babel/preset-env` 用来转换 ES6 以及更新的 js 语法,并且可根据需要兼容的浏览器来自动选加载 plugin 之后精简生产的代码;
`@babel/preset-react` 具有 babel 转换 React 所需plugin;
`babel-loader` 是 webpack 的 babel 加载器;

## 配置 webpack
安装好所有依赖, 就开始配置 webpack 了;
首先在项目文件夹下创建一个`webpack.config.js`文件

cd 到根目录

```
mkdir webpack.config.js
```

可以使用 VSCode 打开, 并编辑内容如下

```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


let config = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_module/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                // 多个 loader 的时候执行顺序和排列顺序相反
                use: ['style-loader', 'css-loader'] 
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
        // 使用自定义模板来生成 HTML 文件
            template: './src/index.html'
        })
    ]
}

module.exports = config;
```

创建所使用的 HTML 模板文件, cd 到根目录,然后执行如下命令

```
mkdir src && cd src && touch index.html
```

打开`index.html`文件, 编辑内容如下:

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>React-Starter</title>
</head>
<body>
    <div id="app"></div>
</body>
</html>
```

## 配置 babel

cd 到项目根目录,然后执行如下命令, 新建 `.babelrc`文件, 

``` 
touch .babelrc
```

打开并编辑配置安装的两个`babel preset`

```
{
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
    ]
}
```

## 生成 React 应用的根节点

### 创建一个 APP 组件文件
cd 到 项目根目录, 然后执行以下命令:

```
mkdir components && cd components && touch App.jsx App.css
```

打开 App.jsx 并编辑:

```
import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
    render() {
        return (
            <div>
                my react-webpack-start
            </div>
        )
    }
}
```

打开 App.css 并编辑:

```
body {
    font-size: 30px;
    text-align: center;
    font-weight: bolder;
    color: #00f;
    text-transform: uppercase;
}
```

cd 到 src 目录,然后执行以下命令:

```
touch index.jsx
```

打开并编辑成如下内容:

```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';


ReactDOM.render( <App />, document.getElementById('app'));
```

## 配置`package.json`

在 `package.json`文件中的`scripts`配置里添加如下两条语句,(如果没有 scripts 项可以手动添加), 用来快速运行开发服务器和上线打包操作:

```
"start": "webpack-dev-server --mode development --open --hot",
"build": "webpack --mode production"
```

> 启用了`webpack-dev-server`的 模块热更新功能, 更加提升开发效率.

## 预览脚手架项目

cd 到项目根目录, 然后执行

```
npm run start
```

你会看到如下命令执行, 并且自动为你在浏览器打开了项目的预览窗口

![终端命令](http://ww1.sinaimg.cn/large/6b65559dgy1g3kfu87vaij20pb0fkafa.jpg)

预览窗口

![预览窗口](http://ww1.sinaimg.cn/large/6b65559dgy1g3kfu86f2nj210e0n7myw.jpg)


至此, 一个机遇 webpack 的 React 项目脚手架就搭建完成了
