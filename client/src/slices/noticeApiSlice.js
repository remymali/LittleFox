import { apiSlice } from './apiSlice';
const NOTICE_URL = '/api/notice-service/notice';

export const noticeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNotice: builder.query({
            query: () => ({
                url: `${NOTICE_URL}/getNotice`,
                method: 'GET',
            }),
        }),
        addNotice: builder.mutation({
              query: (data) => ({
                url: `${NOTICE_URL}/addNotice`,
                method: 'POST',
                body: data,
            }),
        }),
        editNotice: builder.mutation({
            query:(FormData)=>({
                url: `${NOTICE_URL}/editNotice`,
                method: 'PATCH',
                body: FormData,
            })
        })

    }),
});

export const { useAddNoticeMutation ,useGetNoticeQuery,useEditNoticeMutation} =
    noticeApiSlice;