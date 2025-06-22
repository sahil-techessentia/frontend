"use client";
import userStore from "@/store/userStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import Notifications from "./Notifications";
import useNotificationStore from "@/store/notificationStore";

export default function Header() {
  const { user, getUser, logoutUser } = userStore();
  const { notifications, unreadCount, getNotifications } =
    useNotificationStore();

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!user) {
      getUser();
    }
    getNotifications();
  }, [user]);
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm sticky top-0 z-20">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          {/* <img src="/logo.svg" alt="Logo" className="h-8 w-8" /> */}
          <span className="font-bold text-xl text-pink-600">MyApp</span>
        </Link>
      </div>
      {/* Middle: Navigation */}
      <nav className="flex gap-8 text-gray-700 font-medium">
        {/* <Link href="/explore" className="hover:text-blue-600">
          Explore
        </Link>
        <Link href="/erotica" className="hover:text-blue-600">
          Erotica
        </Link> */}
        <Link href="/blogs" className="hover:text-blue-600">
          Blogs
        </Link>
        {/* <Link href="/poll" className="hover:text-blue-600">
          Poll
        </Link> */}
      </nav>
      {user ? (
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setVisible(true)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <i
              className="pi pi-bell text-pink-600"
              style={{ fontSize: "1.5rem" }}
            ></i>
          </button>
          <span className="text-pink-600 font-bold w-8 aspect-square rounded-full border border-pink-600 flex items-center justify-center ">
            {user?.name[0]}
          </span>
          <span className="text-pink-600 font-bold">{user?.name}</span>{" "}
          <button
            onClick={() => {
              logoutUser();
              window.location.href = "/login";
            }}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <i
              className="fi fi-rr-sign-out-alt text-pink-600"
              style={{ fontSize: "1.5rem" }}
            ></i>
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link href="/login">
            <button className="px-4 py-1 rounded border border-pink-600 text-pink-600 font-semibold hover:bg-pink-50 transition">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="px-4 py-1 rounded bg-pink-600 text-white font-semibold hover:bg-pink-700 transition">
              Sign Up
            </button>
          </Link>
        </div>
      )}
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        position="right"
        className="w-full md:w-[500px] lg:w-[500px] bg-gray-900"
      >
        <Notifications
          notifications={notifications}
          unreadCount={unreadCount}
        />
      </Sidebar>
    </header>
  );
}
