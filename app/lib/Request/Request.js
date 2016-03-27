class Request {
  static getJSON(url) {
    return new Promise((resolve, reject) => {
      if (!!!url || url.trim() === '') {
        reject(new Error('URL is not defined'));
      }

      const req = new XMLHttpRequest();
      req.responseType = 'json';
      req.open('GET', url);

      req.onload = function () {
        if (req.status === 200) {
          resolve({
            status: 200,
            message: 'OK 200',
            body: req.response,
          });
        }
      };

      req.onerror = function () {
        if (reject && req.status === 500) {
          reject({
            status: 500,
            message: 'Internal Server Error',
            error: new Error('ERROR 500'),
          });
        } else if (reject && req.status === 400) {
          reject({
            status: 400,
            message: 'Bad Request',
            error: new Error('ERROR 400'),
          });
        } else if (req.status === 401 || req.status === 403) {
          reject({
            status: req.status,
            message: 'Unauthorized',
            error: new Error('ERROR ' + req.status),
          });
        } else if (req.status === 404) {
          reject({
            status: req.status,
            message: 'Not Found',
            error: new Error('ERROR 404'),
          });
        } else {
          reject({
            status: NaN,
            message: 'Unknown Error',
            error: new Error('ERROR -'),
          });
        }
      };

      req.send();
    });
  }

  static sendJSON(url, data) {
    return new Promise((resolve, reject) => {
      if (!url || url.trim() === '') {
        reject(new Error('URL is not defined'));
      }

      if (!data) {
        reject(new Error('Data is not defined'));
      }

      if (Object.keys(data).length === 0 && JSON.stringify(data) === JSON.stringify({})) {
        reject(new Error('Data is an empty object'));
      }

      const req = new XMLHttpRequest();
      req.open('POST', url);
      req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 201) {
          resolve({
            status: req.status,
            message: 'OK 201',
            body: data,
          });
        } else if (req.status === 500) {
          reject({
            status: 500,
            message: 'Internal Server Error',
            error: new Error('ERROR 500'),
          });
        }
      };

      req.setRequestHeader('Content-Type', 'application/json');
      req.send(JSON.stringify(data));
    });
  }
}

export
default Request;
