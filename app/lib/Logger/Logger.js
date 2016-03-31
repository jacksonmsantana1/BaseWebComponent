/**
 *  Function Logger
 */

class Logger {
  static error(fn, urlRequest) {
    return function (err) {
      console.log('/****************ERROR******************/\n');
      console.log('-> Function: ' + fn + '\n');
      console.log('-> -> Url Request: ' + urlRequest + '\n');
      console.log('-> -> -> Request Status: ' + err.status + '\n');
      console.log('-> -> -> Message: ' + err.message);
      return Promise.reject(err);
    };
  }
}

export
default Logger;
