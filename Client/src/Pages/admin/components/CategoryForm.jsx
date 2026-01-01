import React, { useState, useEffect } from 'react';

const CategoryForm = ({ category, onSave, onCancel }) =>
{
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageFile: null, // file object
    imagePreview: '' // preview URL
  });

  useEffect(() =>
  {
    if (category)
    {
      setFormData({
        name: category.name || '',
        description: category.description || '',
        imageFile: null,
        imagePreview: category.image || ''
      });
    }
  }, [category]);

  const handleChange = (e) =>
  {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) =>
  {
    const file = e.target.files[0];
    if (file)
    {
      setFormData(prev => ({
        ...prev,
        imageFile: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = (e) =>
  {
    e.preventDefault();

    const categoryData = {
      name: formData.name,
      description: formData.description,
      // Agar file upload ho, to backend ke liye ye file bheji ja sakti hai
      imageFile: formData.imageFile,
      imagePreview: formData.imagePreview,
      productCount: category ? category.productCount : 0
    };

    onSave(categoryData);
  };

  const inputClass = `
    w-full p-2 border border-gray-400 text-black rounded
    outline-none
    hover:border-red-500
    focus:border-red-600 focus:ring-2 focus:ring-red-600
  `;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blur overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl z-10">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 m-0">
            {category ? 'Edit Category' : 'Add New Category'}
          </h2>
          <button
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none focus:outline-none"
            onClick={onCancel}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Category Name *
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

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image *
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className={inputClass + " p-1"}
              required={!formData.imagePreview} // agar edit hai aur image already hai, optional
            />
          </div>

          {/* Image Preview */}
         {/* Image Preview with remove button */}
{formData.imagePreview && (
  <div className="relative text-center mt-2">
    <img
      src={formData.imagePreview}
      alt="Category preview"
      className="max-w-full max-h-32 rounded-lg shadow-sm mx-auto"
    />
    {/* Remove button */}
    <button
      type="button"
      onClick={() => setFormData(prev => ({ ...prev, imageFile: null, imagePreview: '' }))}
      className="   absolute top-1 right-1
    w-6 h-6
    flex items-center justify-center
    bg-red-600 text-white
    rounded-full
    text-sm font-bold
    hover:bg-red-700"
    >
      ×
    </button>
  </div>
)}


          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
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
              {category ? 'Update Category' : 'Add Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
