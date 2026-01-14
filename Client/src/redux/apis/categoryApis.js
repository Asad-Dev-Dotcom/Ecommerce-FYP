import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getEnv from "../../configs/config.js";

const categoryApis = createApi({
  reducerPath: "categoryApis",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getEnv("SERVER_URL")}/api/categories`,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    // Get all categories
    getAllCategories: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),

    // Get single category
    getCategory: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),

    // Create category (admin only)
    createCategory: builder.mutation({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
        prepareHeaders: (headers) => {
          delete headers['content-type'];
          return headers;
        },
      }),
    }),

    // Update category (admin only)
    updateCategory: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: formData,
        prepareHeaders: (headers) => {
          delete headers['content-type'];
          return headers;
        },
      }),
    }),

    // Delete category (admin only)
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApis;

export default categoryApis;
