import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [], // Flash sales or other sections ke products yahan store honge
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
