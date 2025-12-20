import React from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "../../Features/Products/productsSlice"; // ✅ import
import ProductCard from "../ProductCard/Product_card";

const Our_products = () => {
  const dispatch = useDispatch();

const products = [
  {
    id: 221,
    image: "https://images.unsplash.com/photo-1555617989-b7d3e69413f5",
    title: "Bose QuietComfort 35 II",
    price: 299,
    originalPrice: 349,
    rating: 4.7,
    category: "Headphones",
    description: "Bose QuietComfort 35 II offers excellent sound quality and noise cancellation, perfect for travelers.",
  },
  {
    id: 222,
    image: "https://images.unsplash.com/photo-1555617989-b7d3e69413f5",
    title: "Sony MDR-XB950B1",
    price: 179,
    originalPrice: 249,
    rating: 4.5,
    category: "Headphones",
    description: "Sony MDR-XB950B1 provides deep bass and comfortable design, making it ideal for music lovers.",
  },
  {
    id: 223,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
    title: "Acer Predator Helios 300",
    price: 1599,
    originalPrice: 1799,
    rating: 4.7,
    category: "Computers",
    description: "Acer Predator Helios 300 is a gaming laptop with fast refresh rates, perfect for gamers.",
  },
  {
    id: 224,
    image: "https://images.unsplash.com/photo-1717354585346-c35eb01a1032",
    title: "Samsung Galaxy Z Flip 3",
    price: 999,
    originalPrice: 1099,
    rating: 4.6,
    category: "Mobiles",
    description: "Samsung Galaxy Z Flip 3 features a foldable design with a compact form factor and advanced camera system.",
  },
  {
    id: 225,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
    title: "Microsoft Surface Laptop 4",
    price: 1399,
    originalPrice: 1599,
    rating: 4.8,
    category: "Computers",
    description: "Microsoft Surface Laptop 4 is a sleek laptop with impressive performance and a stunning screen.",
  },
  {
    id: 226,
    image: "https://images.unsplash.com/photo-1606813909353-2f3c61d29314",
    title: "Garmin Venu 2",
    price: 399,
    originalPrice: 449,
    rating: 4.6,
    category: "Smart Watch",
    description: "Garmin Venu 2 offers excellent fitness tracking with a vibrant AMOLED display and long battery life.",
  },
  {
    id: 227,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
    title: "Razer Blade 15",
    price: 1899,
    originalPrice: 2099,
    rating: 4.9,
    category: "Computers",
    description: "Razer Blade 15 is a high-performance gaming laptop designed for smooth gaming experiences.",
  },
  {
    id: 228,
    image: "https://images.unsplash.com/photo-1717354585346-c35eb01a1032",
    title: "OnePlus 9",
    price: 749,
    originalPrice: 849,
    rating: 4.5,
    category: "Mobiles",
    description: "OnePlus 9 delivers excellent performance and a top-tier camera, making it a great device for mobile enthusiasts.",
  },
  {
    id: 229,
    image: "https://images.unsplash.com/photo-1606813909353-2f3c61d29314",
    title: "Fitbit Charge 5",
    price: 149,
    originalPrice: 179,
    rating: 4.4,
    category: "Smart Watch",
    description: "Fitbit Charge 5 is a fitness tracker with advanced health features including heart rate monitoring.",
  },
  {
    id: 230,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
    title: "HP Envy x360",
    price: 1099,
    originalPrice: 1199,
    rating: 4.5,
    category: "Computers",
    description: "HP Envy x360 is a convertible laptop with a solid design and impressive performance for work and play.",
  }
];

  // ✅ View All click handler
  const handleViewAll = () => {
    dispatch(setProducts(products));
    localStorage.setItem("products", JSON.stringify(products));
    window.open("/products/our-products", "_blank"); // ✅ new tab
  };

  return (
    <div className="w-full px-6 py-5">
      {/* Section Title */}
      <div className="flex items-center gap-2 mb-3">
        <div className="relative inline-block group cursor-pointer">
          <div className="absolute top-0 left-0 h-full bg-red-500 rounded-sm transition-all duration-500 w-3 group-hover:w-full z-0"></div>
          <h3 className="relative z-10 px-6 py-1 text-red-500 font-semibold transition-colors duration-500 group-hover:text-white">
            Our Products
          </h3>
        </div>
      </div>

      {/* Title */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <h2 className="text-3xl font-bold text-gray-800 whitespace-nowrap">
          Explore Our Products
        </h2>
      </div>

      {/* Product Grid - sirf preview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.slice(0, 8).map((product) => ( // ✅ sirf 4 dikhayenge preview me
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* View All Button */}
      <div className="w-full flex justify-center mt-6">
        <button
          onClick={handleViewAll}
          className="bg-red-600 text-white px-7 py-3 rounded-sm hover:bg-red-500 transition cursor-pointer mt-5 font-quicksand font-semibold"
        >
          View All Product
        </button>
      </div>

      <hr className="mt-17 border-t-2 border-gray-300" />
    </div>
  );
};

export default Our_products;
