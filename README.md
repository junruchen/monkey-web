# monkey-web
负责前端页面渲染，单页面应用

### 项目生成
- 使用 `Create React App` 生成项目
- 安装 `react-router-dom` 引入路由
- 安装 `axios`

### 参考文档

- [create-react-app](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md)
- [react-router 中文文档](http://reacttraining.cn/)
- [react 文档](https://doc.react-china.org/docs/hello-world.html)

### 配置项
#### 引入stylus
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