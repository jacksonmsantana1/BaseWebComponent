/**
 * App's entry point
 * Creates and inserts a div and mounts the app on it
 */
import 'normalize.css';
import debug from 'debug';
/*eslint no-unused-vars:1*/
import Base from './components/Base/Base.js';
/*eslint no-unused-vars:1*/
import PwPinButton from './components/pw-pin-button/pw-pin-button.js';
/*eslint no-unused-vars:1*/
import PwLikeButton from './components/pw-like-button/pw-like-button.js';
/*eslint no-unused-vars:1*/
import PwUserInfo from './components/pw-user-info/pw-user-info.js';

const log = debug('app:bootstrap');
const appNode = document.createElement('div');
const helloComp = document.createElement('pw-base');
const pinButton = document.createElement('pw-pin-button');
const likeButton = document.createElement('pw-like-button');
const userInfo = document.createElement('pw-user-info');

log('creating app node');
appNode.id = 'app';

log('adding app node to body');
document.body.appendChild(appNode);
document.body.appendChild(userInfo);
document.body.appendChild(pinButton);
document.body.appendChild(likeButton);

log('mounting app');
appNode.appendChild(helloComp);
