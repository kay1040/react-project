import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://groovy-momentum-371809.appspot.com/api/'}),
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