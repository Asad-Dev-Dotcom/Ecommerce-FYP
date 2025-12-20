import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "../../Features/Products/productsSlice";
import ProductCard from "../ProductCard/Product_card";
import { useNavigate } from "react-router-dom";
import { LuMoveLeft, LuMoveRight } from "react-icons/lu";

const BestSelling = () => {
  const sliderRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = [
    {
      id: 211,
      image: "/Public/apple-iphone-14-pro-max-z357i (1).jpg",
      title: "iPhone 12",
      price: 899,
      originalPrice: 999,
      rating: 4.6,
      category: "Mobiles",
      description:
        "iPhone 12 offers a sleek design and great camera capabilities for photography enthusiasts.",
    },
    {
      id: 212,
      image: "https://images.unsplash.com/photo-1585386959984-a4155227c8c2",
      title: "OnePlus 8 Pro",
      price: 899,
      originalPrice: 1000,
      rating: 4.4,
      category: "Mobiles",
      description:
        "OnePlus 8 Pro comes with an AMOLED display and fast charging technology.",
    },
    {
      id: 213,
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
      title: "MacBook Air M1",
      price: 1199,
      originalPrice: 1399,
      rating: 4.8,
      category: "Computers",
      description:
        "MacBook Air M1 provides excellent performance in a thin and light form factor.",
    },
    {
      id: 214,
      image: "https://images.unsplash.com/photo-1717354585346-c35eb01a1032",
      title: "MacBook Pro 16-inch",
      price: 2499,
      originalPrice: 2799,
      rating: 4.9,
      category: "Computers",
      description:
        "MacBook Pro 16-inch comes with a powerful M1 Pro chip and a stunning Retina display.",
    },
    {
      id: 215,
      image: "https://images.unsplash.com/photo-1606813909353-2f3c61d29314",
      title: "Garmin Forerunner 945",
      price: 599,
      originalPrice: 699,
      rating: 4.7,
      category: "Smart Watch",
      description:
        "Garmin Forerunner 945 is designed for athletes with GPS tracking and heart rate monitoring.",
    },
    {
      id: 216,
      image: "https://images.unsplash.com/photo-1555617989-b7d3e69413f5",
      title: "Bose SoundLink",
      price: 199,
      originalPrice: 229,
      rating: 4.5,
      category: "Speakers",
      description:
        "Bose SoundLink offers immersive sound and is perfect for travel with its portability.",
    },
    {
      id: 217,
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
      title: "Razer Blade 15",
      price: 1899,
      originalPrice: 2099,
      rating: 4.8,
      category: "Computers",
      description:
        "Razer Blade 15 is a powerful gaming laptop with a high refresh rate display.",
    },
    {
      id: 218,
      image: "https://images.unsplash.com/photo-1717354585346-c35eb01a1032",
      title: "Samsung Galaxy Z Fold 4",
      price: 1799,
      originalPrice: 1999,
      rating: 4.6,
      category: "Mobiles",
      description:
        "Samsung Galaxy Z Fold 4 offers a foldable display with an immersive experience.",
    },
    {
      id: 219,
      image: "https://images.unsplash.com/photo-1606813909353-2f3c61d29314",
      title: "Fitbit Versa 3",
      price: 229,
      originalPrice: 250,
      rating: 4.5,
      category: "Smart Watch",
      description:
        "Fitbit Versa 3 tracks your fitness activities with built-in GPS and heart rate monitoring.",
    },
    {
      id: 220,
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
      title: "Alienware m15 R6",
      price: 1899,
      originalPrice: 2199,
      rating: 4.8,
      category: "Computers",
      description:
        "Alienware m15 R6 is a high-performance gaming laptop designed for ultimate gaming experience.",
    },
  ];

  // View All button handler
// View All button handler
const handleViewAll = () => {
  dispatch(setProducts(products));
  localStorage.setItem("products", JSON.stringify(products));
  
  // ✅ new tab me kholna
  window.open("/products/best-selling", "_blank");
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
        {products.map((product) => (
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
