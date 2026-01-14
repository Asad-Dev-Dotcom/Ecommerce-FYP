import React, { useState, useEffect } from 'react';

const CategoryForm = ({ category, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    existingImage: null
  });

  useEffect(() => {
    if (category) {
      setFormData({
        title: category.title || '',
        description: category.description || '',
        image: null, // New image to upload
        existingImage: category.image || null // Existing image
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      image: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Add basic fields
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);

    // Add image file if selected
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    onSave(formDataToSend);
  };

  // Tailwind input classes: default gray, hover red, focus thick red
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
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Category Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
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

          {/* Current Image (for edit mode) */}
          {formData.existingImage && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Image
              </label>
              <div className="text-center">
                <img
                  src={formData.existingImage.url}
                  alt="Current category image"
                  className="max-w-full max-h-32 rounded-lg shadow-sm mx-auto"
                />
              </div>
            </div>
          )}

          {/* Upload New Image */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              {formData.existingImage ? 'Replace Image' : 'Category Image *'}
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
              required={!category}
            />
          </div>

          {/* Image Preview */}
          {formData.image && (
            <div className="text-center">
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Category preview"
                className="max-w-full max-h-32 rounded-lg shadow-sm mx-auto"
              />
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
