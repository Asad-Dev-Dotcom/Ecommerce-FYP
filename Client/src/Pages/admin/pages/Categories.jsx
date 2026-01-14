import React, { useState } from 'react';
import { useGetAllCategoriesQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } from '../../../redux/apis/categoryApis';
import CategoryCard from '../components/CategoryCard';
import CategoryForm from '../components/CategoryForm';
import { toast } from 'react-toastify';

const Categories = () =>
{
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // API hooks
  const { data: categoriesData, isLoading, refetch } = useGetAllCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const categories = categoriesData?.data || [];

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

  const handleDeleteCategory = async (categoryId) =>
  {
    if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.'))
    {
      try {
        await deleteCategory(categoryId);
        toast.success('Category deleted successfully');
        refetch();
      } catch (error) {
        toast.error('Failed to delete category');
      }
    }
  };

  const handleSaveCategory = async (formData) =>
  {
    try {
      if (editingCategory)
      {
        await updateCategory({ id: editingCategory._id, formData });
        toast.success('Category updated successfully');
      } else
      {
        await createCategory(formData);
        toast.success('Category created successfully');
      }
      setShowForm(false);
      setEditingCategory(null);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to save category');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
          <p className="text-3xl font-bold text-gray-900 m-0">{categories.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">Active Categories</h3>
          <p className="text-3xl font-bold text-gray-900 m-0">{categories.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">Categories This Month</h3>
          <p className="text-3xl font-bold text-gray-900 m-0">
            {categories.filter(cat => {
              const createdAt = new Date(cat.createdAt);
              const now = new Date();
              return createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear();
            }).length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(category => (
          <CategoryCard
            key={category._id}
            category={{
              ...category,
              id: category._id,
              image: category.image?.url,
            }}
            onEdit={handleEditCategory}
            onDelete={handleDeleteCategory}
          />
        ))}
      </div>

      {showForm && (
        <CategoryForm
          category={editingCategory ? {
            ...editingCategory,
            image: editingCategory.image?.url,
          } : null}
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
