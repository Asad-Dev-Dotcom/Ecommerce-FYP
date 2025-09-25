import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const Just_for_you = () => {
  const [products] = useState([
    {
      id: 1,
      image: "/Public/apple-iphone-14-pro-max-z357i (1).jpg",
      title: "iPhone 14 Pro Max",
      price: 1099,
      originalPrice: 1299,
      rating: 4.5,
    },
    {
      id: 2,
      image: "/Public/apple-iphone-14-pro-max-z357i (1).jpg",
      title: "Samsung Galaxy S22",
      price: 899,
      originalPrice: 999,
      rating: 4.2,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1585386959984-a4155227c8c2",
      title: "Sony WH-1000XM5",
      price: 299,
      originalPrice: 399,
      rating: 4.7,
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
      title: "MacBook Pro M2",
      price: 1999,
      originalPrice: 2299,
      rating: 4.9,
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1606813909353-2f3c61d29314",
      title: "Apple Watch Ultra",
      price: 699,
      originalPrice: 799,
      rating: 4.6,
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1555617989-b7d3e69413f5",
      title: "JBL Speaker",
      price: 149,
      originalPrice: 199,
      rating: 4.1,
    },
  ]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {Array(fullStars)
          .fill()
          .map((_, i) => (
            <FaStar key={`full-${i}`} className="text-yellow-500 text-xs" />
          ))}
        {halfStar && <FaStarHalfAlt className="text-yellow-500 text-xs" />}
        {Array(emptyStars)
          .fill()
          .map((_, i) => (
            <FaRegStar key={`empty-${i}`} className="text-yellow-500 text-xs" />
          ))}
      </div>
    );
  };

  return (
    <div className="w-full px-6 lg:px-10">
      {/* Section Title */}
      <div className="flex items-center justify-between gap-2 mb-15 mt-15">
        <div className="relative inline-block group cursor-pointer">
          <div className="absolute top-0 left-0 h-full bg-red-500 rounded-sm transition-all duration-500 w-3 group-hover:w-full z-0"></div>
          <h3 className="relative z-10 px-6 text-2xl py-1 text-red-500 font-semibold transition-colors duration-500 group-hover:text-white">
            Just For You
          </h3>
        </div>

        <button className="bg-white text-black border px-6 py-3 rounded-sm hover:bg-black hover:text-white transition cursor-pointer font-quicksand font-semibold">
          See All
        </button>
      </div>

      {/* Product Cards */}
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white group relative overflow-hidden cursor-pointer"
            >
              <div className="relative w-full h-70 overflow-hidden rounded-md">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* View Icon */}
                <div className="absolute top-2 right-2 w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600">
                  <IoEyeOutline className="text-white" size={25} />
                </div>

                {/* Add to Cart always visible */}
                <button className="absolute bottom-0 left-0 right-0 w-full py-2 text-sm font-medium bg-black text-white border-gray-200 cursor-pointer">
                  Add to Cart
                </button>
              </div>

              {/* Title & Price */}
              <h3 className="mt-3 text-sm font-semibold text-gray-700 px-2 truncate">
                {product.title}
              </h3>

              {/* Price */}
              <div className="mt-1 flex items-center gap-2 px-2">
                <span className="text-red-600 font-bold text-base">
                  ${product.price}
                </span>
                <span className="line-through text-gray-400 text-sm">
                  ${product.originalPrice}
                </span>
              </div>

              {/* Rating with Number */}
              <div className="flex items-center gap-2 px-2 pb-3 mt-1">
                {renderStars(product.rating)}
                <span className="text-sm text-gray-500 font-medium">
                  ({product.rating})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="mt-10 border-t-2 border-gray-300" />
    </div>
  );
};

export default Just_for_you;
