import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const tutorialsApi = createApi({
  reducerPath: 'tutorialsApi',
  // baseQuery: fetchBaseQuery({ baseUrl: 'https://groovy-momentum-371809.appspot.com/api/' }),
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1337/api/' }),
  tagTypes: ['tutorials'],
  endpoints: (builder) => ({
    getTutorials: builder.query({
      query: () => 'tutorials',
      transformResponse: (baseQueryReturnQuery) => baseQueryReturnQuery.data,
    }),
  }),
});

export const { useGetTutorialsQuery } = tutorialsApi;

export default tutorialsApi;
