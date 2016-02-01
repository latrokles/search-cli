'use strict';

const spawn = require('child_process').spawn;

module.exports = {
  /**
   * returns the launch command to be used based on the operating system
   * it's running on
   */
  command: function () {
    var commands = {
      darwin: 'open',
      linux: 'xdg-open'
    };
    return commands[process.platform];
  },

  /**
   * launch search
   */
  launch: function(searchURI) {
    var cmd = this.command();
    spawn(cmd, [searchURI]);
  }
};
