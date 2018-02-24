import mocha from './mochainstance'

mocha.suite.emit(
  'pre-require',
  global,
  'If anything uses the file argument, you\'d actually need one pre-require, require and post-require per test file with the test file name hardcoded here',
  mocha
);
