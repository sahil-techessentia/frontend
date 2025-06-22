const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002/api";

const withId = (base) => (id) => `${base}/${id}`;

export const API_ENDPOINTS = {
  // Auth
  auth: {
    login: `${API_BASE_URL}/users/login`,
    register: `${API_BASE_URL}/users`,
    logout: `${API_BASE_URL}/users/logout`,
  },

  // Users
  users: {
    userDetails: `${API_BASE_URL}/users/user-details`,
    users: `${API_BASE_URL}/users`,
    getAll: `${API_BASE_URL}/users`,
    getById: withId(`${API_BASE_URL}/users`),
    update: withId(`${API_BASE_URL}/users`),
    delete: withId(`${API_BASE_URL}/users`),
  },

  // Blogs
  blogs: {
    base: `${API_BASE_URL}/blogs`,
    getAll: `${API_BASE_URL}/blogs`,
    getById: withId(`${API_BASE_URL}/blogs`),
    create: `${API_BASE_URL}/blogs`,
    update: withId(`${API_BASE_URL}/blogs`),
    delete: withId(`${API_BASE_URL}/blogs`),
    likeDislike: (id, queryParams) =>
      `${API_BASE_URL}/blogs/like-dislike/${id}?${queryParams}`,
    getComment: (id) => `${API_BASE_URL}/blogs/comments/${id}`,
    addComment: (id) => `${API_BASE_URL}/blogs/comment/${id}`,
  },

  // Upload
  upload: {
    file: `${API_BASE_URL}/upload`,
  },
  notifications: {
    base: `${API_BASE_URL}/notifications`,
    get: `${API_BASE_URL}/notifications`,
  },
};
