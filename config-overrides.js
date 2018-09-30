/* eslint-disable */
const { injectBabelPlugin } = require('react-app-rewired');

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
const babelPlugins = [moduleResolver, styledComponents];

module.exports = function override(config) {
  return babelPlugins.reduce(
    (cfg, plugin) => injectBabelPlugin(plugin, config),
    config
  );
};
