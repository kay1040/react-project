import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://groovy-momentum-371809.appspot.com/api/' }),
    tagTypes: ['products'],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => 'products',
            transformResponse: (baseQueryReturnQuery) => baseQueryReturnQuery.data,
        }),
    }),
});

export const { useGetProductsQuery } = productsApi;

export default productsApi;