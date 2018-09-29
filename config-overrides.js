/* eslint-disable */
const { injectBabelPlugin } = require('react-app-rewired');

module.exports = function override(config) {
  config = injectBabelPlugin(
    [
      'module-resolver',
      {
        alias: {
          src: './src',
        },
      },
    ],
    config
  );
  return config;
};
