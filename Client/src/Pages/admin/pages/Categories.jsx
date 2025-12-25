import React, { useState } from 'react';
import { categories } from '../data/dummyData';
import CategoryCard from '../components/CategoryCard';
import CategoryForm from '../components/CategoryForm';

const Categories = () =>
{
  const [categoryList, setCategoryList] = useState(categories);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleAddCategory = () =>
  {
    setEditingCategory(null);
    setShowForm(true);
  };

  const handleEditCategory = (category) =>
  {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleDeleteCategory = (categoryId) =>
  {
    if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.'))
    {
      setCategoryList(categoryList.filter(category => category.id !== categoryId));
    }
  };

  const handleSaveCategory = (categoryData) =>
  {
    if (editingCategory)
    {
      // Update existing category
      setCategoryList(categoryList.map(category =>
        category.id === editingCategory.id
          ? { ...category, ...categoryData, id: category.id }
          : category
      ));
    } else
    {
      // Add new category
      const newCategory = {
        ...categoryData,
        id: Math.max(...categoryList.map(c => c.id)) + 1,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setCategoryList([...categoryList, newCategory]);
    }
    setShowForm(false);
    setEditingCategory(null);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900 m-0">Categories Management</h1>
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-colors duration-200 flex items-center gap-2"
          onClick={handleAddCategory}
        >
          <span>+</span>
          Add Category
        </button>
      </div>

      <div className="grid rid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">Total Categories</h3>
          <p className="text-3xl font-bold text-gray-900 m-0">{categoryList.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">Total Products</h3>
          <p className="text-3xl font-bold text-gray-900 m-0">{categoryList.reduce((sum, cat) => sum + cat.productCount, 0)}</p>
        </div>
        <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">Avg Products/Category</h3>
          <p className="text-3xl font-bold text-gray-900 m-0">
            {categoryList.length > 0
              ? Math.round(categoryList.reduce((sum, cat) => sum + cat.productCount, 0) / categoryList.length)
              : 0
            }
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryList.map(category => (
          <CategoryCard
            key={category.id}
            category={category}
            onEdit={handleEditCategory}
            onDelete={handleDeleteCategory}
          />
        ))}
      </div>

      {showForm && (
        <CategoryForm
          category={editingCategory}
          onSave={handleSaveCategory}
          onCancel={() =>
          {
            setShowForm(false);
            setEditingCategory(null);
          }}
        />
      )}
    </div>
  );
};

export default Categories;
