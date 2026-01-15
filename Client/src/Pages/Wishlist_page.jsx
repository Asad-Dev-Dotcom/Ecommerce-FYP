import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillHeart } from "react-icons/ai";
import { removeFromWishlist } from "../Features/Wishlist/WishlistSlice";
import { addToCart } from "../Features/Cart/CartSlice";
import { useNavigate } from "react-router-dom";
import { useGetUserWishlistQuery } from "../redux/apis/wishlistApis";
import { useRemoveFromWishlistMutation } from "../redux/apis/wishlistApis";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [removeFromWishlistApi] = useRemoveFromWishlistMutation();
  const { data, isLoading, isError } = useGetUserWishlistQuery();
  const wishlist = data?.data || [];

  if (isLoading){
    return <div>Loading...</div>;
  }
  if (isError){
    return <div>Error: {isError.message}</div>;
  }

  return (
    <div className="w-full py-8">
      <h2 className="text-3xl text-center font-semibold mb-9">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-500 text-center text-2xl">
            No items in wishlist.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors cursor-pointer"
          >
            Add Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-37">
          {wishlist?.map((item) => (
            <div
              key={item?.id || item?._id}
              className="w-72 bg-white group relative overflow-hidden cursor-pointer rounded-md shadow-md hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/product/${item?.id || item?._id}`)}
            >
              {/* Image Section */}
              <div className="relative w-full h-64 overflow-hidden rounded-md">
                <img
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Remove from Wishlist */}
                <div
                  className="absolute top-2 right-2 w-10 h-10 bg-gray-200 hover:bg-black rounded-full flex items-center justify-center cursor-pointer transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(removeFromWishlist(item?.id || item?._id));
                    removeFromWishlistApi(item?.id || item?._id).then(() => {
                    });
                  }}
                >
                  <AiFillHeart className="text-red-500" size={22} />
                </div>

                {/* Add to Cart Button */}
                <div className="absolute bottom-[-100%] left-0 w-full transition-all duration-300 group-hover:bottom-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(
                        addToCart({
                          id: item?.id || item?._id,
                          name: item?.name,
                          price: item?.price,
                          image: item?.image,
                          originalPrice: item?.originalPrice,
                          rating: item?.rating,
                        })
                      );
                    }}
                    className="w-full py-3 text-sm font-medium bg-white text-black group-hover:bg-black group-hover:text-white hover:bg-white hover:text-black cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Title */}
              <h3 className="mt-4 text-lg font-semibold text-gray-700 px-3 truncate">
                {item?.name}
              </h3>

              {/* Price Section */}
              <div className="mt-1 flex items-center gap-3 px-3">
                <span className="text-red-600 font-bold text-base">
                  ${item?.price}
                </span>
                {item.originalPrice && (
                  <span className="line-through text-gray-400 text-sm">
                    ${item?.originalPrice}
                  </span>
                )}
              </div>

              {/* Rating */}
              {item?.rating && (
                <div className="mt-1 flex items-center gap-2 px-3 pb-4">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={
                        i < Math.round(item?.rating)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-sm text-gray-600">
                    ({item?.rating})
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
