import { apiSlice } from "./apiSlice.js";

const Student_USERS_URL = '/api/user-service/student';

export const studentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAttendance: builder.query({
        query: (id) => ({
          url: `${Student_USERS_URL}/studentAttendance/${id}`,
          method: 'GET',
        }),
      }),
      getExams: builder.query({
        query: (id) => ({
          url: `${Student_USERS_URL}/studentExam/${id}`,
          method: 'GET',
        }),
      }),
   
     
  }),
});

export const {
  useGetAttendanceQuery,
  useGetExamsQuery
} = studentApiSlice;
