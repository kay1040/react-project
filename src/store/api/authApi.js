import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1337/api/'}),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (user) => ({
                url: '/auth/local/register',
                method: 'POST',
                body: user
            }),
        }),
        login: builder.mutation({
            query: (user) => ({
                url: '/auth/local',
                method: 'POST',
                body: user
            })
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;