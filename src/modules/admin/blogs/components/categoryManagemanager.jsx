import React, { useState } from 'react';
import { Edit2, Trash2, Save, X } from 'lucide-react';
import DeleteConfirmationModal from './DeleteConfirmModel';
import { useCategoryForm } from '../formik/useCategoryFormik';
import { useCreateCategory, useDeleteCategory, useUpdateCategory } from '../api/useCateogry';
const CategoryManager = ({ posts = [], categories = [] }) => {
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null); // { id, name, postsCount }
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCategoryDeleteModal, setShowCategoryDeleteModal] = useState(false);
  
  // API Mutations
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  // Form for creating a new category
  const newCategoryForm = useCategoryForm(
    { name: '' }, 
    async (values) => {
      await createCategoryMutation.mutateAsync(values);
    }
  );

  // Form for editing an existing category
  const editCategoryForm = useCategoryForm(
    { name: editingCategory?.name || '' },
    async (values) => {
      await updateCategoryMutation.mutateAsync({ id: editingCategory.id, ...values });
      setEditingCategory(null);
    }
  );

  const handleEditClick = (category) => {
    setEditingCategory(category);
    editCategoryForm.setValues({ name: category.name });
  };
  
  const handleCancelEdit = () => {
    setEditingCategory(null);
  };

  // Logic for initiating deletion
  const handleDeleteClick = (category) => {
    const postsInCategory = posts.filter(post => post.category === category.name);
    setDeleteTarget({
      id: category.id,
      name: category.name,
      postsCount: postsInCategory.length,
    });

    if (postsInCategory.length > 0) {
      setShowCategoryDeleteModal(true);
    } else {
      setShowDeleteModal(true);
    }
  };

  // Confirms and executes the deletion
  const confirmDelete = async () => {
    await deleteCategoryMutation.mutateAsync(deleteTarget.id);
    setShowDeleteModal(false);
    setShowCategoryDeleteModal(false);
    setDeleteTarget(null);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Manage Categories</h2>
      
      {/* Create New Category Form */}
      <form onSubmit={newCategoryForm.handleSubmit} className="mb-6">
        <div className="flex space-x-2">
          <div className="flex-1">
            <input
              name="name"
              type="text"
              placeholder="Enter new category name"
              {...newCategoryForm.getFieldProps('name')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {newCategoryForm.touched.name && newCategoryForm.errors.name ? (
              <p className="text-red-500 text-sm mt-1">{newCategoryForm.errors.name}</p>
            ) : null}
          </div>
          <button type="submit" disabled={newCategoryForm.isSubmitting} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-green-300">
            {createCategoryMutation.isLoading ? 'Creating...' : 'Create'}
          </button>
        </div>
      </form>

      {/* Categories List */}
      <div className="space-y-3">
        {categories.map(category => (
          <div key={category.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
  {editingCategory?.id === category.id ? (
    <form onSubmit={editCategoryForm.handleSubmit} className="flex-1 flex items-center space-x-2">
      <input
        name="name"
        type="text"
        {...editCategoryForm.getFieldProps('name')}
        className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        autoFocus
      />
      <button type="submit" disabled={editCategoryForm.isSubmitting} className="text-green-600 hover:text-green-800 p-1"><Save className="w-4 h-4" /></button>
      <button type="button" onClick={handleCancelEdit} className="text-gray-600 hover:text-gray-800 p-1"><X className="w-4 h-4" /></button>
    </form>
  ) : (
    <div className="flex-1 flex items-center justify-between">
      <span className="font-medium text-gray-900">{category.name}</span>
      <div className="flex space-x-2">
        <button onClick={() => handleEditClick(category)} className="text-blue-600 hover:text-blue-800 p-1"><Edit2 className="w-4 h-4" /></button>
        <button onClick={() => handleDeleteClick(category)} disabled={category.name === 'Uncategorized'} className="text-red-600 hover:text-red-800 p-1 disabled:text-gray-300 disabled:cursor-not-allowed"><Trash2 className="w-4 h-4" /></button>
      </div>
    </div>
  )}
</div>

        ))}
      </div>

      {/* Delete Modals */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Confirm Delete Category"
        message={`Are you sure you want to delete the category "${deleteTarget?.name}"? This action cannot be undone.`}
      />

      <DeleteConfirmationModal
        isOpen={showCategoryDeleteModal}
        onClose={() => setShowCategoryDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Warning: Category Has Posts"
        message={`The category "${deleteTarget?.name}" contains ${deleteTarget?.postsCount} post(s). Deleting it will move them to "Uncategorized". Do you want to continue?`}
      />
    </div>
  );
};

export default CategoryManager;