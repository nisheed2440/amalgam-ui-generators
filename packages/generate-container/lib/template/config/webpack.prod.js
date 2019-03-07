const merge = require('webpack-merge');
const common = require('./common.js');

module.exports = merge.multiple(common, [
  {
    mode: 'production',
  },
  {
    mode: 'production',
  },
]);
