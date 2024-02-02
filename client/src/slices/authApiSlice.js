import { apiSlice } from './apiSlice';
const USERS_URL = '/api/auth-service/auth';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
        query: () => ({
          url: `${USERS_URL}/logout`,
          method: 'POST',
        }),
      }),
      register: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/register`,
          method: 'POST',
          body: data,
        }),
       }),
       updateUser: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/Profile`,
          method: 'PUT',
          body: data,
        }),
      }),
      verifyOTP: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/verifyOTP`,
          method: 'POST',
          body: data,
        }),
      }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation ,useUpdateUserMutation,useVerifyOTPMutation} =
  userApiSlice;