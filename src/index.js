import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from "./redux/store";


import './index.css';
import Pokedex from './Pokedex';
import * as serviceWorker from './serviceWorker';
import effects from './effects';

effects(store);


ReactDOM.render(
    <Provider store={store}>
        <Pokedex />
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
