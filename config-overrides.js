const { injectBabelPlugin } = require('react-app-rewired');

const importAntd = [
  'import',
  { libraryName: 'antd-mobile', libraryDirectory: 'es', style: 'css' },
];
const moduleResolver = [
  'module-resolver',
  {
    alias: {
      src: './src',
    },
  },
];
const styledComponents = [
  'styled-components',
  {
    fileName: false,
  },
];
const babelPlugins = [importAntd, moduleResolver, styledComponents];

module.exports = function override(config) {
  return babelPlugins.reduce(
    (cfg, plugin) => injectBabelPlugin(plugin, config),
    config
  );
};
