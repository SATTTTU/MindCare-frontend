import React, { useState } from 'react';
import { ArrowLeft, Plus, Edit2, Trash2 } from 'lucide-react';
import { useCreatePost, useDeletePost, useGetPosts, useUpdatePost } from '../api/useBlog';
import { useGetCategories } from '../api/useCateogry';
import PostModal from './PostModel';
import CategoryManager from './categoryManagemanager';
import DeleteConfirmationModal from './DeleteConfirmModel';
import { useNavigate } from 'react-router-dom';

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
  const navigate =useNavigate();

  const handleBack = () => {
    navigate('/admin-dashboard')
  };

  // Post management
  const openPostModal = (post = null) => {
    setCurrentPost(post);
    setShowPostModal(true);
  };

  const closePostModal = () => {
    setCurrentPost(null);
    setShowPostModal(false);
  };

const handlePostSubmit = async (formData) => {
    if (currentPost && currentPost.id) {
      await updatePostMutation.mutateAsync({ id: currentPost.id, data: formData });
    } else {
      await createPostMutation.mutateAsync(formData);
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
                <div key={post.id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
                  {/* Action Buttons - Added at the top right */}
                  <div className="flex justify-end gap-2 mb-4">
                    <button
                      onClick={() => openPostModal(post)}
                      className="flex items-center bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 text-sm"
                      title="Edit Post"
                    >
                      <Edit2 className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="flex items-center bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 text-sm"
                      title="Delete Post"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </button>
                  </div>

                  {/* Featured Image */}
                  {post.featuredImage?.trim() && (
                    <img
                      src={
                        post.featuredImage.startsWith('/')
                          ? `http://localhost:3000${post.featuredImage}`
                          : post.featuredImage
                      }
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                  )}

                  {/* Title */}
                  <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>

                  {/* Summary (if present) */}
                  {post.summary && (
                    <p className="text-gray-600 mt-2">{post.summary}</p>
                  )}

                  {/* Content (if present) */}
                  {post.content && (
                    <div className="prose max-w-none text-gray-700 mt-4">
                      <p>{post.content}</p>
                    </div>
                  )}

                  {/* Category, Author, Tags */}
                  <div className="text-sm text-gray-500 mt-2 space-x-2">
                    <span>Category: <strong>{post.categoryName}</strong></span>
                    <span>Author: <strong>{post.authorName}</strong></span>
                  </div>

                  {/* Tags */}
                  {post.tags?.length > 0 && (
                    <div className="mt-2">
                      <span className="font-medium text-gray-700">Tags:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Published At */}
                  <div className="text-sm text-gray-400 mt-2">
                    {post.publishedAt ? (
                      <span>Published on: {new Date(post.publishedAt).toLocaleDateString()}</span>
                    ) : (
                      <span className="italic">Not published yet</span>
                    )}
                  </div>

                  {/* Views and Featured */}
                  <div className="text-sm text-gray-500 mt-2">
                    <span>Views: {post.viewCount}</span>
                    {post.isFeatured && (
                      <span className="ml-4 px-2 py-1 bg-yellow-200 text-yellow-800 rounded text-xs font-semibold">
                        Featured
                      </span>
                    )}
                  </div>
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