import React, { useState } from 'react';
import { products } from '../data/dummyData';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';

const Products = () => {
  const [productList, setProductList] = useState(products);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredProducts = productList.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProductList(productList.filter(product => product.id !== productId));
    }
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      setProductList(productList.map(product =>
        product.id === editingProduct.id
          ? { ...product, ...productData, id: product.id }
          : product
      ));
    } else {
      const newProduct = {
        ...productData,
        id: Math.max(...productList.map(p => p.id)) + 1,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setProductList([...productList, newProduct]);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const categories = ['all', ...new Set(productList.map(p => p.category))];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header + Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Products Management</h1>
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-colors duration-200 flex items-center gap-2 w-full sm:w-auto justify-center"
          onClick={handleAddProduct}
        >
          <span>+</span> Add Product
        </button>
      </div>

      {/* Search and Categories */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center flex-wrap">
        <div className="flex-1 max-w-md w-full">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="flex gap-2 flex-wrap w-full sm:w-auto">
          {categories.map(category => {
            const isActive = category === filterCategory;
            return (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 
                  ${isActive
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-200 text-black hover:bg-gray-300'
                  }`}
                onClick={() => setFilterCategory(category)}
              >
                {category === 'all' ? 'All Categories' : category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default Products;
