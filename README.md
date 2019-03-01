# monkey-web
负责前端页面渲染，单页面应用

### 项目生成
- `create-react-app monkey-web` 生成项目
- `cd monkey-web` 进入项目
- `yarn start` 启动项目

### 项目部署
- 本地开发 `yarn start`
- 线上部署 `yarn build`

### 参考文档
- [react 英文文档](https://reactjs.org/docs/getting-started.html)
- [create-react-app](https://facebook.github.io/create-react-app/docs/getting-started)
- [ant UI库的配置参考](https://blog.csdn.net/qwe502763576/article/details/83242823)
- [react-router 英文](https://reacttraining.com/react-router/web/example/basic)
- [react-router 中文](http://router.happyfe.com/web/guides/quick-start)

### 配置项
#### 1、Ant Design UI库引入
- `yarn add antd` 安装UI库
- `yarn add babel-plugin-import` 实现按需引入

**package.json/babel** 中增加如下内容：
```
"plugins": [
    [
        "import",
        {
            "libraryName": "antd",
            "libraryDirectory": "es",
            "style": "css"
        }
    ]
]
```
**组件使用** 如下：
```
import React, { Component } from 'react';
import { Button } from 'antd'
import 'antd/dist/antd.css'

class App extends Component {
  render() {
    return (
        <Button type="primary">测试</Button>
    );
  }
}

export default App;
```
此时可以使用UI库的默认样式

#### 2、自定义Ant Design UI库样式
- 安装 `less` 和 `less-loader`
- 使用命令 `yarn run eject` 暴露配置文件
- 在 `webpack.config.dev.js` 与 `webpack.config.prod.js` 中做如下修改：

**a) 创建 `antModifyVars.js` 文件**
```
'use strict';

const modifyVars = {
  'primary-color': '#E26A6A',
}

module.exports = modifyVars;
```

**b) 创建 `less` 相关变量**，参考默认sass的配置：
```
// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

// 增加less部分
const lessRegex = /\.less/;
const lessModuleRegex = /\.module\.less$/;
```

**c) 在 `module.rules` 的 `oneOf` 下**， 仿照sass追加一下代码：
```
// Opt-in support for LESS (using .less extensions).
// Chains the less-loader with the css-loader and the style-loader
// to immediately apply all styles to the DOM.
// By default we support LESS Modules with the
// extensions .module.scss or .module.sass
{
    test: lessRegex,
    exclude: lessModuleRegex,
    use: getStyleLoaders({ importLoaders: 2 }, 'less-loader'),
},
// Adds support for CSS Modules, but using SASS
// using the extension .module.scss or .module.sass
{
    test: lessModuleRegex,
    use: getStyleLoaders(
    {
        importLoaders: 2,
        modules: true,
        getLocalIdent: getCSSModuleLocalIdent,
    },
    'less-loader'),
},
```
**d) 在 `getStyleLoaders` 中**，处理 `less-loader`
```
// dev下的配置
if (preProcessor) {
    let loader = require.resolve(preProcessor)
    if (preProcessor === "less-loader") {
        loader = {
            loader,
            options: {
                modifyVars: modifyVars,
                javascriptEnabled: true,
            }
        }
    }
    loaders.push(loader);
}

// prod下的配置
if (preProcessor) {
    loaders.push({
        loader: require.resolve(preProcessor),
        options: {
            sourceMap: shouldUseSourceMap,
        },
    });
    if (preProcessor === "less-loader") {
        if (preProcessor === "less-loader") {
            loader.options.modifyVars = modifyVars
            loader.options.javascriptEnabled = true
        }
    }
    loaders.push(loader);
  }

```

####  3、ES6 API支持，引入polyfills
增加低版本浏览器、IE浏览器对ES6API的支持，IE9，IE9+

**方法一，安装 `yarn add react-app-polyfill`**
```
// src/index.js中的【第一行】引入对IE9及更高版本的支持
import 'react-app-polyfill/ie9';

// 其他支持，如：对IE11及更高版本的支持
import 'react-app-polyfill/ie11';
```

**方法二，安装 `yarn add babel-polyfill`**
```
// webpack.base.conf.js中引入：
require("babel-polyfill")

// webpack.base.conf.js中配置：
entry: { app: ['babel-polyfill', './src/main.js'] }
```

####  4、引入 react-router-dom 路由
- `react-router-dom` 依赖 `react-router`，所以使用npm安装依赖的时候，只需要安装相应环境下的库即可，不用再显式安装react-router。
- 由于需要权限配置，所以增加`AuthorizedRoute.js`控制权限

####  5、配置别名，@ 指向 src 目录
webpack.base.conf.js 与 webpack.base.conf.js的配置一致，如下：
```
定义resolvePath方法，新版中resolve名称被占用
function resolvePath (dir) {
  return path.join(__dirname, '..', dir)
}

// resolve.alias中增加别名配置：
'@': resolvePath('src')
```

#### 6、引入 axios
在`package.json`底部增加以下代码解决跨域问题
```
// 新版本需要借助http-proxy-middleware，在src下创建setupProxy.js，内容：
// 会自动引用，不需要额外的配置
const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    proxy(
      '/api', {
        target: 'http://**********',
        changeOrigin: true
      }
    )
  )
}
```
#### 7、样式处理
使用react-css-modules实现组件内部样式与外部分离，使用方式：
```
import React from 'react'
import CSSModules from 'react-css-modules';
import { Button } from 'antd'
import styles from './Header.module.scss'

class Header extends React.Component {
  render () {
    return (
      <div>
        <Button type="primary" className="nowrap" styleName="test">测试</Button>
      </div>
    )
  }
}
export default CSSModules(Header, styles)
```
**注意**：
- 由于最新版create-react-app已经实现配置，无需再修改webpack配置文件
- 上述方法可实现，同时使用antd样式、全局样式、组件私有样式
- 特别注意组件私有样式文件的命名`[name].module.scss`

####  other: 针对create-react-app 2.1.1之前的版本，引入 stylus
- 安装 `stylus` 和 `stylus-loader`
- 使用命令 `yarn run eject` 暴露配置文件
- 在 `webpack.config.dev.js` 与`webpack.config.prod.js` 的 `module/rules/oneOf` 中修改一下代码：
```
{
    test: /\.(css|styl)$/,
        use: [
            require.resolve('style-loader'),
            {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
            },
            {
                loader: require.resolve('postcss-loader'),
                options: {
                    // Necessary for external CSS imports to work
                    // https://github.com/facebookincubator/create-react-app/issues/2677
                    ident: 'postcss',
                    sourceMap: true,
                    plugins: () => [
                        require('postcss-flexbugs-fixes'),
                        autoprefixer({
                            browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9', // React doesn't support IE8 anyway
                        ],
                        flexbox: 'no-2009',
                    }),
                ],
            },
        },
        {
            loader: require.resolve('stylus-loader'),
            options: {
                sourceMap: true,
            }
        },
    ],
},
```