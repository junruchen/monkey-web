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