import { apiSlice } from "./apiSlice.js";

const ADMIN_USERS_URL = '/api/admin/users';

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: ADMIN_USERS_URL,
        method: 'GET',
      }),
    }),
    createUser: builder.mutation({
      query: (userData) => ({
        url: ADMIN_USERS_URL,
        method: 'POST',
        body: userData,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${ADMIN_USERS_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
    editUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `${ADMIN_USERS_URL}/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
} = adminApiSlice;
