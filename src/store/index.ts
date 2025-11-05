
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import tableReducer from './tableSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

const rootReducer = combineReducers({ table: tableReducer })

const persistConfig = { key: 'root', storage, whitelist: ['table'] }

const persisted = persistReducer(persistConfig, rootReducer as any)

export const store = configureStore({
  reducer: persisted as any,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
