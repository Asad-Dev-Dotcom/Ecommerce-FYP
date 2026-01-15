import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getEnv from "../../configs/config.js";

const wishlistApis = createApi({
  reducerPath: "wishlistApis",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getEnv("SERVER_URL")}/api/wishlist`,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    // Add product to wishlist
    addToWishlist: builder.mutation({
      query: (productId) => ({
        url: "/add",
        method: "POST",
        body: { productId },
      }),
    }),

    // Remove product from wishlist
    removeFromWishlist: builder.mutation({
      query: (productId) => ({
        url: `/remove/${productId}`,
        method: "DELETE",
      }),
    }),

    // Get user's wishlist
    getUserWishlist: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),

    // Check if product is in wishlist
    checkWishlistStatus: builder.query({
      query: (productId) => ({
        url: `/check/${productId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useGetUserWishlistQuery,
  useCheckWishlistStatusQuery,
} = wishlistApis;

export default wishlistApis;