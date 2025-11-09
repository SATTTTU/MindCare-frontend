import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '@/components/ui/aside';
import { useGetBlogs } from '../api/usegetBlog';

export const BlogCards = () => {
  const { data: blogs = [], isLoading, isError } = useGetBlogs();

  if (isLoading)
    return <div className="p-6 text-center text-gray-500">Loading blogs...</div>;
  if (isError)
    return <div className="p-6 text-center text-red-500">Failed to load blogs.</div>;

  return (
    <div className="flex flex-col lg:flex-row p-6 gap-6">
      {/* Sidebar */}
      <aside className="lg:w-1/4">
        <Sidebar />
      </aside>

      {/* Blog Grid */}
      <div className="lg:w-3/4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <img
              src="https://img.icons8.com/ios-filled/100/000000/nothing-found.png"
              alt="no-data"
              className="mb-4 w-20 h-20 opacity-50"
            />
            <h3 className="text-xl font-semibold text-gray-700">No Blogs Found</h3>
            <p className="text-gray-500 mt-2 text-center">
              Please check back later or add new blogs.
            </p>
          </div>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 overflow-hidden border border-gray-200 flex flex-col"
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
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {blog.summary || 'No summary available.'}
                </p>

                {/* Meta */}
                <div className="text-sm text-gray-500 mb-4 mt-auto">
                  <span>By {blog.authorName}</span>
                  {blog.publishedAt && (
                    <>
                      <span> • </span>
                      <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                    </>
                  )}
                </div>

                {/* Read More */}
                <Link
                
                  className="block text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
