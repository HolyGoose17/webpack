import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct, IProductResponse, IProductUpdate, IProductInput } from '../types/types';
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
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useLoginMutation,
  useOrderSubmitMutation,
} = api;
