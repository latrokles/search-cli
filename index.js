#!/usr/bin/env node

'use strict';

var program = require('commander');
var pjson = require('./package.json');

var launch = require('./lib/launcher').launch;
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
}

if (program.configure) {
  console.log('configure new service');
  process.exit(0);
}

/**
 * handle missing args
 */
if (!program.args.length) {
  console.error('missing query...');
  console.log(program.help());
  process.exit(1);
}

/**
 * run query
 */
runSearch(program.args, program.service);

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

function runSearch(query, service) {
  var searchURI = search.getServiceURI(query.join(' '), service);
  launch(searchURI);
  process.exit(0);
}
