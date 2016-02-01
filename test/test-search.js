'use strict';

const TEST_CONFIG_FILE = './test/test-config.json';

var expect = require('chai').expect;
var search = require('../lib/search');

describe('Search', function () {
  before(function () {
    // overwrite configuration file for test purposes.
    search.configuration = function () {
      return TEST_CONFIG_FILE;
    };
  });

  describe('.getAvailableServices()', function () {
    it('returns non-empty array of configured services', function () {
      var services = search.getAvailableServices();

      expect(services).to.be.a('array');
      expect(services).to.have.length.above(0);
      expect(services).to.include('amazon');
      expect(services).to.include('google');
    });
  });

  describe('.buildSearchURI(serviceUrl, query)', function () {
    it('returns a fully constructed query url', function () {
      var url = 'https://www.google.com/search?q=%s';
      var query = 'how to send 5.12';

      var expected = 'https://www.google.com/search?q=how%20to%20send%205.12';
      var actual = search.buildSearchURI(url, query);
      expect(actual).to.be.a('string');
      expect(actual).to.equal(expected);
    });
  });
});
