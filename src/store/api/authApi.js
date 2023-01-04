import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  // baseQuery: fetchBaseQuery({ baseUrl: 'https://groovy-momentum-371809.appspot.com/api/' }),
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1337/api/',
    tagTypes: ['user'],
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
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
      providesTags: [{type:'user', id:'LIST'}]
    }),
    updateUserData: builder.mutation({
      query: (user) => ({
        url: 'user/me',
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: (result, error, user)=>
      [{type:'user', id:user.id},{type:'user', id:'LIST'}]
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
