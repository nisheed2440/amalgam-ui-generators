const { exec } = require('child_process');
const path = require('path');
const cli = require('../lib/cli');
const generateVendor = require('../lib/generate-vendor');

// Mock the generator
jest.mock('../lib/generate-vendor', () => ({
  generateVendor: jest.fn(),
}));

describe('@amalgam-ui/generate-vendor cli', () => {
  it('should not have the parameters as expected', () => {
    const argv = cli(process.cwd()).parse(['']);
    expect(argv.vendorFolderName).toBe('');
    expect(argv.namespace).toBeUndefined();
    expect(argv.n).toBeUndefined();
    expect(argv.dest).toBe('packages/');
    expect(argv.d).toBe('packages/');
  });

  it('should have the parameters as expected', () => {
    const argv = cli(process.cwd()).parse([
      'Test Vendor',
      '--namespace',
      '@test',
      '--dest',
      'test',
    ]);
    expect(argv.vendorFolderName).toBe('Test Vendor');
    expect(argv.namespace).toBe('@test');
    expect(argv.n).toBe('@test');
    expect(argv.dest).toBe('test');
    expect(argv.d).toBe('test');
  });

  it('should show help info', done => {
    exec(`node ${path.resolve(__dirname, '../bin/generate-vendor')} --help`, (error, stdout) => {
      if (error) {
        throw error;
      }
      expect(stdout).toMatchSnapshot();
      done();
    });
  });

  it('should show version', done => {
    exec(`node ${path.resolve(__dirname, '../bin/generate-vendor')} --version`, (error, stdout) => {
      if (error) {
        throw error;
      }
      expect(stdout).toMatchSnapshot();
      done();
    });
  });

  it('should call the generateVendor fn', () => {
    const argv = cli(process.cwd()).parse(['Test Vendor', '--namespace', '@test']);
    expect(generateVendor.generateVendor).toHaveBeenCalledWith(argv);
  });
});
