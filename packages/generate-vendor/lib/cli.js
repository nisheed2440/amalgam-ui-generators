const yargs = require('yargs/yargs');
const { generateVendor } = require('./generate-vendor');

/**
 * Add cli functionality for vendor generator
 * @param {string} cwd The current working directory
 */
function cli(cwd) {
  const parser = yargs(null, cwd);

  parser.alias('h', 'help');
  parser.alias('v', 'version');

  // https://github.com/yargs/yargs/blob/master/docs/api.md#commandmodule
  parser.usage(
    '$0 <vendor-folder-name>',
    'Create vendor folder for Amalgam UI framework.',
    y => {
      return y
        .positional('vendor-folder-name', {
          describe: 'The name of the vendor folder',
          type: 'string',
        })
        .options('n', {
          alias: 'namespace',
          description: 'The namespace for the vendor package.json',
        })
        .options('d', {
          alias: 'dest',
          description: 'The destination path for the vendor files',
          default: 'packages/',
        });
    },
    argv => generateVendor(argv)
  );

  return parser;
}

module.exports = cli;
