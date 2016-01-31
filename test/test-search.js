
var expect = require('chai').expect;
var search = require('../lib/search');

describe('Search', function () {
  describe('.availableServices()', function () {
    it('returns non-empty array of configured services', function () {
      var services = search.availableServices();

      expect(services).to.be.a('array');
      expect(services).to.have.length.above(0);
    });
  });
});
