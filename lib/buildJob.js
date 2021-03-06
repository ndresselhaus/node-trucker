var path = require('path');
var readIgnores = require('./readIgnores');


module.exports = function(options) {

  var scopePresent =  (options.scope && options.scope.length);
  var _ = options._ || [];
  var files = _.map(blowOutPath);
  var from = files.slice(0, files.length -1);
  var to = files.length && files[files.length - 1];
  var base = scopePresent ? path.resolve(options.scope) : process.cwd();
  var ignore = readIgnores(base);
  var entrypoints = options.entrypoint ? [].concat(options.entrypoint) : null;

  if (options.exclude) {
    ignore.patterns = ignore.patterns.concat(options.exclude)
  }

  return {
    base: base,
    ignore: ignore,
    files: files,
    from: from,
    to: to,
    dryRun: !!options['dry-run'],
    quiet: !!options.quiet,
    info: !!options.info,
    unused: !!options.unused,
    entrypoints: entrypoints
  };
};

function blowOutPath(subPath) {
  return path.normalize(path.join(process.cwd(), subPath));
}
