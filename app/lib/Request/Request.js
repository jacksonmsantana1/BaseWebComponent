const local = 'http://localhost:3000';

class Request {
  static getJSON(url, token) {
    return new Promise((resolve, reject) => {
      if (!!!url || url.trim() === '') {
        reject(new Error('URL is not defined'));
      }

      const req = new XMLHttpRequest();

      req.responseType = 'json';
      req.open('GET', local + url);
      if (token) {
        req.setRequestHeader('authorization', token);
      }

      req.onload = function () {
        if (resolve && req.status === 200) {
          resolve({
            status: 200,
            message: 'OK 200',
            body: req.response,
          });
        } else if (reject && req.status === 500) {
          reject({
            status: req.status,
            message: 'Internal Server Error',
            error: new Error('ERROR 500'),
          });
        } else if (reject && (req.status === 401 || req.status === 403)) {
          reject({
            status: req.status,
            message: 'Access Forbidden',
            error: new Error('ERROR ' + req.status),
          });
        } else if (reject && req.status === 400) {
          reject({
            status: 400,
            message: 'Bad Request',
            error: new Error('ERROR ' + req.status),
          });
        } else if (reject && req.status === 404) {
          reject({
            status: req.status,
            message: 'Not Found',
            error: new Error('ERROR 404'),
          });
        } else {
          reject({
            status: 0,
            message: 'Unknown Error',
            error: new Error('ERROR -' + req.status),
          });
        }
      };

      req.send(null);
    });
  }

  static sendJSON(url, data, token) {
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

      req.open('POST', local + url);
      if (token) {
        req.setRequestHeader('authorization', token);
      }

      req.onload = function () {
        if (req.status === 200) {
          resolve({
            status: req.status,
            message: 'OK 200',
            body: req.response,
          });
        } else if (req.status === 500) {
          reject({
            status: 500,
            message: 'Internal Server Error',
            error: new Error('ERROR 500'),
          });
        } else if (req.status === 404) {
          reject({
            status: req.status,
            message: 'Not Found',
            error: new Error('ERROR 404'),
          });
        } else if (req.status === 403 || req.status === 401) {
          reject({
            status: req.status,
            message: 'Access Forbidden',
            error: new Error('ERROR ' + req.status),
          });
        } else if (reject && req.status === 400) {
          reject({
            status: 400,
            message: 'Bad Request',
            error: new Error('ERROR ' + req.status),
          });
        } else {
          reject({
            status: 0,
            message: 'Unknown Error',
            error: new Error('ERROR -' + req.status),
          });
        }
      };

      req.setRequestHeader('Content-Type', 'application/json');
      req.send(JSON.stringify(data));
    });
  }

  static putJSON(url, data, token) {
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

      req.open('PUT', local + url);

      if (token) {
        req.setRequestHeader('authorization', token);
      }

      req.onload = function () {
        if (req.status === 200) {
          resolve({
            status: req.status,
            message: 'OK 200',
            body: req.response,
          });
        } else if (req.status === 500) {
          reject({
            status: 500,
            message: 'Internal Server Error',
            error: new Error('ERROR 500'),
          });
        } else if (req.status === 404) {
          reject({
            status: req.status,
            message: 'Not Found',
            error: new Error('ERROR 404'),
          });
        } else if (req.status === 403 || req.status === 401) {
          reject({
            status: req.status,
            message: 'Access Forbidden',
            error: new Error('ERROR ' + req.status),
          });
        } else if (reject && req.status === 400) {
          reject({
            status: 400,
            message: 'Bad Request',
            error: new Error('ERROR ' + req.status),
          });
        } else {
          reject({
            status: 0,
            message: 'Unknown Error',
            error: new Error('ERROR -' + req.status),
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
