import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
      const exist = state.wishlist.find((p) => p.id === item.id);
      if (!exist) {
        state.wishlist.push(item);
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter((p) => p.id !== action.payload);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
