import { apiSlice } from "./apiSlice.js";

const ACCAD_SERV_URL = '/api/accademic-service/subject';

export const studentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubject: builder.query({
      query: () => ({
        url: `${ACCAD_SERV_URL}/subject`,
        method: 'GET',
      }),
    }),
    addSubject: builder.mutation({
      query: (FormData) => ({
        url: `${ACCAD_SERV_URL}/addSubject`,
        method: 'POST',
        body: FormData,
      }),
    }),
    editSubject: builder.mutation({
        query:(FormData)=>({
            url: `${ACCAD_SERV_URL}/editSubject`,
            method: 'PATCH',
            body: FormData,
        })
    })
   
  }),
});

export const {
  useGetSubjectQuery,
  useAddSubjectMutation,
  useEditSubjectMutation
} = studentApiSlice;
