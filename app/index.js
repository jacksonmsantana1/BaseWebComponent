/**
 * App's entry point
 * Creates and inserts a div and mounts the app on it
 */
import 'normalize.css';
import debug from 'debug';
import Base from './components/Base/Base.js';

const log = debug('app:bootstrap');
const appNode = document.createElement('div');
const helloComp = document.createElement('pw-base');

log('creating app node');
appNode.id = 'app';

log('adding app node to body');
document.body.appendChild(appNode);

log('mounting app');
appNode.appendChild(helloComp);
