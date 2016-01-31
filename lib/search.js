'use strict';

module.exports = {
  /**
   * return a list of all available services.
   * @return {array}
   */
  availableServices: function () {
    return [];
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
  }
};
