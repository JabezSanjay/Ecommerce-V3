import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PageRoutes from './Routes';
import store from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

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
