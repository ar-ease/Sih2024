import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import axios from "axios";
import Comment from "./Comment";

export default function CommentSection({ postId }) {
  const navigate = useNavigate(); // Added navigate
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentError, setCommentError] = useState(null);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/api/comment/getPostComments/${postId}`);
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

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
        // Add new comment with proper structure
        const newCommentData = {
          ...res.data,
          user: currentUser,
          numberOfLikes: 0,
          Likes: [], // Changed to match your API response
        };
        setComments((prev) => [newCommentData, ...prev]);
        setNewComment("");
        setCommentError(null);
        fetchComments(); // Fetch fresh comments after adding new one
      }
    } catch (error) {
      setCommentError(
        error.response?.data?.message || "Error creating comment"
      );
    }
  };

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }

      // Find the current comment
      const comment = comments.find((c) => c._id === commentId);

      // Check if Likes array exists, if not initialize it
      const currentLikes = comment?.Likes || [];
      const isLiked = currentLikes.includes(currentUser._id);

      // Optimistically update the UI
      setComments((prev) =>
        prev.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                Likes: isLiked
                  ? currentLikes.filter((id) => id !== currentUser._id)
                  : [...currentLikes, currentUser._id],
                numberOfLikes: isLiked
                  ? (comment.numberOfLikes || 0) - 1
                  : (comment.numberOfLikes || 0) + 1,
              }
            : comment
        )
      );

      // Make API call
      const res = await axios.put(`/api/comment/likeComment/${commentId}`);

      // Update with server response
      fetchComments();
    } catch (error) {
      console.log(error);
      fetchComments(); // Revert to server state in case of error
    }
  };
  const handleEdit = async (comment, editedContent) => {
    setComments((prev) =>
      prev.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  return (
    <>
      {currentUser && (
        <div className="w-full mx-auto p-4">
          {currentUser ? (
            <div className="flex gap-1 my-5 items-center text-slate-500 text-sm">
              <p>Signed In as:</p>
              <img
                className="h-5 w-5 object-cover rounded-full"
                src={currentUser.profilePicture}
                alt="user"
              />
              <Link
                className="text-blue-500 text-xs hover:underline"
                to={`/dashboard?tab=profile`}
              >
                @{currentUser.username}
              </Link>
            </div>
          ) : (
            <div className="text-red-400 text-md pl-2 font-bold">
              You must be signed in to comment:
              <Link
                className="text-blue-500 hover:underline pl-1"
                to={`/sign-in`}
              >
                Sign In
              </Link>
            </div>
          )}

          <form onSubmit={handleCommentSubmit} className="mb-6">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment..."
              maxLength={200}
              className="w-full p-2 mb-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200"
              rows={4}
            />
            <div className="flex justify-between">
              <p className="text-gray-500 text-sm">
                {200 - newComment.length} characters remaining
              </p>
              <Button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 flex"
              >
                Submit
              </Button>
            </div>
            {commentError && (
              <div className="pt-4">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{commentError}</AlertDescription>
                </Alert>
              </div>
            )}
          </form>

          <div className="flex gap-2">
            <p className="mt-1">Comments</p>
            <div className="border border-gray-400 py-1 px-2 w-9 h-8 bg-gray-100 dark:bg-gray-700 rounded-md">
              <p>{comments.length}</p>
            </div>
          </div>

          {comments.length === 0 ? (
            <p className="text-neutral-500">No comments yet. Be the first!</p>
          ) : (
            <div className="space-y-4 mt-6">
              {comments.map((comment) => (
                <Comment
                  key={comment._id}
                  comment={comment}
                  onLike={() => handleLike(comment._id)}
                  currentUser={currentUser}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
