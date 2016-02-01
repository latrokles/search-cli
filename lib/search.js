'use strict';

const CONFIG_FILE = '.search-cli.json';

var path = require('path');
var querystring = require('querystring');
var util = require('util');

var config = require('./config');

module.exports = {

  /**
   * configuration file
   */
  configuration: function () {
    var platform = process.platform;
    var homeDir = process.env[(platform === 'win32') ? 'USERPROFILE' : 'HOME'];
    return [homeDir, CONFIG_FILE].join(path.sep);
  },

  /**
   * return a list of all available services.
   * @return {array}
   */
  getAvailableServices: function () {
    var configuredServices = config.load(this.configuration()).services;
    return Object.getOwnPropertyNames(configuredServices).sort();
  },

  /**
   * adds new service
   * @param {string} name
   * @param {string} url
   */
  addNewService: function (name, url) {
    var configContents = config.load(this.configuration());
    configContents.services[name] = {url: url};
    config.store(this.configuration(), configContents);
  },

  /**
   * builds the search URI given the service and quer
   * @param {string} query
   * @param {string} service
   * @return {string}
   */
  getServiceURI: function (query, service) {
    service = typeof service === 'undefined' ? 'google' : service;
    var configuredServices = config.load(this.configuration()).services;

    if (configuredServices[service] === undefined) {
      return null;
    }

    var serviceURL = configuredServices[service].url;
    return this.buildSearchURI(serviceURL, query);
  },

  /**
   * builds the URI to perform the final search
   * @param {string} serviceUrl
   * @param {string} query
   * @return {string}
   */
  buildSearchURI: function (serviceUrl, query) {
    var escapedQuery = querystring.escape(query);
    return util.format(serviceUrl, escapedQuery);
  }
};
