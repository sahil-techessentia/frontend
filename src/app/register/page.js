"use client";
import { API_ENDPOINTS } from "@/config/api";
import { apiHandler } from "@/utils/apiHandler";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
const dummyPic =
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80";
export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    profile_picture: dummyPic,
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      const res = await apiHandler
        .post(API_ENDPOINTS.auth.register, form)
        .then((res) => {
          setSuccess(true);
          setForm({ name: "", email: "", password: "" });
          router.push("/login");
        })
        .catch((err) => {
          setError(err.message || "Registration failed");
          return;
        });
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {success && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-center">
            Registration successful! You can now log in.
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded font-semibold hover:bg-pink-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
