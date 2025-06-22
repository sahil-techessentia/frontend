"use client";
import { API_ENDPOINTS } from "@/config/api";
import blogStore from "@/store/blogStore";
import { apiHandler } from "@/utils/apiHandler";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
const dummyPic =
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80";
const TAGS = ["post", "fund raising", "poll"];

export default function CreateBlogPage() {
  const { createBlog, loading, data } = blogStore();
  const [form, setForm] = useState({
    title: "",
    description: "",
    images: [dummyPic],
    tags: "post",
    // poll: [""],
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePollChange = (idx, value) => {
    setForm((prev) => {
      const poll = [...prev.poll];
      poll[idx] = value;
      return { ...prev, poll };
    });
  };

  const addPollOption = () => {
    setForm((prev) => ({ ...prev, poll: [...prev.poll, ""] }));
  };

  const removePollOption = (idx) => {
    setForm((prev) => ({
      ...prev,
      poll: prev.poll.filter((_, i) => i !== idx),
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const data = await apiHandler.post(API_ENDPOINTS.upload.file, formData);

      if (data.status !== 200) {
        setError(data.error || "Image upload failed");
        setUploading(false);
        return;
      }
      setForm((prev) => ({ ...prev, images: [...prev.images, data?.url] }));
    } catch (err) {
      setError("Image upload failed");
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setSuccess(true);
    // For now, just log the form data
    const formData = {
      ...form,
      images: JSON.stringify(form.images),
    };
    await createBlog(formData);
    router.push("/blogs");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center">
      <div className="bg-white rounded-lg shadow p-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Create a Blog</h2>
        {success && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-center">
            Blog created successfully!
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 min-h-[100px]"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border rounded px-3 py-2"
            />
            {uploading && (
              <div className="text-xs text-gray-500 mt-1">Uploading...</div>
            )}
            {form.images && !uploading && (
              <img
                src={form.images[0]}
                alt="Preview"
                className="mt-2 rounded max-h-40 border"
              />
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Tag</label>
            <select
              name="tag"
              value={form.tags}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              {TAGS.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
          {form.tags === "poll" && (
            <div>
              <label className="block font-medium mb-1">Poll Options</label>
              {form.poll.map((option, idx) => (
                <div key={idx} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handlePollChange(idx, e.target.value)}
                    className="flex-1 border rounded px-3 py-2"
                    placeholder={`Option ${idx + 1}`}
                    required
                  />
                  {form.poll.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePollOption(idx)}
                      className="ml-2 text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addPollOption}
                className="text-blue-600 hover:underline text-sm mt-1"
              >
                + Add Option
              </button>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded font-semibold hover:bg-pink-700 transition"
            disabled={uploading}
          >
            Create Blog
          </button>
        </form>
      </div>
    </div>
  );
}
