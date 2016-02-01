
var expect = require('chai').expect;
var search = require('../lib/search');

const TEST_CONFIG_FILE = './test/test-config.json';

describe('Search', function () {
  before(function () {
    // overwrite configuration file for test purposes.
    search.configuration = TEST_CONFIG_FILE;
  });

  describe('.availableServices()', function () {
    it('returns non-empty array of configured services', function () {
      var services = search.availableServices();

      expect(services).to.be.a('array');
      expect(services).to.have.length.above(0);
      expect(services).to.include('amazon');
      expect(services).to.include('google');
    });
  });
});
