import { configureStore, combineReducers } from '@reduxjs/toolkit';
import data from './slices/dataSlice';
import storage from 'redux-persist/lib/storage';

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: storage,
  version: 1,
  debug: true,
};

 


const persistedDataSlice = persistReducer(persistConfig, data);

const rootReducer = combineReducers({
  data: persistedDataSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
