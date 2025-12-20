// Components/Others.jsx
import React from "react";
import { FaTruckFast } from "react-icons/fa6";
import { TfiHeadphoneAlt } from "react-icons/tfi";

const features = [
  {
    title: "FREE AND FAST DELIVERY",
    description: "Free delivery for all orders over $140",
    icon: <FaTruckFast className="text-white text-xl" />,
  },
  {
    title: "24/7 CUSTOMER SERVICE",
    description: "Friendly 24/7 customer support",
    icon: <TfiHeadphoneAlt className="text-white text-xl" />,
  },
  {
    title: "MONEY BACK GUARANTEE",
    description: "We return money within 30 days",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4M12 21a9 9 0 100-18 9 9 0 000 18z"
        />
      </svg>
    ),
  },
];

const Others = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 = mb-20">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col items-center space-y-3 text-center"
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-300">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black">
              {feature.icon}
            </div>
          </div>
          <h3 className="font-bold text-sm md:text-base">{feature.title}</h3>
          <p className="text-sm text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Others;
