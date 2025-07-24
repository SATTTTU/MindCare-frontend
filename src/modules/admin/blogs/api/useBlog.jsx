import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client'; // Assuming your API client is here

// Fetch all posts
const getPosts = async () => {
  const response = await api.get('/api/Blog/all');
  return response;
};

export const useGetPosts = (options = {}) => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    ...options
  });
};

// Create a new post
// Find this file in your project (e.g., api.js, postService.js, etc.)

const createPost = async (postData) => {
  
  const response = await api.post('/api/Blog/posts', postData);
  return response;
};


export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidate and refetch the posts query to show the new post
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });
};

// Update an existing post
const updatePost = async (postData) => {
  const { id, ...data } = postData;
  const response = await api.put(`/api/Blog/posts/${id}`, data);
  return response;
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });
};

// Delete a post
const deletePost = async (postId) => {
  const response = await api.delete(`/api/Blog/posts/${postId}`);
  return response;
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });
};