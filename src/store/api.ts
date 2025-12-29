import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IProduct, IProductResponse } from '../types/types';
import { IUser } from './auth';
import { ICart } from './cart';
import { RootState } from './store';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Products', 'Auth'],
  endpoints: (build) => ({
    // Products
    getAllProducts: build.query<IProduct[], string | void>({
      query: () => `products`,
      transformResponse: (response: IProductResponse) => response.products,
      providesTags: ['Products'],
      keepUnusedDataFor: 600,
    }),

    getProductsByCategory: build.query<IProduct[], string | void>({
      query: (category) => (category ? `products/category/${category}` : 'products'),
      transformResponse: (response: IProductResponse) => response.products,
      providesTags: ['Products'],
      keepUnusedDataFor: 600,
    }),

    getProductById: build.query<IProduct, string>({
      query: (id) => `products/${id}`,
    }),

    // Cart
    orderSubmit: build.mutation<void, ICart>({
      query: (order) => ({
        url: '/order',
        method: 'POST',
        body: order,
      }),
    }),

    // Authorize
    login: build.mutation<IUser & { token: string }, { username: string; password: string }>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductsByCategoryQuery,
  useLoginMutation,
  useOrderSubmitMutation,
  useGetProductByIdQuery,
} = api;
