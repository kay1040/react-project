import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  // baseQuery: fetchBaseQuery({ baseUrl: 'https://groovy-momentum-371809.appspot.com/api/' }),
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1337/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['userData'],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: 'auth/local/register',
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: 'auth/local',
        method: 'POST',
        body: user,
      }),
    }),
    getUserData: builder.query({
      query: () => ({
        url: 'users/me',
      }),
      providesTags: ['userData']
    }),
    updateUserData: builder.mutation({
      query: (user) => ({
        url: 'user/me',
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: ['userData']
    }),
    changePassword: builder.mutation({
      query: (password) => ({
        url: 'auth/change-password',
        method: 'POST',
        body: password,
      })
    })
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserDataQuery,
  useUpdateUserDataMutation,
  useChangePasswordMutation
} = authApi;
