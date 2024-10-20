import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import PostCard from "@/components/PostCard";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/api/post/getposts");
        if (res.status === 200) {
          setPosts(res.data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-screen text-center text-slate-800 dark:text-white z-10">
        <h1 className="text-5xl font-bold mb-4">Welcome to the Chaos</h1>
        <p className="text-lg mb-8">
          Discover amazing content and connect with our community.
        </p>
        <Button className="bg-blue-600 text-white">Get Started</Button>
      </section>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto p-3 ">
        {posts && posts.length > 0 ? (
          <>
            <div className="">
              <h2 className="text-center text-4xl font-bold">POSTS</h2>
              <div className="grid  grid-cols-1 md:grid-cols-3 gap-4 my-8">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <p>No posts found</p>
        )}
      </div>
      <div className="text-center">
        <Link to="/search">
          <Button>View all posts</Button>
        </Link>
      </div>
    </div>
  );
}
