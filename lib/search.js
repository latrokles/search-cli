'use strict';

module.exports = {
  /**
   * return a list of all available services.
   * @return {array}
   */
  availableServices: function () {
  },

  list: function () {
    console.log('list all available services!');
    process.exit(0);
  },

  /**
   * configures new service in interactive mode.
   */
  configure: function () {
    console.log('configure new service!');
    process.exit(0);
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
