const { exec } = require('child_process');
const path = require('path');
const cli = require('../lib/cli');
const generateContainer = require('../lib/generate-container');

// Mock the generator
jest.mock('../lib/generate-container', () => ({
  generateContainer: jest.fn(),
}));

describe('@amalgam-ui/generate-container cli', () => {
  it('should not have the parameters as expected', () => {
    const argv = cli(process.cwd()).parse(['']);
    expect(argv.containerName).toBe('');
    expect(argv.namespace).toBeUndefined();
    expect(argv.n).toBeUndefined();
    expect(argv.dest).toBe('packages/');
    expect(argv.d).toBe('packages/');
  });

  it('should have the parameters as expected', () => {
    const argv = cli(process.cwd()).parse([
      'Hello Component',
      '--namespace',
      '@test',
      '--dest',
      'test',
    ]);
    expect(argv.containerName).toBe('Hello Component');
    expect(argv.namespace).toBe('@test');
    expect(argv.n).toBe('@test');
    expect(argv.dest).toBe('test');
    expect(argv.d).toBe('test');
  });

  it('should show help info', done => {
    exec(`node ${path.resolve(__dirname, '../bin/generate-container')} --help`, (error, stdout) => {
      if (error) {
        throw error;
      }
      expect(stdout).toMatchSnapshot();
      done();
    });
  });

  it('should show version', done => {
    exec(
      `node ${path.resolve(__dirname, '../bin/generate-container')} --version`,
      (error, stdout) => {
        if (error) {
          throw error;
        }
        expect(stdout).toMatchSnapshot();
        done();
      }
    );
  });

  it('should call the generateContainer fn', () => {
    const argv = cli(process.cwd()).parse(['Hello Component', '--namespace', '@test']);
    expect(generateContainer.generateContainer).toHaveBeenCalledWith(argv);
  });
});
