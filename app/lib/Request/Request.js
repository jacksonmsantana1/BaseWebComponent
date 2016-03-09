
class Request {

  static getJSON(url) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.responseType = 'json';
      req.open('GET', url);
      req.onload = function () {
        if (req.status === 200) {
          resolve(req.response);
        } else {
          reject(new Error(req.statusText));
        }
      };

      req.onerror = function () {
        if (reject) {
          reject(new Error('IO Error'));
        }
      };

      req.send();
    });
  }

}

export
default Request;
