import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { authApi } from './api/authApi';
import authReducer from './reducer/authSlice';
import coursesApi from './api/coursesApi';
import productsApi from './api/productsApi';
import cartReducer from './reducer/cartSlice';
import productsSlice from './reducer/productsSlice';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [coursesApi.reducerPath]: coursesApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    auth: authReducer,
    products: productsSlice,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, coursesApi.middleware, productsApi.middleware),
});

setupListeners(store.dispatch);

export default store;
