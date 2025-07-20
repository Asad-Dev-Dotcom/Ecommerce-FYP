import React from "react";
import { Link } from "react-router-dom";

const categories = [
  "Woman's Fashion",
  "Men's Fashion",
  "Electronics",
  "Home & Lifestyle",
  "Medicine",
  "Sports & Outdoor",
  "Baby's & Toys",
  "Groceries & Pets",
  "Health & Beauty",
];

const Sidebar = () => {
  return (
    <div className="bg-white w-full sm:w-64 px-4 py-6 border-r border-r-gray-500">
      <div className="space-y-2">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
          >
            <div className="relative inline-block">
              <Link
                to={`/category/${category.toLowerCase().replace(/[\s&]+/g, "-")}`}
                className="text-md font-medium group-hover:text-black transition-all font-quicksand"
              >
                {category}
              </Link>
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
