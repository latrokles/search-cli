'use strict';

const TEST_CONFIG_FILE = './test/test-config.json';

var expect = require('chai').expect;
var search = require('../lib/search');

describe('search', function () {
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

  describe('.getServiceURI(query, service)', function () {
    it('returns a fully constructed search uri for a given service', function () {
      var service = 'google';
      var query = 'what is the airspeed velocity of an unladen swallow?';
      var expected = 'https://www.google.com/search?q=what%20is%20the%20airspeed%20velocity%20of%20an%20unladen%20swallow%3F';

      var actual = search.getServiceURI(query, service);
      expect(actual).to.be.a('string');
      expect(actual).to.equal(expected);
    });

    it('returns null if service is not configured', function () {
      var serviceName = 'bogusService';
      var query = 'how do I search bogus service';

      var actual = search.getServiceURI(query, serviceName);
      expect(actual).to.equal(null);
    });
  });

  describe('.addNewService(name, url)', function () {
    it('adds a new service to the config file', function () {
      var serviceName = 'some service';
      var serviceURL = 'http://some-url.com/search?q=%s';

      var expectedCount = search.getAvailableServices().length + 1;
      search.addNewService(serviceName, serviceURL);

      var actualCount = search.getAvailableServices().length;
      expect(actualCount).to.equal(expectedCount);

      var expectedUri = 'http://some-url.com/search?q=question';
      var actualUri = search.getServiceURI('question', serviceName);
      expect(actualUri).to.equal(expectedUri);
    });
  });
});
