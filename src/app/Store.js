"use client"
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counterSlice'
import { persistReducer, persistStore } from 'redux-persist';
import storage from "./storage"

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  counter: counterReducer,
},)

const persistedReducer = persistReducer(persistConfig, rootReducer)



export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  })


//{count}
export const persistor = persistStore(store)