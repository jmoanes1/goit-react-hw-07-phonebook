import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice';

/*
// ===== OLD CODE USING REDUX PERSIST =====
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = { key: 'root', storage };
const persistedReducer = persistReducer(persistConfig, contactsReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
// ===== END OLD CODE =====
*/

// ===== NEW CODE: SIMPLE STORE WITHOUT LOCAL STORAGE =====
export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});
