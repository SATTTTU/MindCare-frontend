import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

// Fetch all categories (adapted from your useCategory hook)
const getCategories = async () => {
  const response = await api.get('/api/categories');
  return response.data;
};

export const useGetCategories = (options = {}) => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options
  });
};

// Create a new category
const createCategory = async (categoryData) => {
  const response = await api.post('/api/categories', categoryData);
  return response.data;
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    }
  });
};

// Update an existing category
const updateCategory = async (categoryData) => {
  const { id, ...data } = categoryData;
  const response = await api.put(`/api/categories/${id}`, data);
  return response.data;
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    }
  });
};

// Delete a category
const deleteCategory = async (categoryId) => {
  const response = await api.delete(`/api/categories/${categoryId}`);
  return response.data;
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      // Also refetch posts as their category might have changed to "Uncategorized"
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });
};