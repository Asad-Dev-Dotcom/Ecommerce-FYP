import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getEnv from "../../configs/config.js";

const orderApis = createApi({
  reducerPath: "orderApis",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getEnv("SERVER_URL")}/api/orders`,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    // Client-side orders
    // Create order
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/",
        method: "POST",
        body: orderData,
      }),
    }),

    // Get my orders
    getMyOrders: builder.query({
      query: (params) => ({
        url: "/my-orders",
        method: "GET",
        params,
      }),
    }),

    // Get single order
    getOrder: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),

    // Cancel order
    cancelOrder: builder.mutation({
      query: (id) => ({
        url: `/${id}/cancel`,
        method: "PUT",
      }),
    }),

    // Admin-side orders
    // Get all orders (admin)
    getAllOrders: builder.query({
      query: (params) => ({
        url: "/admin/all",
        method: "GET",
        params,
      }),
    }),

    // Update order status (admin)
    updateOrderStatus: builder.mutation({
      query: ({ id, status, trackingNumber }) => ({
        url: `/${id}/status`,
        method: "PUT",
        body: { status, trackingNumber },
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderQuery,
  useCancelOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderApis;

export default orderApis;
