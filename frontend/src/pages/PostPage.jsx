import { Button } from "@/components/ui/button";

import { LoaderCircle } from "lucide-react";

import axios from "axios";
import { Link, useParams } from "react-router-dom";

import React, { useEffect, useState } from "react";

import CallToAction from "@/components/CallToAction";
import CommentSection from "@/components/CommentSection";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await axios.post(`/api/post/getposts?slug=${postSlug}`);

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
      <main className=" p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
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
        <CommentSection postId={post._id} />
      </main>
    </>
  );
}
