'use strict';

const CONFIG_FILE = '~/.search-cli.json';

var querystring = require('querystring');
var util = require('util');

var config = require('./config');

module.exports = {

  /**
   * configuration file
   */
  configuration: CONFIG_FILE,

  /**
   * return a list of all available services.
   * @return {array}
   */
  getAvailableServices: function () {
    var configuredServices = config.load(this.configuration).services;
    return Object.getOwnPropertyNames(configuredServices);
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
   * resolves the query string to perform the final search
   * @param {string} serviceUrl
   * @param {string} query
   * @return {string}
   */
  resolveQuery: function (serviceUrl, query) {
    var escapedQuery = querystring.escape(query);
    return util.format(serviceUrl, escapedQuery);
  }
};
