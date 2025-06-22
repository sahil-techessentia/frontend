import { API_ENDPOINTS } from "@/config/api";
import { apiHandler } from "@/utils/apiHandler";

const { create } = require("zustand");

const blogStore = create((set) => ({
  blogs: [],
  comments: [],
  loading: false,
  error: null,

  fetchBlogs: async () => {
    set({ loading: true, error: null });
    try {
      const response = await apiHandler.get(API_ENDPOINTS.blogs.getAll);
      console.log(response, "response");

      set({ blogs: response?.blogs || [], loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  createBlog: async (blog) => {
    const token = localStorage.getItem("token");
    if (!token) {
      set({ error: "Unauthorized", loading: false });
      return;
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    set({ loading: true, error: null });
    try {
      const response = await apiHandler.post(
        API_ENDPOINTS.blogs.create,
        blog,
        headers
      );
      if (!response) throw new Error("Failed to create blog");
      set({ blogs: response?.blog, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  likeDislikeBlog: async (blogId, queryParams) => {
    const token = localStorage.getItem("token");
    if (!token) {
      set({ error: "Unauthorized", loading: false });
      return;
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    set({ loading: true, error: null });
    try {
      const response = await apiHandler.get(
        API_ENDPOINTS.blogs.likeDislike(
          blogId,
          "type=post&sub_type=" + queryParams
        ),
        headers
      );
      if (!response) throw new Error("Failed to like/dislike blog");

      set((state) => ({
        blogs: state.blogs.map((blog) =>
          blog.id === blogId
            ? {
                ...blog,
                liked: !blog.liked,
                like_count: response?.liked
                  ? blog.like_count + 1
                  : blog.like_count - 1,
              }
            : blog
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  addComment: async (data) => {
    const token = localStorage.getItem("token");
    if (!token) {
      set({ error: "Unauthorized", loading: false });
      return;
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log(data, "data");
    set({ loading: true, error: null });
    try {
      const response = await apiHandler.post(
        API_ENDPOINTS.blogs.addComment(data?.blog_id),
        data,
        headers
      );
      return response;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw new Error(error.message);
    }
  },
  getComments: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await apiHandler.get(API_ENDPOINTS.blogs.getComment(id));
      console.log(response, "response");
      set({ comments: response?.comments || [], loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default blogStore;
