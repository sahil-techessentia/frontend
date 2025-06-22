"use client";
import { API_ENDPOINTS } from "@/config/api";
import userStore from "@/store/userStore";
import { apiHandler } from "@/utils/apiHandler";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginPage() {
  const [success, setSuccess] = useState(false);
  const { loginUser, error, loading } = userStore();
  const router = useRouter();
  const handleSubmit = async (e) => {
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    e.preventDefault();
    setSuccess(false);
    try {
      await loginUser(data);
      if (!loading && !error) {
        setSuccess(true);
        e.target.reset();
        router.push("/");
      }
    } catch (err) {
      error(err.message);
      throw err;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {success && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-center">
            Login successful!
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded font-semibold hover:bg-pink-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
