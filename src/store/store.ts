import { configureStore } from '@reduxjs/toolkit'
import { productApi } from '../api/api'
import cartReducer from './cart'
import productsReducer from './products'

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    cart: cartReducer,
    products: productsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware) 
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch