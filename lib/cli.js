'use strict';

const LIST_SERVICES_MESSAGE = 'You can search the following services';
const NEW_SERVICES_INPUT_MESSAGE = 'Enter new service information: ';
const CONFIGURE_SERVICE_MESSAGE = 'Use --configure to add it as a new service';
const CONFIGURE_SERVICE_SUCCESS_MESSAGE = 'Service successfully configured';

const SERVICE_NOT_CONFIGURED_ERROR_MESSAGE = 'search: %s is not configured.';
const MISSING_QUERY_ERROR_MESSAGE = 'search: missing query...';

var prompt = require('prompt');
var util = require('util');

var launch = require('./launcher').launch;
var search = require('./search');

function onError(errorMessage) {
  console.log();
  console.error(errorMessage);
  process.exit(1);
}

module.exports = {
  list: function () {
    console.log(LIST_SERVICES_MESSAGE);
    console.log();
    search
      .getAvailableServices()
      .forEach(function (serviceName) {
        console.log(serviceName);
      });
    process.exit(0);
  },

  configure: function () {
    console.log(NEW_SERVICES_INPUT_MESSAGE);
    prompt.start();
    prompt.get(['service', 'url'], function (err, result) {
      if (err) {
        onError(err);
      }

      search.addNewService(result.service, result.url);
      console.log(CONFIGURE_SERVICE_SUCCESS_MESSAGE);
      process.exit(0);
    });
  },

  search: function (param, args) {
    if (!args.length) {
      onError(MISSING_QUERY_ERROR_MESSAGE);
    }
    var query = args.join(' ');
    var service = param;
    var searchURI = search.getServiceURI(query, service);

    if (searchURI) {
      launch(searchURI);
      process.exit(0);
    }
    var msg = SERVICE_NOT_CONFIGURED_ERROR_MESSAGE + CONFIGURE_SERVICE_MESSAGE;
    onError(util.format(msg, service));
  }

};
