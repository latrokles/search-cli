
var expect = require('chai').expect;
var search = require('../lib/search');
var fs = require('fs');

const CONFIG_FILE = './config.json';
const TEST_CONFIG_FILE = './test/test-config.json';

describe('Search', function () {
  before(function () {
    // copy config file to staging area
    fs
      .createReadStream(CONFIG_FILE)
      .pipe(fs.createWriteStream(TEST_CONFIG_FILE));

    // overwrite configuration file for test purposes.
    search.configuration = TEST_CONFIG_FILE;
  });

  after(function () {
    // remove the config file from staging area
    fs.unlinkSync(TEST_CONFIG_FILE);
  });

  describe('.availableServices()', function () {
    it('returns non-empty array of configured services', function () {
      var services = search.availableServices();

      expect(services).to.be.a('array');
      expect(services).to.have.length.above(0);
    });
  });
});
