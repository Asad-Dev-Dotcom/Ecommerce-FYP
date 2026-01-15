import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "../../Features/Products/productsSlice";
import ProductCard from "../ProductCard/Product_card";
import { useNavigate } from "react-router-dom";
import { LuMoveLeft, LuMoveRight } from "react-icons/lu";
import { useGetBestSellingProductsQuery } from "../../redux/apis/homeApis";

const BestSelling = () => {
  const sliderRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: products, isLoading, error } = useGetBestSellingProductsQuery();

  // Transform API data to match ProductCard format
  // Handle case where API returns undefined or empty data
  const transformedProducts = (Array.isArray(products?.data) ? products.data : []).map(product => ({
    id: product._id,
    image: product.images[0]?.url,
    title: product.name,
    price: product.price,
    rating: 4.5, // Default rating since we don't have this field
    category: product.category,
    description: product.description,
    totalSold: product.totalSold,
  })) || [];

  // View All button handler
const handleViewAll = () => {
  dispatch(setProducts(transformedProducts));
  localStorage.setItem("products", JSON.stringify(transformedProducts));

  // window.open("/products/best-selling", "_blank");
  navigate("/products/best-selling");
};


  // Scroll functions
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <div className="w-full px-6 relative">
        <div className="flex items-center gap-2 mb-3">
          <div className="relative inline-block group cursor-pointer">
            <div className="absolute top-0 left-0 h-full bg-red-500 rounded-sm transition-all duration-500 w-3 group-hover:w-full z-0"></div>
            <h3 className="relative z-10 px-6 py-1 text-red-500 font-semibold transition-colors duration-500 group-hover:text-white">
              This Month
            </h3>
          </div>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
          <h2 className="text-3xl font-bold text-gray-800 whitespace-nowrap">
            Best Selling
          </h2>
          <div className="h-12 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="flex gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="min-w-[280px] animate-pulse">
              <div className="bg-gray-200 h-[250px] rounded-lg"></div>
              <div className="mt-3 space-y-2">
                <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                <div className="bg-gray-200 h-4 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
        <hr className="mt-10 border-t-2 border-gray-300" />
      </div>
    );
  }

  if (error) {
    console.error('BestSelling API error:', error);
    return (
      <div className="w-full px-6 relative">
        <div className="flex items-center gap-2 mb-3">
          <div className="relative inline-block group cursor-pointer">
            <div className="absolute top-0 left-0 h-full bg-red-500 rounded-sm transition-all duration-500 w-3 group-hover:w-full z-0"></div>
            <h3 className="relative z-10 px-6 py-1 text-red-500 font-semibold transition-colors duration-500 group-hover:text-white">
              This Month
            </h3>
          </div>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
          <h2 className="text-3xl font-bold text-gray-800 whitespace-nowrap">
            Best Selling
          </h2>
          <button className="bg-gray-400 text-white px-10 py-4 rounded-sm cursor-not-allowed font-quicksand font-semibold">
            View All
          </button>
        </div>
        <p className="text-gray-500 text-center py-8">Best selling products will appear here once orders are placed.</p>
        <hr className="mt-10 border-t-2 border-gray-300" />
      </div>
    );
  }

  if (!transformedProducts || transformedProducts.length === 0) {
    return (
      <div className="w-full px-6 relative">
        <div className="flex items-center gap-2 mb-3">
          <div className="relative inline-block group cursor-pointer">
            <div className="absolute top-0 left-0 h-full bg-red-500 rounded-sm transition-all duration-500 w-3 group-hover:w-full z-0"></div>
            <h3 className="relative z-10 px-6 py-1 text-red-500 font-semibold transition-colors duration-500 group-hover:text-white">
              This Month
            </h3>
          </div>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
          <h2 className="text-3xl font-bold text-gray-800 whitespace-nowrap">
            Best Selling
          </h2>
          <button className="bg-gray-400 text-white px-10 py-4 rounded-sm cursor-not-allowed font-quicksand font-semibold">
            View All
          </button>
        </div>
        <p className="text-gray-500 text-center py-8">Best selling products will appear here once orders are placed.</p>
        <hr className="mt-10 border-t-2 border-gray-300" />
      </div>
    );
  }

  return (
    <div className="w-full px-6 relative">
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
          onClick={handleViewAll}
          className="bg-red-600 text-white px-10 py-4 rounded-sm hover:bg-red-500 transition cursor-pointer font-quicksand font-semibold"
        >
          View All
        </button>
      </div>

      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md p-3 rounded-full hover:bg-gray-100 z-10"
      >
        <LuMoveLeft className="text-2xl text-gray-700" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md p-3 rounded-full hover:bg-gray-100 z-10"
      >
        <LuMoveRight className="text-2xl text-gray-700" />
      </button>

      {/* Product Cards Slider */}
      <div
        className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
        ref={sliderRef}
      >
        {transformedProducts.map((product) => (
          <div key={product.id} className="min-w-[280px]"> {/* ✅ Bara card */}
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <hr className="mt-10 border-t-2 border-gray-300" />
    </div>
  );
};

export default BestSelling;
