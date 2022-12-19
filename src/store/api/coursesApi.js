import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const coursesApi = createApi({
  reducerPath: 'coursesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://groovy-momentum-371809.appspot.com/api/' }),
  tagTypes: ['courses'],
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => 'courses',
      transformResponse: (baseQueryReturnQuery) => baseQueryReturnQuery.data,
    }),
  }),
});

export const { useGetCoursesQuery } = coursesApi;

export default coursesApi;
