const generateVendor = require('../lib/generate-vendor');

describe('generate-vendor', () => {
  it('basic', () => {
    expect(generateVendor).toBeTruthy();
  });
});
