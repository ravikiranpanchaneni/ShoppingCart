import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter  } from "react-router-dom";
import {renderRoutes} from 'react-router-config';
import Routes from './Routes';
import {createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas'
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, window.mystate, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

ReactDOM.hydrate(
		<Provider store={store} >
		<BrowserRouter>
		<div>{renderRoutes(Routes)}</div>
		</BrowserRouter>
		</Provider>,
document.querySelector('#root')
)

