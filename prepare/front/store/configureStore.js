import { createWrapper } from 'next-redux-wrapper';

import reducer from '../reducers';
import rootSaga from '../sagas';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

const loggerMiddleware =
  ({ dispatch, getState }) =>
  next =>
  action => {
    console.log(action);

    // Otherwise, pass the action down the middleware chain as usual
    return next(action);
  };

const configureStores = () => {
  const sagaMiddlewares = createSagaMiddleware();
  const middlewares = [sagaMiddlewares, loggerMiddleware];
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));

  const store = createStore(reducer, enhancer);
  store.sagaTasl = sagaMiddlewares.run(rootSaga);
  return store;
};
const wrapper = createWrapper(configureStores, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
