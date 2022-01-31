import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import updateUserReducer from './reducers/updateUserReducer';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const reducers = combineReducers({
  auth: authReducer,
  updateUser: updateUserReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
});
