import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IErrorResponse,
  IProduct,
  IProductResponse,
  IProductUpdate,
  ProductInput,
} from "../../types/product.types";

export const ProductApi = createApi({
  reducerPath: "productsApi",   

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
  }),
  tagTypes: ["Products"],

  endpoints: (build) => ({
    getProducts: build.query<IProduct[], void>({
      query: () => "products",
      transformResponse: (response: IProductResponse) => response.products,
      transformErrorResponse: (response: IErrorResponse) => ({
        status: response.status,
        message: (response.data && response.data.message) || "Unknown error",
      }),
      providesTags: ["Products"],
      keepUnusedDataFor: 600,
    }),

    addProduct: build.mutation<IProduct, ProductInput>({
      query: (newProduct) => ({
        url: `/products/add`,
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
      transformErrorResponse: (response: IErrorResponse) => ({
        status: response.status,
        message: response.data.message || "Error in added new product",
      }),
    }),

    updateProduct: build.mutation<IProduct, IProductUpdate>({
      query: ({ id, product }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Products"],
      transformErrorResponse: (response: IErrorResponse) => ({
        status: response.status,
        message: response.data.message || "Error in update product",
      }),
    }),

    deleteProduct: build.mutation<IProduct, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
      transformErrorResponse: (response: IErrorResponse) => ({
        status: response.status,
        message: response.data.message || "Error to delete product",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = ProductApi;
