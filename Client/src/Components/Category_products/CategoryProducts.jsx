import React from "react";
import { useParams } from "react-router-dom";

const allProducts = [/* all products with category info */];

const CategoryProducts = () => {
  const { categoryName } = useParams();

  // Filter products based on the selected category
  const filteredProducts = allProducts.filter(
    (p) => p.category.toLowerCase().replace(/[\s&]+/g, "-") === categoryName
  );

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4 capitalize">{categoryName.replace(/-/g, " ")}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white shadow p-3 rounded">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-3" />
            <h3 className="font-semibold">{product.title}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
