"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import blogStore from "@/store/blogStore";
const dummyPic =
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80";
// Dummy data

const recommendedUsers = [
  {
    name: "Tony Hart",
    username: "@tonyhart123",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Tony Hart",
    username: "@tonyhart123",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Tony Hart",
    username: "@tonyhart123",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Tony Hart",
    username: "@tonyhart123",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];
const ads = [
  {
    id: 1,
    text: "Advertisement 1: Sheer purple dress for all lovely looks. Shop now and shine like a ray of lovely luck.",
  },
  {
    id: 2,
    text: "Advertisement 2: Sheer purple dress for all lovely looks. Shop now and shine like a ray of lovely luck.",
  },
];
const tabs = ["Explore", "Erotica", "Blogs", "Poll"];
function Header() {
  const [activeTab, setActiveTab] = useState("Blogs");

  return (
    <header className="flex max-w-7xl mx-auto flex-wrap items-center justify-between px-6 py-4 bg-white shadow-sm sticky top-0 z-10">
      <nav className="flex gap-8 text-gray-700 font-medium w-full md:w-auto">
        {tabs.map((tab) => (
          <a
            className={`font-semibold text-sm py-2 mb-1.5 relative ${
              activeTab === tab
                ? "text-pink-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-4/5 after:h-[2px] after:bg-pink-600"
                : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </a>
        ))}
      </nav>
      <input
        type="text"
        placeholder="Search by title..."
        className="border rounded px-3 py-1 w-2/3 md:w-64"
      />
      <Link
        href="/blogs/create"
        className="bg-pink-600 text-white px-4 py-2 rounded font-semibold  w-1/3 md:w-auto text-xs md:text-base"
      >
        Create a Post
      </Link>
    </header>
  );
}

function BlogCard({ post }) {
  const [comment, setComment] = useState(false);
  const { likeDislikeBlog } = blogStore();
  return (
    <div className="bg-white rounded-lg shadow mb-6">
      <div className="flex items-center px-4 pt-4">
        <img
          src={post?.user?.avatar || dummyPic}
          alt={post?.user_name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <div className="font-semibold text-gray-800 flex items-center gap-2">
            {post?.user_name}
            <span className="text-xs text-gray-400">{post?.user_name}</span>
          </div>
          <div className="text-xs text-gray-400">{post?.created_at}</div>
        </div>
        <span
          className={`ml-auto text-xs px-2 py-1 rounded font-bold ${
            post?.tag === "post"
              ? "bg-green-100 text-green-700"
              : post?.tag === "fund raising"
              ? "bg-blue-100 text-blue-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {post?.tag}
        </span>
      </div>
      {/* {post?.image && ( */}
      <img
        src={post?.image || dummyPic}
        alt="post"
        className="w-full h-64 object-cover mt-4"
      />
      {/* )} */}
      <div className="px-4 py-3">
        <div className="mb-2 text-gray-800">
          {post?.description}
          {post?.tag === "fund raising" && (
            <span className="text-blue-500 ml-2 cursor-pointer">Read more</span>
          )}
        </div>
        {post?.poll && (
          <div className="bg-gray-50 rounded p-3 mb-2">
            {post?.poll?.map((option, idx) => (
              <div
                key={idx}
                className="border rounded px-3 py-2 mb-2 cursor-pointer hover:bg-pink-50"
              >
                {option}
              </div>
            ))}
            <div className="text-xs text-gray-500">
              {post?.votes} votes · 24 left
            </div>
          </div>
        )}
        {post?.earnings && (
          <div className="flex justify-end items-center gap-2 mt-2">
            <span className="text-green-700 font-semibold">
              Earnings: {post?.earnings}
            </span>
            <button className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs font-bold">
              Send Tip
            </button>
          </div>
        )}
        <div className="flex items-center gap-4 text-gray-500 mt-2">
          <span onClick={() => likeDislikeBlog(post?.id, "like")}>
            {post?.liked ? " ❤️" : "🤍"} {post?.like_count}
          </span>
          <span onClick={() => setComment(!comment)} className="cursor-pointer">
            💬 {post?.comment_count}
          </span>
          <span>🔄 {post?.share_count}</span>
          <span className="ml-auto text-xs text-gray-400 cursor-pointer">
            View {post.comments} comments
          </span>
        </div>
        <Comment comment={post?.comments} post={post} />
        {comment && <Input id={post?.id} reply={0} parent_id={null} />}
      </div>
    </div>
  );
}

function RecommendedUsers() {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <h3 className="font-semibold mb-3">Recommended Users</h3>
      {recommendedUsers.map((user, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between mb-3 last:mb-0"
        >
          <div className="flex items-center gap-2">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <div className="font-medium text-gray-800 text-sm">
                {user.name}
              </div>
              <div className="text-xs text-gray-400">{user.username}</div>
            </div>
          </div>
          <button className="bg-pink-100 text-pink-600 px-3 py-1 rounded text-xs font-semibold">
            Follow
          </button>
        </div>
      ))}
    </div>
  );
}

function Advertisement({ ad }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 text-xs text-gray-700">
      {ad.text}
    </div>
  );
}
function Input({ id, reply = 0, parent_id }) {
  const [text, setText] = useState("");
  const { addComment } = blogStore();
  const handleSubmit = async () => {
    const data = {
      blog_id: id,
      comment: text,
      parent_id,
      is_reply: reply,
    };
    await addComment(data)
      .then(() => {
        setText("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex items-center gap-2 mt-2">
      <input
        type="text"
        placeholder="Add a comment"
        className="w-full border rounded px-3 py-1"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-pink-600 text-white px-4 py-2 rounded font-semibold cursor-pointer hover:bg-white hover:text-pink-600 border border-pink-600 delay-75"
      >
        <i class="fi fi-rs-paper-plane"></i>
      </button>
    </div>
  );
}
function Comment({ comment, post }) {
  const [reply, setReply] = useState(false);
  // const { comments, getComments } = blogStore();
  // useEffect(() => {
  //   if (post?.comment_count > 0) {
  //     getComments(post?.id);
  //   }
  // }, [post?.id]);
  return (
    <div className=" mt-2">
      {post?.blog_comments?.length > 0 &&
        post?.blog_comments?.map((comment) => (
          <div className="flex gap-2">
            <img
              src={comment?.user?.avatar || dummyPic}
              alt={comment?.user_name}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-grow">
              <small className="text-sm font-medium text-gray-800">
                {comment?.user_name}
              </small>
              <div className="flex items-center justify-between">
                <div className="">
                  <p className="text-sm text-gray-400">
                    {comment?.comment ?? "description"}
                  </p>
                  <div className="flex items-center gap-2">
                    <button className="text-pink-600  text-[10px] cursor-pointer font-semibold">
                      Like
                    </button>
                    <button
                      onClick={() => setReply(!reply)}
                      className="text-pink-600  text-[10px] cursor-pointer font-semibold"
                    >
                      Reply
                    </button>
                    <button className="text-pink-600  text-[10px] cursor-pointer font-semibold">
                      Delete
                    </button>
                  </div>
                </div>
                <div className="flex align-center gap-px flex-col text-xs text-gray-400">
                  <i class="fi fi-rr-heart"></i>
                  <span className="text-xs">10</span>
                </div>
              </div>
              {reply && (
                <Input id={post?.id} parent_id={comment?.id} reply={1} />
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
export default function BlogsPage() {
  const { blogs, loading, error, fetchBlogs } = blogStore();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto flex gap-8 py-8 px-4">
        {/* Main Feed */}
        <div className="flex-1 max-w-2xl">
          {blogs?.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        {/* Sidebar */}
        <aside className="w-80 hidden lg:block">
          <RecommendedUsers />
          {ads.map((ad) => (
            <Advertisement key={ad.id} ad={ad} />
          ))}
        </aside>
      </div>
    </div>
  );
}
