import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';
import reducers from './reducers';

var createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDom.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
	<App />
	</Provider>
	, document.querySelector('.container'));