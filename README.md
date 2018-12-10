# monkey-web
负责前端页面渲染，单页面应用

### 项目生成
- 使用 `Create React App` 生成项目

### 项目部署
- 本地开发 `yarn start`
- 线上部署 `yarn build`

### 参考文档
- [react 文档](https://doc.react-china.org/docs/hello-world.html)
- [react-router 中文文档1](http://reacttraining.cn/)
- [react-router 中文文档2](http://react-guide.github.io/react-router-cn/docs/guides/basics/RouteConfiguration.html)
- [create-react-app](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md)

### 配置项
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