const yargs = require('yargs');
const { generateContainer } = require('./generate-container');

/**
 * Add cli functionality for container generator
 * @param {string} cwd The current working directory
 */
function cli(cwd) {
  const parser = yargs(null, cwd);

  parser.alias('h', 'help');
  parser.alias('v', 'version');

  // https://github.com/yargs/yargs/blob/master/docs/api.md#commandmodule
  parser.usage(
    '$0 <container-name>',
    'Create container for Amalgam UI framework.',
    y => {
      return y
        .positional('container-name', {
          describe: 'The name of the container',
          type: 'string',
        })
        .options('n', {
          alias: 'namespace',
          description: 'The namespace for the container package.json',
        })
        .options('d', {
          alias: 'dest',
          description: 'The destination path for the container',
          default: 'packages/',
        });
    },
    argv => generateContainer(argv)
  );

  return parser;
}

module.exports = cli;
