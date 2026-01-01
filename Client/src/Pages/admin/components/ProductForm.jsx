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
    images: [],
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
        images: product.images || [], // URLs in edit mode
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

  // IMAGE UPLOAD (MAX 5)
  const handleImageUpload = (e) =>
  {
    const files = Array.from(e.target.files);

    if (files.length + formData.images.length > 5)
    {
      alert('You can not upload more than 5 images per product.');
      return;
    }

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files] // mix: URL + File
    }));
  };

  const removeImage = (index) =>
  {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) =>
  {
    e.preventDefault();

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      discountPrice: formData.discountPrice
        ? parseFloat(formData.discountPrice)
        : null,
      stock: parseInt(formData.stock),
      images: formData.images, // URLs + Files
      status: 'active'
    };

    onSave(productData);
  };

  const inputClass = `
    w-full p-2 border border-gray-400 text-black rounded
    outline-none
    hover:border-red-500
    focus:border-red-600 focus:ring-2 focus:ring-red-500
  `;

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 m-0">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            className="text-gray-400 hover:text-gray-600 text-2xl"
            onClick={onCancel}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Product Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description *
            </label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* PRICE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Price *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Discount Price
              </label>
              <input
                type="number"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* CATEGORY & SKU */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                SKU *
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* STOCK */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Stock Quantity *
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Product Images *
            </label>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className={inputClass}
            />

            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={typeof img === 'string'
                        ? img
                        : URL.createObjectURL(img)}
                      alt="preview"
                      className="w-full h-32 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="
    absolute top-1 right-1
    w-6 h-6
    flex items-center justify-center
    bg-red-600 text-white
    rounded-full
    text-sm font-bold
    hover:bg-red-700
  "
                    >
                      ✕
                    </button>

                  </div>
                ))}
              </div>
            )}
          </div>

          {/* BUTTONS (UNCHANGED) */}
          <div className="flex justify-end gap-3 pt-5 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded"
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
