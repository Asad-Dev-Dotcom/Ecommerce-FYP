import React, { useEffect, useRef, useState } from "react";
import { LuMoveRight, LuMoveLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import ProductCard from "../ProductCard/Product_card";
import { useDispatch } from "react-redux";
import { setProducts } from "../../Features/Products/productsSlice";

const FlashSales = () =>
{
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sliderRef = useRef(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  // Countdown Timer
  useEffect(() =>
  {
    const timer = setInterval(() =>
    {
      setTimeLeft((prev) =>
      {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) seconds--;
        else if (minutes > 0)
        {
          minutes--;
          seconds = 59;
        } else if (hours > 0)
        {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0)
        {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Flash Products
  const products = [
    {
      id: 201,
      image: "/Public/apple-iphone-14-pro-max-z357i (1).jpg",
      title: "iPhone 14 Pro Max",
      price: 1099,
      originalPrice: 1299,
      rating: 4.7,
      category: "Mobiles",
      description: "The iPhone 14 Pro Max features a powerful A16 chip and a stunning display.",
    },
    {
      id: 202,
      image: "https://images.unsplash.com/photo-1717354585346-c35eb01a1032",
      title: "Samsung Galaxy S22",
      price: 899,
      originalPrice: 999,
      rating: 4.4,
      category: "Mobiles",
      description: "Samsung Galaxy S22 offers a sleek design with fast processor and impressive camera setup.",
    },
    {
      id: 203,
      image: "https://images.unsplash.com/photo-1585386959984-a4155227c8c2",
      title: "Sony WH-1000XM5",
      price: 299,
      originalPrice: 399,
      rating: 4.8,
      category: "Headphones",
      description: "Sony WH-1000XM5 delivers excellent sound quality and noise cancellation.",
    },
    {
      id: 204,
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
      title: "MacBook Pro M2",
      price: 1999,
      originalPrice: 2299,
      rating: 4.9,
      category: "Computers",
      description: "The MacBook Pro M2 is a powerful laptop with impressive performance.",
    },
    {
      id: 205,
      image: "https://images.unsplash.com/photo-1606813909353-2f3c61d29314",
      title: "Apple Watch Ultra",
      price: 699,
      originalPrice: 799,
      rating: 4.6,
      category: "Smart Watch",
      description: "Apple Watch Ultra offers a large display and advanced fitness features.",
    },
    {
      id: 206,
      image: "https://images.unsplash.com/photo-1555617989-b7d3e69413f5",
      title: "JBL Speaker",
      price: 149,
      originalPrice: 199,
      rating: 4.3,
      category: "Speakers",
      description: "JBL Speaker provides high-quality sound with portability.",
    },
    {
      id: 207,
      image: "https://images.unsplash.com/photo-1555617989-b7d3e69413f5",
      title: "Sony Bluetooth Speaker",
      price: 179,
      originalPrice: 249,
      rating: 4.6,
      category: "Speakers",
      description: "Sony Bluetooth Speaker offers superb sound quality and is waterproof.",
    },
    {
      id: 208,
      image: "https://images.unsplash.com/photo-1606813909353-2f3c61d29314",
      title: "Fitbit Sense",
      price: 299,
      originalPrice: 349,
      rating: 4.5,
      category: "Smart Watch",
      description: "Fitbit Sense is a health-focused smartwatch with built-in GPS and stress management tools.",
    },
    {
      id: 209,
      image: "https://images.unsplash.com/photo-1717354585346-c35eb01a1032",
      title: "Samsung Galaxy Watch 4",
      price: 250,
      originalPrice: 280,
      rating: 4.4,
      category: "Smart Watch",
      description: "Samsung Galaxy Watch 4 provides advanced health monitoring features and a sleek design.",
    },
    {
      id: 210,
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
      title: "Dell XPS 13",
      price: 1399,
      originalPrice: 1599,
      rating: 4.6,
      category: "Computers",
      description: "Dell XPS 13 offers exceptional performance with a slim design and ultra-portable features.",
    },
  ];


  // Slider scroll
  const scrollSlider = (direction) =>
  {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full px-6 py-5">
      {/* Section Title */}
      <div className="flex items-center gap-2 mb-3">
        <div className="relative inline-block group cursor-pointer">
          <div className="absolute top-0 left-0 h-full bg-red-500 rounded-sm transition-all duration-500 w-3 group-hover:w-full z-0"></div>
          <h3 className="relative z-10 px-6 py-1 text-red-500 font-semibold transition-colors duration-500 group-hover:text-white">
            Today's
          </h3>
        </div>
      </div>

      {/* Title + Timer + Arrows */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-12 flex-wrap">
          <h2 className="text-3xl font-bold text-gray-800 whitespace-nowrap">
            Flash Sales
          </h2>

          {/* Countdown */}
          <div className="flex items-end gap-3">
            {["Days", "Hours", "Minutes", "Seconds"].map((label, index) =>
            {
              const value = [
                timeLeft.days,
                timeLeft.hours,
                timeLeft.minutes,
                timeLeft.seconds,
              ][index];

              return (
                <React.Fragment key={label}>
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-semibold">{label}</span>
                    <span className="text-3xl font-bold pb-4">
                      {String(value).padStart(2, "0")}
                    </span>
                  </div>
                  {index !== 3 && (
                    <span className="text-3xl font-bold pb-5 text-orange-500">
                      :
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Arrows */}
        <div className="flex gap-3">
          <button
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center transition-all hover:bg-black hover:text-white cursor-pointer"
            onClick={() => scrollSlider("left")}
          >
            <LuMoveLeft size={20} />
          </button>
          <button
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center transition-all hover:bg-black hover:text-white cursor-pointer"
            onClick={() => scrollSlider("right")}
          >
            <LuMoveRight size={20} />
          </button>
        </div>
      </div>

      {/* Product Slider */}
      <div className="w-full overflow-x-auto scrollbar-hide" ref={sliderRef}>
        <div className="flex gap-6 min-w-max scroll-smooth">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>


      {/* View All Button */}
      <div className="w-full px-6 py-5">
        {/* View All Button */}
        <div className="w-full flex justify-center mt-6">
          <button
            onClick={() =>
            {
              localStorage.setItem("products", JSON.stringify(products));
              window.open("/products/flash-sales", "_blank"); // ✅ new path
            }}
            className="bg-red-600 text-white px-7 py-3 rounded-sm hover:bg-red-500 transition cursor-pointer mt-5 font-quicksand font-semibold"
          >
            View All Product
          </button>

        </div>
      </div>
    </div>
  );
};

export default FlashSales;
