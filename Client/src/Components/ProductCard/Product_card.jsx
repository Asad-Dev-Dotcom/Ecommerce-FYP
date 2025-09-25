import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../Features/Cart/CartSlice";
import { addToWishlist, removeFromWishlist } from "../../Features/Wishlist/WishlistSlice";
import { toast } from "react-toastify"; // ✅ import

const ProductCard = ({ product }) =>
{
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // check product wishlist mei hai ya nahi
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const toggleWishlist = (e) => {
  e.stopPropagation();
  if (isInWishlist) {
    dispatch(removeFromWishlist(product.id));
    toast.info(" Item removed from wishlist");
  } else {
    dispatch(
      addToWishlist({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.image,
        originalPrice: product.originalPrice,
        rating: product.rating,
      })
    );
    toast.success(" Item added to wishlist");
  }
};


  return (
    <div
      className="w-72 bg-white group relative overflow-hidden cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative w-full h-62 overflow-hidden rounded-md">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Wishlist Heart */}
        <div
          className="absolute top-2 right-2 transition-opacity duration-300"
          onClick={toggleWishlist}
        >
          <div className="w-10 h-10 bg-gray-200 hover:bg-black rounded-full flex items-center justify-center cursor-pointer">
            {isInWishlist ? (
              <AiFillHeart className="text-red-500" size={22} />
            ) : (
              <AiOutlineHeart className="text-gray-700" size={22} />
            )}
          </div>
        </div>

        {/* Add to Cart */}
        <div className="absolute bottom-[-100%] left-0 w-full transition-all duration-300 group-hover:bottom-0">
          <button
            onClick={(e) =>
            {
              e.stopPropagation();
              dispatch(
                addToCart({
                  id: product.id,
                  name: product.title,
                  price: product.price,
                  image: product.image,
                })
              );
              toast.success("Your item is added to cart!"); // ✅ show notification
            }}
            className="w-full py-3 text-sm font-medium bg-white text-black group-hover:bg-black group-hover:text-white hover:bg-white hover:text-black cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <h3 className="mt-4 text-lg font-semibold text-gray-700 px-3 truncate">
        {product.title}
      </h3>
      <div className="mt-1 flex items-center gap-3 px-3">
        <span className="text-red-600 font-bold text-base">${product.price}</span>
        <span className="line-through text-gray-400 text-sm">
          ${product.originalPrice}
        </span>
      </div>
      <div className="mt-1 flex items-center gap-2 px-3 pb-4">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={
              i < Math.round(product.rating) ? "text-yellow-500" : "text-gray-300"
            }
          >
            ★
          </span>
        ))}
        <span className="text-sm text-gray-600">({product.rating})</span>
      </div>
    </div>
  );
};

export default ProductCard;
