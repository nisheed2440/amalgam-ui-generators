'use strict';

const cli = require('../lib/cli');

describe('@amalgam-ui/generate-container cli', () => {
  const argv = cli(process.cwd()).parse(['args']);
  console.log(argv);
  it('needs tests', () => {
    expect(true).toBe(true);
  });
});
