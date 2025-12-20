import React from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../Components/SideBar/Sidebar";
import ProductCard from "../Components/ProductCard/Product_card";

function Product_list() {
  const { category } = useParams();

  // Dummy Products
  const allProducts = [
    {
      id: 1,
      name: "Red Dress",
      category: "woman's fashion",
      price: 120,
      image: "https://via.placeholder.com/200x200?text=Red+Dress",
      originalPrice: 150,
      rating: 4.5,
    },
    {
      id: 2,
      name: "Men Shirt",
      category: "men's fashion",
      price: 80,
      image: "https://via.placeholder.com/200x200?text=Men+Shirt",
      originalPrice: 100,
      rating: 4.2,
    },
    {
      id: 3,
      name: "Baby Romper",
      category: "Home & Lifestyle",
      price: 40,
      image: "https://via.placeholder.com/200x200?text=Baby+Romper",
      originalPrice: 50,
      rating: 4.0,
    },
    {
      id: 4,
      name: "Smartphone",
      category: "electronics",
      price: 500,
      image: "https://via.placeholder.com/200x200?text=Smartphone",
      originalPrice: 650,
      rating: 4.8,
    },
    {
      id: 5,
      name: "Dining Table",
      category: "Baby's & Toys",
      price: 300,
      image: "https://via.placeholder.com/200x200?text=Dining+Table",
      originalPrice: 350,
      rating: 4.3,
    },
    {
      id: 6,
      name: "Lipstick",
      category: "Groceries & Pets",
      price: 25,
      image: "https://via.placeholder.com/200x200?text=Lipstick",
      originalPrice: 35,
      rating: 4.6,
    },
    {
      id: 7,
      name: "Whey Protein",
      category: "sports outdoor",
      price: 60,
      image: "https://via.placeholder.com/200x200?text=Whey+Protein",
      originalPrice: 80,
      rating: 4.4,
    },
    {
      id: 8,
      name: "Ring",
      category: "Sports & Outdoor",
      price: 200,
      image: "https://via.placeholder.com/200x200?text=Ring",
      originalPrice: 250,
      rating: 4.1,
    },
    {
      id: 9,
      name: "Car Tire",
      category: "Health & Beauty",
      price: 150,
      image: "https://via.placeholder.com/200x200?text=Car+Tire",
      originalPrice: 180,
      rating: 4.7,
    },
  ];

  const slugify = (str) => str.toLowerCase().replace(/[\s&']+/g, "-");

  const filteredProducts = allProducts.filter(
    (p) => slugify(p.category) === category
  );

  return (
    <div className="flex w-full min-h-screen justify-center">
      {/* Sidebar */}
      <div className="w-[22%]">
        <Sidebar />
      </div>

      {/* Product Listing */}
      <div className="w-[63%] p-3">
        <h2 className="text-2xl font-bold capitalize mb-4">
          {category.replace(/-/g, " ")} Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} /> // ✅ reuse ProductCard
            ))
          ) : (
            <p>No products found for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product_list;
