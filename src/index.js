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

const { ipcRenderer } = window.require('electron');
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


ipcRenderer.on('private', (e,message) => {
    console.log('fe: ',message);
});
