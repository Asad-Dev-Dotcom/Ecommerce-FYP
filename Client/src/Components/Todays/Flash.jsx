import React, { useEffect, useRef, useState } from "react";
import { LuMoveRight, LuMoveLeft } from "react-icons/lu";
import { AiOutlineHeart } from "react-icons/ai";

const FlashSales = () =>
{
    const [timeLeft, setTimeLeft] = useState({
        days: 3,
        hours: 23,
        minutes: 59,
        seconds: 59,
    });

    const sliderRef = useRef(null);

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

    const scrollSlider = (direction) =>
    {
        if (!sliderRef.current) return;
        const scrollAmount = 300;
        sliderRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    const timeLabels = ["Days", "Hours", "Minutes", "Seconds"];
    const timeValues = [
        timeLeft.days,
        timeLeft.hours,
        timeLeft.minutes,
        timeLeft.seconds,
    ];

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

                    <div className="flex items-end gap-3">
                        {timeLabels.map((label, index) => (
                            <React.Fragment key={label}>
                                <div className="flex flex-col items-center">
                                    <span className="text-sm font-semibold">{label}</span>
                                    <span className="text-3xl font-bold pb-4">
                                        {String(timeValues[index]).padStart(2, "0")}
                                    </span>
                                </div>
                                {index !== timeLabels.length - 1 && (
                                    <span className="text-3xl font-bold pb-5 text-orange-500">
                                        :
                                    </span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

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
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="w-60 bg-white group relative overflow-hidden cursor-pointer"
                        >
                            <div className="relative w-full h-50 overflow-hidden rounded-md">
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
            <div className="w-full flex justify-center mt-6">
                <button className="bg-red-600 text-white px-7 py-3 rounded-sm  hover:bg-red-500 transition cursor-pointer mt-5 font-quicksand font-semibold ">
                    View All Product
                </button>
            </div>
            <hr className="mt-17 border-t-2 border-gray-300 " />
        </div>
    );
};

export default FlashSales;
