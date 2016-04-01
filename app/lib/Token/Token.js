class Token {
  static getPayload(token) {
    let payload = {};
    if (token) {
      let encoded = token.split('.')[1];
      payload = JSON.parse(this.urlBase64Decode(encoded));
    }

    return payload;
  }

  static urlBase64Decode(str) {
    let output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
    }
    return window.atob(output);
  }
}

export default Token;
