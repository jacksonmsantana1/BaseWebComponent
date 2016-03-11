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

      if (!data || data.trim() === '') {
        reject(new Error('Data is not defined'));
      }

      const req = new XMLHttpRequest();
      req.open('POST', url);
      req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
          resolve({
            status: 201,
            message: 'OK 201',
            body: req.response,
          });
        } else {
          console.log('Status:' + req.status);
          console.log('ReadyState: ' + req.readyState);
          reject({
            status: req.status,
            message: req.responseText,
            error: new Error('ERROR ' + req.status),
          });
        }
      };

      req.onerror = function () {
        if (req.status === 404) {
          reject({
            status: 404,
            message: 'Not Found',
            error: new Error('ERROR 404'),
          });
        } else if (req.status === 401) {
          reject({
            status: 401,
            message: 'Duplicated post',
            error: new Error('ERROR 401'),
          });
        } else {
          reject({
            status: req.status,
            message: req.responseText,
            error: new Error('ERROR ' + req.status),
          });
        }
      };

      req.setRequestHeader('Content-Type', 'application/json');
      req.send(JSON.stringify(data));
    });
  }

  encodeFormData(data) {
    if (!data) {
      return '';
    }

    const pairs = [];
    for (let name in data) {
      if (data.hasOwnProperty(name)) {
        let value = data[name].toString();

        if (!data.hasOwnProperty(name)) {
          continue;
        }

        if (typeof data[name] === 'function') {
          continue;
        }

        name = encodeURIComponent(name.replace(' ', '+'));
        value = encodeURIComponent(value.replace(' ', '+'));
        pairs.push(name + '=' + value); // Remember name=value
      }
    }

    return pairs.join('&');
  }
}

export
default Request;
