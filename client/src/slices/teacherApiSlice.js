import { apiSlice } from "./apiSlice.js";

const TEACHER_USERS_URL = '/api/user-service/teacher';

export const teacherApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
        query: (id) => ({
          url: `${TEACHER_USERS_URL}/student/${id}`,
          method: 'GET',
        }),
      }),
    addAttendance:builder.mutation({
        query: (data) => ({
          url: `${TEACHER_USERS_URL}/attendance`,
          method: 'POST',
          body:data
        }),
      }),
      addMarks:builder.mutation({
        query: (data) => ({
          url: `${TEACHER_USERS_URL}/Marks`,
          method: 'PUT',
          body:data
        }),
      }),
  }),
});

export const {
  useGetStudentsQuery,useAddAttendanceMutation,useAddMarksMutation
} = teacherApiSlice;
