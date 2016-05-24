/**
 * Component that will be the interface between the front and the backend
 */

import Request from '../../lib/Request/Request.js';
import Logger from '../../lib/Logger/Logger.js';
import R from 'ramda';
import Token from '../../lib/Token/Token.js';

const contain = R.indexOf;
const get = R.prop;

class PwInfoUser extends HTMLElement {
  createdCallback() {
    this.addEventListener('despin', this.desPinned);
    this.addEventListener('pin', this.pinned);
    this.addEventListener('isPinned', this.isPinned);
    this.addEventListener('like', this.liked);
    this.addEventListener('dislike', this.disliked);
  }

  detachedCallback() {}

  attachedCallback() {}

  attributeChangedCallback() {}

  /***************Token Validation**********************/

  validate(user) {
    return this.validateUser(user)
      .then(this.getResponseToken)
      .then(Token.setUserToken)
      .catch(Logger.error('validate()', '/validation'));
  }

  validateUser(user) {
    if (!!user && !user.password) {
      return Promise.reject(new Error('Only the email is given'));
    } else if (!!user && !user.email) {
      return Promise.reject(new Error('Only the password is given'));
    }

    return Request.sendJSON('/validation', user);
  }

  getResponseToken(res) {
    return Promise.resolve(JSON.parse(res.body).token);
  }

  /*****************Pin Event*****************************/

  // pinned :: Event -> Promise(String, Error)
  pinned(evt) {
    return Request.putJSON('/user/projects/pinned', {
      projectId: evt.detail.projectId,
    }, Token.getUserToken()).catch(Logger.error('pinned()', '/user/projects/pinned'));
  }

  // desPinned :: Event -> Promise(String, Error)
  desPinned(evt) {
    evt.preventDefault();

    return Request.putJSON('/user/projects/desPinned', {
      projectId: evt.detail.projectId,
    }, Token.getUserToken()).catch(Logger.error('desPinned()', '/user/projects/desPinned'));
  }

  // isPinned :: (Token, String) -> Boolean
  isPinned(evt) {

    const token = Token.getUserToken();
    const projectId = evt.detail.projectId;

    /************************Pure Functions**********************/

    // getUserProjects :: Token -> Promise(Object, Error)
    const getUserProjects = (tk) => Request.getJSON('/user/projects', tk);

    // getPinnedProjects :: Object -> Promise(Array)
    const getPinnedProjects = (obj) => Promise.resolve(get('pinned', obj.body));

    // containProject :: Array -> Promise(Number)
    const containProject = R.curry((id, arr) => (Promise.resolve(contain(id, arr))));

    // result :: Number -> Promise(Boolean)
    const result = (n) => (Promise.resolve(n !== -1));

    /************************Impure Functions*********************/

    const impure = getUserProjects(token)
      .then(getPinnedProjects)
      .then(containProject(projectId))
      .then(result)
      .catch(Logger.error('isPinned()', '/user/projects'));

    return impure;
  }

  /******************Like Event****************************/

  // liked :: Event -> Promise(String, Error)
  liked(evt) {
    return Request.putJSON('/user/projects/liked', {
      projectId: evt.detail.projectId,
    }, Token.getUserToken()).catch(Logger.error('liked()', '/user/projects/liked'));
  }

  // disliked :: Event -> Promise(String, Error)
  disliked(evt) {
    evt.preventDefault();

    return Request.putJSON('/user/projects/disliked', {
      projectId: evt.detail.projectId,
    }, Token.getUserToken()).catch(Logger.error('disliked()', '/user/projects/disliked'));
  }

  // isLiked :: (Token, String) -> Boolean
  isLiked(_projectId) {

    const token = Token.getUserToken();
    const projectId = _projectId;

    /************************Pure Functions**********************/

    // getUserProjects :: Token -> Promise(Object, Error)
    const getUserProjects = (tk) => Request.getJSON('/user/projects', tk);

    // getPinnedProjects :: Object -> Promise(Array)
    const getPinnedProjects = (obj) => Promise.resolve(get('liked', obj.body));

    // containProject :: Array -> Promise(Number)
    const containProject = R.curry((id, arr) => (Promise.resolve(contain(id, arr))));

    // result :: Number -> Promise(Boolean)
    const result = (n) => (Promise.resolve(n !== -1));

    /************************Impure Functions*********************/

    const impure = getUserProjects(token)
      .then(getPinnedProjects)
      .then(containProject(projectId))
      .then(result)
      .catch(Logger.error('isLiked()', '/user/projects'));

    return impure;
  }
}

document.registerElement('pw-user-info', PwInfoUser);
export
default PwInfoUser;
