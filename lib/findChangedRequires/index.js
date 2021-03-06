var fileLocationCalculator = require('./fileLocationCalculator');
var findSourceFiles = require('../findSourceFiles');
var moveCalculator = require('./fileMoveCalculator');

function changedRequiresByFile(job) {
  var locationCalculator = fileLocationCalculator(job.from, job.to);

  var files = findSourceFiles(job);

  return moveCalculator(files, locationCalculator);
}

module.exports = changedRequiresByFile;
