import React, { useState, useEffect } from 'react';

const CategoryForm = ({ category, onSave, onCancel }) =>
{
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: ''
  });

  useEffect(() =>
  {
    if (category)
    {
      setFormData({
        name: category.name || '',
        description: category.description || '',
        image: category.image || ''
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

  const handleSubmit = (e) =>
  {
    e.preventDefault();

    const categoryData = {
      ...formData,
      productCount: category ? category.productCount : 0
    };

    onSave(categoryData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl">
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
              className="w-full p-2 border border-black text-black rounded outline-none focus:outline-red-500 focus:outline-2"
              required
            />
          </div>

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

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              Image URL *
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full p-2 border border-black text-black rounded outline-none focus:outline-red-500 focus:outline-2"
              required
            />
          </div>

          {formData.image && (
            <div className="text-center">
              <img
                src={formData.image}
                alt="Category preview"
                className="max-w-full max-h-32 rounded-lg shadow-sm mx-auto"
              />
            </div>
          )}

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
