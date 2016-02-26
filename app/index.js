'use strict';

/**
 * App's entry point
 * Creates and inserts a div and mounts the app on it
 */
import 'normalize.css';
import debug from 'debug';
import Hello from './components/Hello';

const log = debug('app:bootstrap');
const  appNode = document.createElement('div');
const  helloComp = document.createElement('pw-hello');

appNode.id = 'app';

// Enable debug messages outside of production
if (process.env.NODE_ENV !== 'production') {

  debug.enable('app:*');

};

log('creating app node');

log('adding app node to body');
document.body.appendChild(appNode);

log('mounting app');
helloComp.textContent = 'Jacko';
appNode.appendChild(helloComp);
