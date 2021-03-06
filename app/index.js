/**
 * App's entry point
 * Creates and inserts a div and mounts the app on it
 */
import 'normalize.css';
import debug from 'debug';

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
/*eslint no-unused-vars:1*/
import PwProjectLabel from './components/pw-project-label/pw-project-label.js';
/*eslint no-unused-vars:1*/
import PwPanelButton from './components/pw-panel-button/pw-panel-button.js';
/*eslint no-unused-vars:1*/
import PwProjectPanel from './components/pw-project-panel/pw-project-panel.js';

const log = debug('app:bootstrap');

const userInfo = document.createElement('pw-user-info');
const item = document.createElement('pw-project-item');
const panel = document.createElement('pw-project-panel');
item.id = '1';

log('creating app node');

log('adding app node to body');
document.body.appendChild(userInfo);
document.body.appendChild(panel);
document.body.appendChild(item);

log('mounting app');
