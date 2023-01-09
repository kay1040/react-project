import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { authApi } from './api/authApi';
import authReducer from './reducer/authSlice';
import coursesApi from './api/coursesApi';
import productsApi from './api/productsApi';
import ordersApi from './api/ordersApi';
import cartReducer from './reducer/cartSlice';
import productsReducer from './reducer/productsSlice';


const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [coursesApi.reducerPath]: coursesApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    authApi.middleware,
    coursesApi.middleware,
    productsApi.middleware,
    ordersApi.middleware,
  ),
});

setupListeners(store.dispatch);

export default store;
