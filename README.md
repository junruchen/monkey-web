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
- [react-router 中文文档1](http://reacttraining.cn/)
- [react-router 中文文档2](http://react-guide.github.io/react-router-cn/docs/guides/basics/RouteConfiguration.html)

### 配置项
#### 1、Ant Design UI库引入
- `yarn add antd` 安装UI库
- `babel-plugin-import` 实现按需引入
- `react-app-rewire-less` 实现自定义主题

**config-overrides.js** 具体配置如下：
```
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  // 配置按需引入
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], // change importing css to less
    config,
  );
  // 配置自定义主题
  config = rewireLess.withLoaderOptions({
    modifyVars: { "@primary-color": "#1DA57A" },
    javascriptEnabled: true,
  })(config, env);
  return config;
};
```
**组件使用** 如下：
```
import React, { Component } from 'react';
import { Button } from 'antd'
import 'antd/dist/antd.less'

class App extends Component {
  render() {
    return (
        <Button type="primary">测试</Button>
    );
  }
}

export default App;
```

#### 2、引入 less
- 安装 `less` 和 `less-loader`
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


####  引入 react-router-dom 路由
`react-router-dom` 依赖 `react-router`，所以使用npm安装依赖的时候，只需要安装相应环境下的库即可，不用再显式安装react-router。


#### 引入 axios
在`package.json`底部增加以下代码解决跨域问题
```
"proxy": {
    "/api": {
      "target": "http://**********",
      "changeOrigin": true
    }
  }
```

#### 引入 stylus
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