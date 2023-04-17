import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { authApi } from './api/authApi';
import authReducer from './reducers/authSlice';
import tutorialsApi from './api/tutorialsApi';
import productsApi from './api/productsApi';
import cartReducer from './reducers/cartSlice';
import productsReducer from './reducers/productsSlice';


const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [tutorialsApi.reducerPath]: tutorialsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    authApi.middleware,
    tutorialsApi.middleware,
    productsApi.middleware,
  ),
});

setupListeners(store.dispatch);

export default store;
