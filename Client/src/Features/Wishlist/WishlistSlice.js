import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
      const existingItem = state.wishlistItems.find(
        (wishlistItem) => wishlistItem.product._id === item.product._id
      );

      if (!existingItem) {
        state.wishlistItems.push(item);
      }
    },

    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.product._id !== productId
      );
    },

    setWishlistItems: (state, action) => {
      state.wishlistItems = action.payload;
    },

    clearWishlist: (state) => {
      state.wishlistItems = [];
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  setWishlistItems,
  clearWishlist,
  setLoading,
  setError,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;