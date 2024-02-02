import { apiSlice } from "./apiSlice.js";

const ADMIN_USERS_URL = '/api/user-service/admin';

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: `${ADMIN_USERS_URL}/student`,
        method: 'GET',
      }),
    }),
    studRegister: builder.mutation({
      query: (userData) => ({
        url: `${ADMIN_USERS_URL}`,
        method: 'POST',
        body: userData,
      }),
    }),
    createUser: builder.mutation({
      query: (userData) => ({
        url: `${ADMIN_USERS_URL}/register`,
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
    getTeachers: builder.query({
      query: () => ({
        url: `${ADMIN_USERS_URL}/teacher`,
        method: 'GET',
      }),
    }),
    createTeacher: builder.mutation({
      query: (userData) => ({
        url: `${ADMIN_USERS_URL}/teachRegister`,
        method: 'POST',
        body: userData,
      }),
    }),
    deleteTeacher: builder.mutation({
      query: (id) => ({
        url: `${ADMIN_USERS_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
    editTeacher: builder.mutation({
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
  useStudRegisterMutation,
  useGetTeachersQuery,
  useCreateTeacherMutation,
  useEditTeacherMutation,
  useDeleteTeacherMutation
} = adminApiSlice;
