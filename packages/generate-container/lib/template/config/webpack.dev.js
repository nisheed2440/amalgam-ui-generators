const merge = require('webpack-merge');
const common = require('./common.js');

module.exports = merge.multiple(common, [
  {
    mode: 'development',
    devtool: 'source-map',
  },
  {
    mode: 'development',
    devtool: 'source-map',
  },
]);
