import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk'

import counterReducer from './reducers/counterReducer'
import resultReducer from './reducers/resultReducer'
import phoneBookReducer from './reducers/phoneBookReducer'
import modemReducers from './reducers/modemReducer';

export function configureStore(routerHistory) {
  const router = routerMiddleware(routerHistory);
  const reducers = {
    counter:counterReducer,
    result: resultReducer,
    phoneBook:phoneBookReducer,
    modem:modemReducers
  };

  const rootReducer = combineReducers(reducers);
  const logger = store => {
    return next => {
      return action => {
        const result = next(action);
        return result
      }
    }
  }
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewares = [ logger, thunk, router ];
  const enhancer = composeEnhancers(applyMiddleware(...middlewares), persistState());
  return createStore(rootReducer, enhancer);
}
