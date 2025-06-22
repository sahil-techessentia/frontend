"use client";

import { useEffect } from "react";
import blogStore from "@/store/blogStore";

export default function Home() {
  const { blogs, loading, error, fetchBlogs } = blogStore();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <main className="min-h-screen p-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Data from Backend</h1>

        {loading && (
          <div className="text-center">
            <p className="text-gray-600">Loading...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>Error: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="bg-white shadow-md rounded-lg p-6">
            {blogs?.length === 0 ? (
              <p className="text-gray-600">No data available</p>
            ) : (
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(blogs, null, 2)}
              </pre>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
