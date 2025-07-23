import React, { useState } from 'react';
import { ArrowLeft, Plus, Edit2, Trash2 } from 'lucide-react';
import { useCreatePost, useDeletePost, useGetPosts, useUpdatePost } from '../api/useBlog';
import { useGetCategories } from '../api/useCateogry';
import PostModal from './PostModel';
import CategoryManager from './categoryManagemanager';
import DeleteConfirmationModal from './DeleteConfirmModel';

 export const BlogManagement = () => {
  const [showPostModal, setShowPostModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Fetching data with TanStack Query
  const { data: posts, isLoading: isLoadingPosts } = useGetPosts();
  const { data: categories, isLoading: isLoadingCategories } = useGetCategories();

  // Mutations
  const createPostMutation = useCreatePost();
  const updatePostMutation = useUpdatePost();
  const deletePostMutation = useDeletePost();

  const handleBack = () => alert('Navigate back to dashboard');

  // Post management
  const openPostModal = (post = null) => {
    setCurrentPost(post);
    setShowPostModal(true);
  };

  const closePostModal = () => {
    setCurrentPost(null);
    setShowPostModal(false);
  };

  const handlePostSubmit = async (postData) => {
    if (postData.id) {
      await updatePostMutation.mutateAsync(postData);
    } else {
      await createPostMutation.mutateAsync(postData);
    }
    closePostModal();
  };

  const handleDeletePost = (postId) => {
    setDeleteTarget({ type: 'post', id: postId });
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteTarget.type === 'post') {
      deletePostMutation.mutate(deleteTarget.id);
    }
    setShowDeleteModal(false);
    setDeleteTarget(null);
  };
  
  if (isLoadingPosts || isLoadingCategories) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button onClick={handleBack} className="flex items-center text-gray-600 hover:text-gray-800 mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Manage Blog Posts Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Manage Blog Posts</h2>
              <button
                onClick={() => openPostModal()}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Post
              </button>
            </div>
            <div className="space-y-4">
              {posts?.map(post => (
                <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                  {/* ... Post display JSX ... */}
                </div>
              ))}
            </div>
          </div>

          {/* Manage Categories Section */}
          <CategoryManager posts={posts} categories={categories} />
        </div>

        {/* Modals */}
        <PostModal 
          isOpen={showPostModal}
          onClose={closePostModal}
          post={currentPost}
          categories={categories}
          onSubmit={handlePostSubmit}
        />
        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          title="Confirm Delete"
          message={`Are you sure you want to delete this ${deleteTarget?.type}? This action cannot be undone.`}
        />
      </div>
    </div>
  );
};
