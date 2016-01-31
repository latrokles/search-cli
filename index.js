#!/usr/bin/env node

'use strict';

var program = require('commander');
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
  search.list();
}

if (program.configure) {
  search.configure();
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
search.query(program.args, program.service);
