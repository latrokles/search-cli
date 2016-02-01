'use strict';

var expect = require('chai').expect;
var launcher = require('../lib/launcher');

describe('launcher', function () {
  describe('.command()', function () {
    it('returns the launch command to be used', function () {
      var actual = launcher.command();

      expect(actual).to.be.a('string');
      expect(actual).to.equal('open');
    });
  });
});
