"use client";
import React from "react";

const Notifications = ({ notifications, unreadCount }) => {
  // const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-4 sticky top-0 bg-gray-900 z-10">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <p className="text-gray-400">You have {unreadCount} unread messages</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start p-4 m-2 rounded-lg ${
              !notification.read ? "bg-gray-800" : "bg-gray-800/50"
            }`}
          >
            <img
              src={
                notification.type === "admin" ? "/logo.svg" : notification.image
              }
              alt="avatar"
              className="w-10 h-10 rounded-full mr-4"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h2 className="font-bold">
                  {notification.title || notification.user}
                </h2>
                <span className="text-sm text-gray-400">
                  {notification.time}
                </span>
              </div>
              <p className="text-gray-300 text-sm">
                {notification.message}
                {notification.type === "admin" && (
                  <a href="#" className="text-green-400 ml-1">
                    Read more
                  </a>
                )}
              </p>
            </div>
            {!notification.read && (
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full ml-4 self-center flex-shrink-0"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
