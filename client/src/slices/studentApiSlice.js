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
      getNotice: builder.query({
        query: (id) => ({
          url: `${Student_USERS_URL}/studentNotice/${id}`,
          method: 'GET',
        }),
      }),
      rateTeachers: builder.query({
        query: () => ({
          url: `${Student_USERS_URL}/teacher`,
          method: 'GET',
        }),
      }),
      rateTeacherDtl: builder.query({
        query: (id) => ({
          url: `${Student_USERS_URL}/getTeacherById/${id}`,
          method: 'GET',
        }),
      }),
      addRating: builder.mutation({
        query: (data) => ({
          url: `${Student_USERS_URL}/addRating`,
          method: 'POST',
          body: data,
      }),
  }),
     
  }),
});

export const {
  useGetAttendanceQuery,
  useGetExamsQuery,
  useGetNoticeQuery,
  useRateTeachersQuery,
  useRateTeacherDtlQuery,
  useAddRatingMutation
} = studentApiSlice;
