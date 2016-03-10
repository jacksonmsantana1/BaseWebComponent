class Request {
  static getJSON(url) {
    return new Promise((resolve, reject) => {
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
          resolve({
            status: req.status,
            message: 'Unauthorized',
            error: new Error('ERROR ' + req.status),
          });
        } else if (req.status === 404) {
          resolve({
            status: req.status,
            message: 'Not Found',
            error: new Error('ERROR 404'),
          });
        }
      };

      req.send();
    });
  }

  static sendJSON(url, data) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('POST', url);
      request.onreadystatechange = () => {
        if (request.readyState === 4 && resolve) {
          resolve(request);
        }
      };

      request.setRequestHeader('Content-Type',
        'application/x-www-form-urlencoded');
      request.send(this.encodeFormData(data));
    });
  }

  encodeFormData(data) {
    if (!data) {
      return '';
    }

    let pairs = [];
    for (var name in data) {
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

    return pairs.join('&');
  }
}

export
default Request;
