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
/*eslint no-unused-vars:1*/
import PwProjectInfo from './components/pw-project-info/pw-project-info.js';
/*eslint no-unused-vars:1*/
import PwProjectItem from './components/pw-project-item/pw-project-item.js';
/*eslint no-unused-vars:1*/
import PwProjectImg from './components/pw-project-img/pw-project-img.js';

const log = debug('app:bootstrap');
const appNode = document.createElement('div');
const helloComp = document.createElement('pw-base');
const img = document.createElement('pw-project-img');
const pinButton = document.createElement('pw-pin-button');
const likeButton = document.createElement('pw-like-button');
const userInfo = document.createElement('pw-user-info');

const item = document.createElement('pw-project-item');
item.id = 'VAITOMARNOCU';

log('creating app node');
appNode.id = 'app';

log('adding app node to body');
document.body.appendChild(appNode);
document.body.appendChild(userInfo);
document.body.appendChild(pinButton);
document.body.appendChild(likeButton);
document.body.appendChild(item);

log('mounting app');
appNode.appendChild(helloComp);
