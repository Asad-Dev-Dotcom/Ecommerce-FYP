import React, { useState, useEffect } from 'react';
import { categories } from '../data/dummyData';

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    is_flash_sale: false,
    flash_sale_price: '',
    images: [],
    existingImages: []
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || '',
        stock: product.stock || '',
        is_flash_sale: product.is_flash_sale || false,
        flash_sale_price: product.flash_sale_price || '',
        images: [], // New images to upload
        existingImages: product.images || [] // Existing images
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const removeExistingImage = (index) => {
    setFormData(prev => ({
      ...prev,
      existingImages: prev.existingImages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Add basic fields
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('stock', formData.stock);

    // Add flash sale fields
    formDataToSend.append('is_flash_sale', formData.is_flash_sale);
    if (formData.is_flash_sale && formData.flash_sale_price) {
      formDataToSend.append('flash_sale_price', formData.flash_sale_price);
    }

    // Add existing images (for edit mode)
    if (formData.existingImages && formData.existingImages.length > 0) {
      formDataToSend.append('existingImages', JSON.stringify(formData.existingImages));
    }

    // Add new image files
    formData.images.forEach((file) => {
      formDataToSend.append('images', file);
    });

    onSave(formDataToSend);
  };

  // Tailwind input classes with hover/focus outline effect
const inputClass = `
  w-full p-2 border border-gray-400 text-black rounded
  outline-none
  hover:border-red-500
  focus:border-red-600 focus:ring-2 focus:ring-red-500
`;

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
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
          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
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
              className={inputClass + " resize-vertical"}
              required
            />
          </div>

          {/* Price */}
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
              className={inputClass}
              required
            />
          </div>

          {/* Flash Sale */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="is_flash_sale"
                checked={formData.is_flash_sale}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  is_flash_sale: e.target.checked
                }))}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">Flash Sale</span>
            </label>
          </div>

          {/* Flash Sale Price */}
          {formData.is_flash_sale && (
            <div>
              <label htmlFor="flash_sale_price" className="block text-sm font-medium text-gray-700 mb-2">
                Flash Sale Price *
              </label>
              <input
                type="number"
                id="flash_sale_price"
                name="flash_sale_price"
                value={formData.flash_sale_price}
                onChange={handleChange}
                step="0.01"
                min="0"
                max={formData.price}
                className={inputClass}
                required={formData.is_flash_sale}
              />
            </div>
          )}

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
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
              className={inputClass}
              required
            />
          </div>

          {/* Existing Images (for edit mode) */}
          {formData.existingImages && formData.existingImages.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Images
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {formData.existingImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image.url}
                      alt={`Product ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                      onClick={() => removeExistingImage(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload New Images */}
          <div>
            <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
              {formData.existingImages && formData.existingImages.length > 0 ? 'Add More Images' : 'Product Images *'}
            </label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
              required={!product || (formData.existingImages && formData.existingImages.length === 0)}
            />
            <p className="text-xs text-gray-500 mt-1">You can select multiple images</p>

            {/* Preview new images */}
            {formData.images && formData.images.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">New Images to Upload:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`New ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                        onClick={() => removeImage(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
