// store/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IProduct,
  IProductResponse,
  IProductUpdate,
  IProductInput,
  ICartProduct,
} from '../types/types';
import { IUser } from './auth';
import { ICart } from './cart';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
  }),
  tagTypes: ['Products', 'Auth'],
  endpoints: (build) => ({
    // Products
    getProducts: build.query<IProduct[], void>({
      query: () => 'products',
      transformResponse: (response: IProductResponse) => response.products,
      providesTags: ['Products'],
      keepUnusedDataFor: 600,
    }),

    addProduct: build.mutation<IProduct, IProductInput>({
      query: (newProduct) => ({
        url: `/products/add`,
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: ['Products'],
    }),

    updateProduct: build.mutation<IProduct, IProductUpdate>({
      query: ({ id, product }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: product,
      }),
      invalidatesTags: ['Products'],
    }),

    deleteProduct: build.mutation<IProduct, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),

    orderSubmit: build.mutation<void, ICart>({
      query: (order) => ({
        url: '/order',
        method: 'POST',
        body: order,
      }),
    }),

    // Authorize
    login: build.mutation<{ user: IUser; token: string }, { username: string; password: string }>({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useLoginMutation,
  useOrderSubmitMutation,
} = api;
