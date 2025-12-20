import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Features/Cart/CartSlice";
import productsReducer from "../Features/Products/productsSlice";
import wishlistReducer from "../Features/Wishlist/WishlistSlice";
import ordersReducer from "../Features/Orders/OrdersSlice"; // 👈 new

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    wishlist: wishlistReducer,
    orders: ordersReducer, // 👈 add this
  },
});
