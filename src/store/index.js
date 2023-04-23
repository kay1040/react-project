import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import tutorialsApi from './api/tutorialsApi';
import productsApi from './api/productsApi';
import cartReducer from './reducers/cartSlice';
import productsReducer from './reducers/productsSlice';


const store = configureStore({
  reducer: {
    [tutorialsApi.reducerPath]: tutorialsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    products: productsReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    tutorialsApi.middleware,
    productsApi.middleware,
  ),
});

setupListeners(store.dispatch);

export default store;
