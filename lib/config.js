
'use strict';

module.exports = {
  var fs = require('fs')

  /**
   * load configuration
   * @param {String} path
   * @return {Object} 
   */
  load: function(path) {
    return JSON.parse(fs.readFileSync(path));
  },

  /**
   * stores configuration
   * @param  {String} path
   * @param  {Object} config
   */
  store: function(path, config) {
    fs.writeFileSync(path, JSON.stringify(config));
  }
};
