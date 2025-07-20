import React, { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";

const Wishlist = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      image: "/Public/apple-iphone-14-pro-max-z357i (1).jpg",
      title: "iPhone 14 Pro Max",
      price: 1099,
      originalPrice: 1299,
    },
    {
      id: 2,
      image: "/Public/apple-iphone-14-pro-max-z357i (1).jpg",
      title: "Samsung Galaxy S22",
      price: 899,
      originalPrice: 999,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1585386959984-a4155227c8c2",
      title: "Sony WH-1000XM5",
      price: 299,
      originalPrice: 399,
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
      title: "MacBooook Pro M2",
      price: 1999,
      originalPrice: 2299,
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1606813909353-2f3c61d29314",
      title: "Apple Watch Ultra",
      price: 699,
      originalPrice: 799,
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1555617989-b7d3e69413f5",
      title: "JBL Speaker",
      price: 149,
      originalPrice: 199,
    },
  ]);

  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  return (
    <div className="w-full px-6 lg:px-10">
      {/* Section Title */}
      <div className="flex items-center justify-between gap-2 mb-15 mt-15">
        <div className="relative inline-block group cursor-pointer">
          <div className="absolute top-0 left-0 h-full bg-red-500 rounded-sm transition-all duration-500 w-3 group-hover:w-full z-0"></div>
          <h3 className="relative z-10 px-6 text-2xl py-1 text-red-500 font-semibold transition-colors duration-500 group-hover:text-white">
            Wishlist ({products.length})
          </h3>
        </div>

        <button className="bg-White text-Black border px-6 py-3 rounded-sm hover:bg-black hover:text-white transition cursor-pointer font-quicksand font-semibold">
          Move All to Bag
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

                {/* Delete Button */}
                <div
                  onClick={() => handleDelete(product.id)}
                  className="absolute top-2 right-2 w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600"
                >
                  <MdOutlineDelete className="text-white" size={25} />
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
              <div className="mt-1 flex items-center gap-2 px-2 pb-3">
                <span className="text-red-600 font-bold text-base">
                  ${product.price}
                </span>
                <span className="line-through text-gray-400 text-sm">
                  ${product.originalPrice}
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

export default Wishlist;
