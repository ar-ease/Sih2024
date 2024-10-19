import PostCard from "@/components/PostCard";
import axios from "axios";
import { Button } from "@/components/ui/button";

import { LoaderCircle } from "lucide-react";

import { Link, useParams } from "react-router-dom";

import React, { useEffect, useState } from "react";

import CallToAction from "@/components/CallToAction";
import CommentSection from "@/components/CommentSection";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await axios.get(`/api/post/getposts?slug=${postSlug}`);

        if (data.status !== 200) {
          setError(true);
          setLoading(true);
          return;
        }
        if (data.status === 200) {
          setLoading(false);
          setPost(data.data.posts[0]);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await axios.get(`/api/post/getposts?limit=3`);

        if (res.status !== 200) {
          return;
        }
        if (res.status === 200) {
          setRecentPosts(res?.data?.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (loading) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen">
          <LoaderCircle className="animate-spin text-blue-500" size={50} />
        </div>
      </>
    );
  }

  return (
    <>
      <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen pt-28">
        <h1 className="text-3xl p-3 text-center font-serif m-w-3xl lg:m-w-4xl">
          {post && post.title}
        </h1>
        <Link
          to={`/search?category=${post && post.category}`}
          className="self-center mt-5"
        >
          <Button variant="outline">{post && post.category}</Button>
        </Link>

        <img
          src={post && post.image}
          alt={post && post.title}
          className="mt-10 p-3 max-h-[600px] w-full object-fill"
        />
        <div className="flex justify-between p-3 border-b border-slate-300">
          <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
          <span className="">
            {post && (post.content.length / 1000).toFixed(0)} mins read
          </span>
        </div>
        <div
          className="p-3 max-w-2xl mx-auto w-full post-content"
          dangerouslySetInnerHTML={{ __html: post && post.content }}
        ></div>

        {/* <div className="w-full">
          <CallToAction />
        </div> */}
        <div className="max-w-2xl w-full mx-auto mt-8 ">
          <CommentSection postId={post._id} />
        </div>
        <div className="flex flex-col justify-center items-center mb-5">
          <h1>Recent Posts</h1>
          <div className="w-full grid gap-5 mt-5 cols-span-2 sm:grid-cols-3 items-center">
            {recentPosts &&
              recentPosts.map((post) => (
                <Link to={`/post/${post.slug}`}>
                  <PostCard key={post._id} post={post} />
                </Link>
              ))}
          </div>
        </div>
      </main>
    </>
  );
}
