// Reference: http://karma-runner.github.io/0.12/config/configuration-file.html
module.exports = function karmaConfig(config) {
  config.set({
    frameworks: [

      // Reference: https://github.com/karma-runner/karma-mocha
      // Set framework to mocha
      'mocha', 'chai', 'sinon', 'sinon-chai',
    ],

    reporters: [

      // Reference: https://github.com/mlex/karma-spec-reporter
      // Set reporter to print detailed results to console
      'spec',

      // Reference: https://github.com/karma-runner/karma-coverage
      // Output code coverage files
      'coverage',
    ],

    files: [

      // Grab all files in the app folder that contain .test.
      'app/**/*.test.js',
    ],

    preprocessors: {
      // Reference: http://webpack.github.io/docs/testing.html
      // Reference: https://github.com/webpack/karma-webpack
      // Convert files with webpack and load sourcemaps
      './app/**/*.test.js': ['webpack', 'sourcemap'],
    },

    browsers: [

      // Run tests using Chrome
      'Chrome',
    ],

    singleRun: true,

    // Configure code coverage reporter
    coverageReporter: {
      dir: 'build/coverage/',
      type: 'html',
    },

    // Test webpack config
    webpack: require('./webpack.test'),

    // Hide webpack build information from output
    webpackMiddleware: {
      noInfo: true,
    },

    plugins: [
      require('karma-mocha'),
      require('karma-chai'),
      require('karma-sinon'),
      require('karma-sinon-chai'),
      require('karma-webpack'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-spec-reporter'),
      require('karma-sourcemap-loader'),
    ],

  });
};

