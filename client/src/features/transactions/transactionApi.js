import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const transactionApi = createApi({
  reducerPath: 'transactionApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Transaction'],
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: () => '/transactions',
      transformResponse: (transactions) =>
        transactions.map(({ _id, ...transaction }) => ({
          ...transaction,
          id: _id,
        })),
      providesTags: [{ type: 'Transaction', id: 'LIST' }],
    }),
    createTransaction: builder.mutation({
      query: (transaction) => ({
        url: '/transactions',
        method: 'POST',
        body: transaction,
      }),
      invalidatesTags: [{ type: 'Transaction', id: 'LIST' }],
    }),
    updateTransaction: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `/transactions/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: [{ type: 'Transaction', id: 'LIST' }],
    }),
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Transaction', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionApi;
