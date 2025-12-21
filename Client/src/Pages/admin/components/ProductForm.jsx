import React, { useState, useEffect } from 'react';
import { categories } from '../data/dummyData';

const ProductForm = ({ product, onSave, onCancel }) =>
{
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    discountPrice: '',
    category: '',
    sku: '',
    stock: '',
    images: [''],
    variants: []
  });

  useEffect(() =>
  {
    if (product)
    {
      setFormData({
        title: product.title || '',
        description: product.description || '',
        price: product.price || '',
        discountPrice: product.discountPrice || '',
        category: product.category || '',
        sku: product.sku || '',
        stock: product.stock || '',
        images: product.images || [''],
        variants: product.variants || []
      });
    }
  }, [product]);

  const handleChange = (e) =>
  {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (index, value) =>
  {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const addImageField = () =>
  {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const removeImageField = (index) =>
  {
    if (formData.images.length > 1)
    {
      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        images: newImages
      }));
    }
  };

  const handleSubmit = (e) =>
  {
    e.preventDefault();

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : null,
      stock: parseInt(formData.stock),
      images: formData.images.filter(img => img.trim() !== ''),
      status: 'active'
    };

    onSave(productData);
  };

  return (
    <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 m-0">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none focus:outline-none"
            onClick={onCancel}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Product Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Product Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-black text-black rounded outline-none focus:outline-red-500 focus:outline-2"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border border-black text-black rounded resize-vertical outline-none focus:outline-red-500 focus:outline-2"
              required
            />
          </div>

          {/* Price & Discount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Price *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full p-2 border border-black text-black rounded outline-none focus:outline-red-500 focus:outline-2"
                required
              />
            </div>
            <div>
              <label htmlFor="discountPrice" className="block text-sm font-medium text-gray-700 mb-2">
                Discount Price
              </label>
              <input
                type="number"
                id="discountPrice"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full p-2 border border-black text-black rounded outline-none focus:outline-red-500 focus:outline-2"
              />
            </div>
          </div>

          {/* Category & SKU */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border border-black text-black rounded outline-none focus:outline-red-500 focus:outline-2"
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-2">
                SKU *
              </label>
              <input
                type="text"
                id="sku"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className="w-full p-2 border border-black text-black rounded outline-none focus:outline-red-500 focus:outline-2"
                required
              />
            </div>
          </div>

          {/* Stock */}
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
              Stock Quantity *
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              className="w-full p-2 border border-black text-black rounded outline-none focus:outline-red-500 focus:outline-2"
              required
            />
          </div>

          {/* Product Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images *
            </label>
            {formData.images.map((image, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="url"
                  placeholder="Image URL"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className="flex-1 p-2 border border-black text-black rounded outline-none focus:outline-red-500 focus:outline-2"
                  required={index === 0}
                />
                {formData.images.length > 1 && (
                  <button
                    type="button"
                    className="bg-black text-white px-3 py-2 rounded text-sm font-medium transition-colors duration-200 hover:bg-gray-800"
                    onClick={() => removeImageField(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 mt-2 hover:bg-gray-800"
              onClick={addImageField}
            >
              + Add Another Image
            </button>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-5 border-t border-gray-200">
            <button
              type="button"
              className="bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700"
            >
              {product ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
