var path = require('path');

module.exports = function printUnused(job, files) {
  var byPath = {};

  files.forEach(function (f) {
    byPath[f.fullPath] = {
      file: f,
      requires: f.requires,
      isRequired: false,
    };
  });

  if (job.entrypoints) {
    [].concat(job.entrypoints).forEach(function (entrypoint) {
      markRequired(byPath, path.resolve(job.base, entrypoint));
    });

    Object.keys(byPath).forEach(function (f) {
      if (!byPath[f].isRequired) {
        console.log(path.relative(job.base, f));
      }
    });
  }
  else {
    files.forEach(function (f) {
      f.requires.forEach(function (r) {
        delete byPath[r.filePath];
      });
    });

    Object.keys(byPath).forEach(function (f) {
      console.log(path.relative(job.base, f));
    });
  }
};

function markRequired(byPath, filePath) {
  var file = byPath[filePath];
  if (file && !file.isRequired) {
    file.isRequired = true;

    if (file.requires) {
      file.requires.forEach(function (r) {
          markRequired(byPath, r.filePath);
      });
    }
  }
}
