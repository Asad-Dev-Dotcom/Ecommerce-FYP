import React from "react";
import { Link } from "react-router-dom";
import { useGetTopCategoriesQuery } from "../../redux/apis/homeApis";

const Sidebar = () => {
  const { data: categories, isLoading, error } = useGetTopCategoriesQuery();

  if (isLoading) {
    return (
      <div className="bg-white w-full sm:w-64 px-4 py-6 border-r border-r-gray-500">
        <div className="space-y-2">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    console.error('Sidebar API error:', error);
    return (
      <div className="bg-white w-full sm:w-64 px-4 py-6 border-r border-r-gray-500">
        <div className="space-y-2">
          <div className="text-gray-500 text-sm px-2 py-1">Electronics</div>
          <div className="text-gray-500 text-sm px-2 py-1">Clothing</div>
          <div className="text-gray-500 text-sm px-2 py-1">Home & Garden</div>
          <div className="text-gray-500 text-sm px-2 py-1">Sports</div>
          <div className="text-gray-500 text-sm px-2 py-1">Books</div>
        </div>
      </div>
    );
  }

  // Ensure categories is an array
  const categoriesArray = Array.isArray(categories) ? categories : [];

  if (categoriesArray.length === 0) {
    return (
      <div className="bg-white w-full sm:w-64 px-4 py-6 border-r border-r-gray-500">
        <div className="space-y-2">
          <div className="text-gray-500 text-sm px-2 py-1">No categories available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white w-full sm:w-64 px-4 py-6 border-r border-r-gray-500">
      <div className="space-y-2">
        {categoriesArray.map((category) => {
          const formattedCategory = category.title
            .toLowerCase()
            .replace(/[\s&']+/g, "-");

          return (
            <Link
              key={category._id || category.id}
              to={`/product_list/${formattedCategory}`}
              className="group block cursor-pointer hover:bg-gray-100 px-2 py-1 rounded transition-all"
            >
              <div className="relative inline-block">
                <span className="text-md font-medium group-hover:text-black transition-all font-quicksand">
                  {category.title || category.name}
                </span>
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
