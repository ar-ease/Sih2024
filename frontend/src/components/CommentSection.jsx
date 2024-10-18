import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Comment from "./Comment";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentError, setCommentError] = useState(null);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.length > 200) return;

    try {
      const res = await axios.post("/api/comment/create", {
        content: newComment,
        postId,
        userId: currentUser._id,
      });

      if (res.status === 200) {
        setNewComment("");
        setCommentError(null);
      }
    } catch (error) {
      setCommentError(error.response.data.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.get(`/api/comment/getPostComments/${postId}`);

        setComments(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await axios.put(`/api/comment/likeComment/${commentId}`);
      const data = await res.data;

      setComments(
        comments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                likes: data.likes,
                numberOfLikes: data.likes.length,
              }
            : comment
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {currentUser ? (
        <div className="flex gap-1 my-5 items-center text-slate-500 text-sm">
          <p>Signed In as :</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt="user"
          />
          <Link
            className="text-blue-500 text-xs hover:underline    "
            to={`/dashboard?tab=profile`}
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-red-400   text-md pl-2 font-bold">
          You must be signed in to comment :
          <Link
            className="text-blue-500  hover:underline  pl-1 
             "
            to={`/sign-in`}
          >
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <div className="w-full  mx-auto p-4">
          <h2 className="text-xl font-semibold mb-4">Comments</h2>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-6 ">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment..."
              maxLength={200}
              className="w-full p-2 mb-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200"
              rows={4}
            />
            <div className="flex justify-between ">
              <p className="text-gray-500 text-sm">
                {200 - newComment.length} characters remaining
              </p>
              <Button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 flex "
              >
                Submit
              </Button>

              {commentError && (
                <div className="pt-4">
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{commentError}</AlertDescription>
                  </Alert>
                </div>
              )}
            </div>
          </form>

          {/* 2nd part Comments */}
          <div className="flex gap-2">
            <p className="mt-1">Comments</p>
            <div className="border border-gray-400 py-1 px-2 w-9 h-8 bg-gray-100 dark:bg-gray-700 rounded-md ">
              <p>{comments.length}</p>
            </div>
          </div>

          {comments.length === 0 ? (
            <p className="text-neutral-500">No comments yet. Be the first!</p>
          ) : (
            <div className="space-y-4 mt-6">
              {comments.map((comment) => (
                <Comment
                  key={comment?._id}
                  comment={comment}
                  onLike={() => handleLike(comment?._id)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
