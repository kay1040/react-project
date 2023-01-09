import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  // baseQuery: fetchBaseQuery({ baseUrl: 'https://groovy-momentum-371809.appspot.com/api/' }),
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1337/api/' }),
  tagTypes: ['orders'],
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: () => 'orders',
      transformResponse: (baseQueryReturnQuery) => baseQueryReturnQuery.data,
    }),
    addOrder: builder.mutation({
      query: (order) => ({
        url: 'orders',
        method: 'POST',
        body: order,
      }),
    }),
  }),
});

export const { useGetOrdersQuery, useAddOrderMutation } = ordersApi;

export default ordersApi;
