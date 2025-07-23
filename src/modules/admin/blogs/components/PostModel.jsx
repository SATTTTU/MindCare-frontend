import React from 'react';
import { X } from 'lucide-react';
import { usePostForm } from '../formik/usePostformik';

const PostModal = ({ isOpen, onClose, post, categories = [], onSubmit }) => {
  if (!isOpen) return null;

  const isEditing = !!post;

  const initialValues = {
    title: post?.title || '',
    content: post?.content || '',
    categoryId: post?.categoryId || (categories.length > 0 ? categories[0].id : ''),
    tags: post?.tags?.join(', ') || '', // Ensure tags are a string for the input
    featuredImage: null,
  };

  const handleSubmit = (values) => {
    const formData = new FormData();

    // Manually append each field with the correct PascalCase key
    formData.append('Title', values.title);
    formData.append('Content', values.content);
    formData.append('CategoryId', values.categoryId);
    formData.append('Tags', values.tags);

    if (values.featuredImage) {
      formData.append('FeaturedImageFile', values.featuredImage);
    }

    if (isEditing) {
      formData.append('Id', post.id);
    }
    
    console.log("Submitting FormData. Verify these keys are PascalCase:");
    for (let [key, value] of formData.entries()) {
        console.log(`Key: ${key}, Value:`, value);
    }

    onSubmit(formData);
  };

  const formik = usePostForm(initialValues, handleSubmit);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold">{isEditing ? 'Edit Post' : 'Create New Post'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
        </div>
        
        <form onSubmit={formik.handleSubmit} className="p-6 space-y-4">
          {/* Post Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Post Title</label>
            <input id="title" name="title" type="text" {...formik.getFieldProps('title')} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {formik.touched.title && formik.errors.title ? <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p> : null}
          </div>

          {/* Post Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">Post Content</label>
            <textarea id="content" name="content" rows={6} {...formik.getFieldProps('content')} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {formik.touched.content && formik.errors.content ? <p className="text-red-500 text-sm mt-1">{formik.errors.content}</p> : null}
          </div>

          {/* Featured Image */}
          <div>
            <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
            <input id="featuredImage" name="featuredImage" type="file" accept="image/*" onChange={(e) => formik.setFieldValue('featuredImage', e.currentTarget.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
            {formik.values.featuredImage && <p className="text-sm text-gray-600 mt-1">Selected: {formik.values.featuredImage.name}</p>}
            {isEditing && post.featuredImage && !formik.values.featuredImage && <p className="text-sm text-gray-600 mt-1">Current image is set. Upload a new one to replace it.</p>}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              id="categoryId"
              name="categoryId"
              {...formik.getFieldProps('categoryId')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
            {formik.touched.categoryId && formik.errors.categoryId ? <p className="text-red-500 text-sm mt-1">{formik.errors.categoryId}</p> : null}
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
            <input id="tags" name="tags" type="text" {...formik.getFieldProps('tags')} placeholder="e.g., react, javascript" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {formik.touched.tags && formik.errors.tags ? <p className="text-red-500 text-sm mt-1">{formik.errors.tags}</p> : null}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
            <button type="submit" disabled={formik.isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300">
              {formik.isSubmitting ? 'Saving...' : (isEditing ? 'Update Post' : 'Save Post')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostModal;