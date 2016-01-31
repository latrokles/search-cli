#!/usr/bin/env node

'use strict';

var program = require('commander');
var pjson = require('./package.json')

program
  .version(pjson.version)
  .arguments('<query>')
  .option('-a, --application <application>', 'application to open results with')
  .option('-s, --service <service>', 'to perform search on (e.g. google, npm)')
  .option('-c, --configure', 'configure a new service')
  .option('-l, --list', 'list configured services')
  .parse(process.argv);
