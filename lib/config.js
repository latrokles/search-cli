'use strict';

var fs = require('fs');
module.exports = {

  /**
   * load configuration
   * @param {String} path
   * @return {Object}
   */
  load: function (path) {
    return JSON.parse(fs.readFileSync(path));
  },

  /**
   * stores configuration
   * @param  {String} path
   * @param  {Object} config
   */
  store: function (path, config) {
    fs.writeFileSync(path, JSON.stringify(config, null, 4));
  }
};
