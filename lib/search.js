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
    console.log('adding support for ' + name + ' using url ' + url);
  },

  /**
   * runs query by building the query url and opening a browser window with
   * the results.
   */
  query: function (query, service) {
    service = typeof service === 'undefined' ? 'google' : service;
    console.log('querying ' + service + ' with: ' + query.join(' '));
    process.exit(0);
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
