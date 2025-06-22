import { useState, useCallback } from "react";
import { apiHandler, ApiError } from "../utils/apiHandler";

/**
 * Reusable API hook for managing loading and error state
 * @param {Function} apiMethod - API method like apiHandler.get/post/etc
 */
export const useApi = (apiMethod) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiMethod(...args);
        setData(result);
        return result;
      } catch (err) {
        const apiError =
          err instanceof ApiError
            ? err
            : new ApiError(500, err?.message || "Unknown error");
        setError(apiError);
        throw apiError;
      } finally {
        setLoading(false);
      }
    },
    [apiMethod]
  );

  return { data, error, loading, execute };
};

/**
 * Pre-configured hooks for common API operations
 */
export const useApiHooks = {
  // Blog
  useGetBlogs: () => useApi(apiHandler.get),
  useGetBlog: () => useApi(apiHandler.get),
  useCreateBlog: () => useApi(apiHandler.post),
  useUpdateBlog: () => useApi(apiHandler.put),
  useDeleteBlog: () => useApi(apiHandler.delete),

  // User
  useGetUsers: () => useApi(apiHandler.get),
  useGetUser: () => useApi(apiHandler.get),
  useUpdateUser: () => useApi(apiHandler.put),
  useDeleteUser: () => useApi(apiHandler.delete),

  // Auth
  useLogin: () => useApi(apiHandler.post),
  useRegister: () => useApi(apiHandler.post),
  useLogout: () => useApi(apiHandler.post),

  // File
  useUploadFile: () => useApi(apiHandler.uploadFile),
};
