import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import registerServiceWorker from './config/registerServiceWorker';
import { createMemoryHistory } from 'history';
import {configureStore} from './store/store'
import App from './containers/App';
const routerHistory = createMemoryHistory();
const isElectron = window && window.process && window.process.type
let ipcRenderer = null;
if(isElectron) ipcRenderer = window.require('electron').ipcRenderer;

const syncHistoryWithStore = (store, history) => {
  const { routing } = store.getState();
  if(routing && routing.location) {
    history.replace(routing.location);
  }
};


const store = configureStore(routerHistory);
syncHistoryWithStore(store, routerHistory);

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));
registerServiceWorker();

if(isElectron){
  ipcRenderer.on('private', (e,message) => {
      console.log('Electron: ',message);
  });

}
