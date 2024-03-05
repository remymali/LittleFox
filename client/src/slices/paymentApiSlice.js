import { apiSlice } from './apiSlice';
const PAYMENT_URL = '/api/payment-service/payment';

export const paymentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        stdPaymentDtl: builder.query({
            query: (id) => ({
                url: `${PAYMENT_URL}/paymentdtl/${id}`,
                method: 'GET',
            }),
        }),
        feePayment: builder.mutation({
              query: (data) => ({
                url: `${PAYMENT_URL}/feePayment`,
                method: 'POST',
                body: data,
            }),
        }),
        paymentVerify: builder.mutation({
            query:(FormData)=>({
                url: `${PAYMENT_URL}/paymentVerify`,
                method: 'PATCH',
                body: FormData,
            })
        })

    }),
});

export const { useFeePaymentMutation,usePaymentVerifyMutation,useStdPaymentDtlQuery} =
paymentApiSlice;