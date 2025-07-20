// components/Wishlist.jsx
import React from "react";
import Wishlist from "../Components/Wishlist_com/Wishlist";
import Just_for_you from "../Components/Wishlist_com/Just_for_you";

const Wishlist_page = () => {
  return (
    <div className="w-full px-7 lg:px-35">
        <Wishlist/>
        <Just_for_you/>
    </div>
  );
};

export default Wishlist_page;
