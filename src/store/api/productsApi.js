import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['products'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      async queryFn() {
        try {
          const querySnapshot = await getDocs(query(collection(db, 'products'), orderBy('id')))
          const products = [];
          querySnapshot?.forEach((doc) => {
            products.push(doc.data());
          });
          return { data: products };
        } catch (error) {
          return { error };
        }
      },
    }),
  })
});

export const { useGetProductsQuery } = productsApi;
export default productsApi;
