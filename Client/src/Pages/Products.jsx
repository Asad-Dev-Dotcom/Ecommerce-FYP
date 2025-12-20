import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../Components/ProductCard/Product_card";
import { setProducts } from "../Features/Products/productsSlice";

const Products = () => {
  const { type } = useParams(); 
  const products = useSelector((state) => state.products.list);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // ✅ loader state

  useEffect(() => {
    if (!products.length) {
      const saved = localStorage.getItem("products");
      if (saved) {
        dispatch(setProducts(JSON.parse(saved)));
      }
    }
    // Thoda delay tak loader show karein
    setTimeout(() => setLoading(false), 800); 
  }, [products, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-12">
      <h2 className="text-3xl font-semibold mb-16 text-center capitalize">
        {type?.replace("-", " ")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;
