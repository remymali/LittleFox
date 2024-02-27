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
    googleLogin: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/googleLogin`,
        method: 'POST',
        body: data,
      }),
    }),
    forget: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/forgotPassword`,
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/resetPassword`,
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

export const { useLoginMutation, useForgetMutation,useGoogleLoginMutation,useResetPasswordMutation,useLogoutMutation, useRegisterMutation ,useUpdateUserMutation,useVerifyOTPMutation} =
  userApiSlice;