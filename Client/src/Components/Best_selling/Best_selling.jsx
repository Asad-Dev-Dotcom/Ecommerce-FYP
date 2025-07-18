import React, { useRef, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";

const BestSelling = () => {
  const sliderRef = useRef(null);
  const [viewAll, setViewAll] = useState(false);

  const products = [
    {
      id: 1,
      image: "/Public/apple-iphone-14-pro-max-z357i (1).jpg",
      title: "iPhone 14 Pro Max",
      price: 1099,
      originalPrice: 1299,
      rating: 4.7,
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1717354585346-c35eb01a1032",
      title: "Samsung Galaxy S22",
      price: 899,
      originalPrice: 999,
      rating: 4.4,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1585386959984-a4155227c8c2",
      title: "Sony WH-1000XM5",
      price: 299,
      originalPrice: 399,
      rating: 4.8,
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
      rating: 4.3,
    },
  ];

  // Show only 4 if not viewAll
  const displayedProducts = viewAll ? products : products.slice(0, 4);

  return (
    <div className="w-full px-6">
      {/* Section Title */}
      <div className="flex items-center gap-2 mb-3">
        <div className="relative inline-block group cursor-pointer">
          <div className="absolute top-0 left-0 h-full bg-red-500 rounded-sm transition-all duration-500 w-3 group-hover:w-full z-0"></div>
          <h3 className="relative z-10 px-6 py-1 text-red-500 font-semibold transition-colors duration-500 group-hover:text-white">
           This Month
          </h3>
        </div>
      </div>

      {/* Title + View All Button */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
        <h2 className="text-3xl font-bold text-gray-800 whitespace-nowrap">
          Best Selling
        </h2>
        <button
          onClick={() => setViewAll(!viewAll)}
          className="bg-red-600 text-white px-10 py-4 rounded-sm hover:bg-red-500 transition cursor-pointer font-quicksand font-semibold"
        >
          {viewAll ? "Show Less" : "View All"}
        </button>
      </div>

      {/* Product Cards */}
      <div className="w-full overflow-x-auto scrollbar-hide" ref={sliderRef}>
        <div className="flex gap-6 min-w-max scroll-smooth flex-wrap justify-start">
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              className="w-70 bg-white group relative overflow-hidden cursor-pointer"
            >
              <div className="relative w-full h-60 overflow-hidden rounded-md">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 bg-gray-200 group-hover:bg-black rounded-full flex items-center justify-center cursor-pointer">
                    <AiOutlineHeart className="text-gray-700 group-hover:text-white" size={18} />
                  </div>
                </div>
                <div className="absolute bottom-[-100%] left-0 w-full transition-all duration-300 group-hover:bottom-0">
                  <button className="w-full py-2 text-sm font-medium bg-white text-black group-hover:bg-black group-hover:text-white hover:bg-white hover:text-black cursor-pointer">
                    Add to Cart
                  </button>
                </div>
              </div>

              <h3 className="mt-3 text-sm font-semibold text-gray-700 px-2 truncate">
                {product.title}
              </h3>
              <div className="mt-1 flex items-center gap-2 px-2">
                <span className="text-red-600 font-bold text-base">
                  ${product.price}
                </span>
                <span className="line-through text-gray-400 text-sm">
                  ${product.originalPrice}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-1 px-2 pb-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={
                      i < Math.round(product.rating)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                ))}
                <span className="text-sm text-gray-600">
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

export default BestSelling;
