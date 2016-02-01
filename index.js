#!/usr/bin/env node

'use strict';

var program = require('commander');
var prompt = require('prompt');
var util = require('util');

var launch = require('./lib/launcher').launch;
var pjson = require('./package.json');
var search = require('./lib/search');

program
  .version(pjson.version)
  .arguments('<query>')
  .option('-s, --service <service>', 'to perform search on (e.g. google, npm)')
  .option('-c, --configure', 'configure a new service')
  .option('-l, --list', 'list configured services')
  .parse(process.argv);

/**
 * list or configure services
 */
if (program.list) {
  list();
} else if (program.configure) {
  configure();
} else {
  runSearch();
}

function list() {
  console.log('these are the services you can search:');
  console.log('');
  search
    .getAvailableServices()
    .forEach(function (serviceName) {
      console.log(serviceName);
    });
  process.exit(0);
}

function configure() {
  console.log('enter new service information:');
  prompt.start();
  prompt.get(['service', 'url'], function (err, result) {
    if (err) {
      onError(err);
    }

    console.log('configuring new service...');
    search.addNewService(result.service, result.url);
    process.exit(0);
  });
}

function runSearch() {
  if (!program.args.length) {
    onError('missing query...');
  }
  var query = program.args.join(' ');
  var service = program.service;
  var searchURI = search.getServiceURI(query, service);

  if (searchURI) {
    launch(searchURI);
    process.exit(0);
  }
  var msg = '%s is not configured, please use --configure option to add it as a new service';
  onError(util.format(msg, service));
}

function onError(errorMessage) {
  console.log('');
  console.error(errorMessage);
  console.log(program.help());
  process.exit(1);
}
