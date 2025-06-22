class ApiError extends Error {
  constructor(status, message, data = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

const defaultHeaders = {
  "Content-Type": "application/json",
};

const getAuthToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

const getHeaders = (customHeaders = {}) => {
  const token = getAuthToken();
  const headers = { ...defaultHeaders, ...customHeaders };

  if (token) headers["Authorization"] = `Bearer ${token}`;

  // Remove undefined headers
  Object.keys(headers).forEach(
    (key) => headers[key] === undefined && delete headers[key]
  );

  return headers;
};

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new ApiError(
      response.status,
      data.message || "Something went wrong",
      data
    );
  }
  return data;
};

const request = async (method, url, data = null, options = {}) => {
  const isFileUpload = data instanceof FormData;

  const config = {
    method,
    headers: isFileUpload ? getHeaders() : getHeaders(options.headers),
    ...options,
  };

  if (data && method !== "GET") {
    config.body = isFileUpload ? data : JSON.stringify(data);
  }

  // Allow browser to set boundary for FormData
  if (isFileUpload) {
    delete config.headers["Content-Type"];
  }

  const response = await fetch(url, config);
  return handleResponse(response);
};

export const apiHandler = {
  get: (url, options) => request("GET", url, null, options),
  post: (url, data, options) => request("POST", url, data, options),
  put: (url, data, options) => request("PUT", url, data, options),
  patch: (url, data, options) => request("PATCH", url, data, options),
  delete: (url, options) => request("DELETE", url, null, options),
  uploadFile: (url, file, options) => {
    const formData = new FormData();
    formData.append("file", file);
    return request("POST", url, formData, options);
  },
};

export { ApiError };
