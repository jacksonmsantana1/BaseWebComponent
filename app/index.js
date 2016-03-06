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

const log = debug('app:bootstrap');
const appNode = document.createElement('div');
const helloComp = document.createElement('pw-base');
const pinButton = document.createElement('pw-pin-button');

log('creating app node');
appNode.id = 'app';

log('adding app node to body');
document.body.appendChild(appNode);
document.body.appendChild(pinButton);

log('mounting app');
appNode.appendChild(helloComp);
