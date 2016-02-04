#!/usr/bin/env node

'use strict';

var program = require('commander');

var pjson = require('./package.json');
var cli = require('./lib/cli.js');

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
  cli.list();
} else if (program.configure) {
  cli.configure();
} else {
  cli.search(program.service, program.args);
}
