import React from 'react';
import { useGetBlogs } from '@/hooks/useGetBlogs';
import { Link } from 'react-router-dom';
import { Sidebar } from '@/components/ui/aside';

const BlogCards = () => {
  const { data: blogs = [], isLoading, isError } = useGetBlogs();

  if (isLoading) return <div className="p-6">Loading blogs...</div>;
  if (isError) return <div className="p-6 text-red-500">Failed to load blogs.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <Sidebar/>
      {blogs.length === 0 ? (
        // ❌ No blogs - show a fallback card
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-6 col-span-full text-center">
          <img
            src="https://img.icons8.com/ios-filled/100/000000/nothing-found.png"
            alt="no-data"
            className="mx-auto mb-4 w-20 h-20 opacity-50"
          />
          <h3 className="text-xl font-semibold text-gray-700">No Blogs Found</h3>
          <p className="text-gray-500 mt-2">Please check back later or add new blogs.</p>
        </div>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={import.meta.env.VITE_APP_API_URL + blog.featuredImage}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {blog.categoryName}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {blog.summary || 'No summary available.'}
              </p>

              {/* Meta */}
              <div className="text-sm text-gray-500 mb-2">
                <span>By {blog.authorName}</span>
                {blog.publishedAt && (
                  <>
                    <span> • </span>
                    <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                  </>
                )}
              </div>
            </div>

            {/* Read More */}
            <div className="px-6 pb-6">
              <Link
                to={`/blogs/${blog.id}`}
                className="block text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              >
                Read More
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogCards;
