'use strict';
let expect = require('chai').expect;

let path = require('path');
let fileFinder = require('../lib/findFiles');
let examplePath = path.normalize(path.join(__dirname, '../examples'));
let starkPath = path.join(examplePath, '/stark');
let tullyPath = path.join(examplePath, '/tully');

let result;

function byFullPath(a, b) {
  return a.fullPath > b.fullPath;
}

describe('fileFinder', function() {
  describe('in a single directory', function() {
    before(function() {
      result = fileFinder(starkPath).sort(byFullPath);
    });
    it('can find eddard', function() {
      var eddard;
      eddard = result[1];
      expect(eddard.fullPath).to.equal(path.normalize(starkPath + '/eddard.js'));
      expect(eddard.filetype).to.equal('js');
      expect(eddard.relativePath).to.equal('eddard.js');
    });
    it('can find robb', function() {
      var robb;
      robb = result[2];
      expect(robb.fullPath).to.equal(path.normalize(starkPath + '/robb.coffee'));
      expect(robb.filetype).to.equal('coffee');
      expect(robb.relativePath).to.equal('robb.coffee');
    });
  });
  describe('recursively', function() {
    before(function() {
      result = fileFinder(examplePath).sort(byFullPath);
    });
    it('can find eddard', function() {
      var eddard;
      eddard = result[1];
      expect(eddard.fullPath).to.equal(path.normalize(starkPath + '/eddard.js'));
      expect(eddard.filetype).to.equal('js');
      expect(eddard.relativePath).to.equal('stark/eddard.js');
    });
    it('can find sansa', function() {
      var sansa;
      sansa = result[3];
      expect(sansa.fullPath).to.equal(path.normalize(starkPath + '/sansa.coffee'));
      expect(sansa.filetype).to.equal('coffee');
      expect(sansa.relativePath).to.equal('stark/sansa.coffee');
    });
    it('can find catelyn', function() {
      var catelyn;
      catelyn = result[4];
      expect(catelyn.fullPath).to.equal(path.normalize(tullyPath + '/catelyn.js'));
      expect(catelyn.filetype).to.equal('js');
      expect(catelyn.relativePath).to.equal('tully/catelyn.js');
    });
  });
});
