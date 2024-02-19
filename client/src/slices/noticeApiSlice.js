import { apiSlice } from './apiSlice';
const NOTICE_URL = '/api/notice-service/notice';

export const noticeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addNotice: builder.mutation({
      query: (data) => ({
        url: `${NOTICE_URL}/addNotice`,
        method: 'POST',
        body: data,
      }),
    }),
    
  }),
});

export const { useAddNoticeMutation} =
  noticeApiSlice;