import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { configureStore } from './Store/configureStore';
import './index.scss';
import App from './Components/App/App';
import registerServiceWorker from './registerServiceWorker';


const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

registerServiceWorker();

