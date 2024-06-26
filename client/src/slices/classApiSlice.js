import { apiSlice } from "./apiSlice.js";

const ACCAD_SERV_URL = '/api/accademic-service/class';

export const classApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClass: builder.query({
      query: () => ({
        url: `${ACCAD_SERV_URL}/classDtls`,
        method: 'GET',
      }),
    }),
    addClass: builder.mutation({
      query: (FormData) => ({
        url: `${ACCAD_SERV_URL}/addClass`,
        method: 'POST',
        body: FormData,
      }),
    }),
    editClass: builder.mutation({
        query:(FormData)=>({
            url: `${ACCAD_SERV_URL}/editClass`,
            method: 'PATCH',
            body: FormData,
        })
    })
   
  }),
});

export const {
  useAddClassMutation,
  useGetClassQuery,
  useEditClassMutation
} = classApiSlice;
