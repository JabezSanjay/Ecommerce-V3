import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PageRoutes from './Routes';
import store from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

ReactDOM.render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PageRoutes />
      </PersistGate>
    </Provider>
  </>,
  document.getElementById('root')
);
