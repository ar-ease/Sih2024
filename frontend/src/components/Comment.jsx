import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { Heart } from "lucide-react";
import moment from "moment";
import { Avatar } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Comment({ comment, onLike, currentUser, onEdit }) {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/api/user/${comment.userId}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [comment.userId]);

  // Check if Likes array exists, if not initialize it
  const isLiked =
    currentUser && (comment.Likes || []).includes(currentUser._id);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };
  const handleSave = async () => {
    try {
      const res = await axios.put(`/api/comment/editComment/${comment._id}`, {
        content: editedContent,
      });
      if (res.status === 200) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4 border border-gray-200 rounded-lg">
      <div className="flex items-center gap-2 text-xs">
        <Avatar>
          <img src={user?.profilePicture} alt={user?.username} />
        </Avatar>
        <div>
          <p className="font-semibold">
            {user ? `@${user.username}` : "anonymous user"}
          </p>
          <p className="text-sm text-gray-500">
            {moment(comment.createdAt).fromNow()}
          </p>
        </div>
      </div>
      {isEditing ? (
        <>
          <Textarea
            className="w-full h-20 p-2 border border-gray-200 rounded-lg"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          ></Textarea>
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              {" "}
              Cancel
            </Button>
            <Button variant="secondary" onClick={handleSave}>
              Save
            </Button>
          </div>
        </>
      ) : (
        <>
          <p className="mt-2">{comment.content}</p>
          <div className="flex gap-4">
            <button
              onClick={onLike}
              className="flex items-center gap-1 mt-2 text-sm"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isLiked
                    ? "fill-red-500 text-red-500"
                    : "text-gray-500 hover:text-red-500"
                }`}
              />

              <span className={isLiked ? "text-red-500" : "text-gray-500"}>
                {comment.numberOfLikes || 0}
              </span>
            </button>

            {currentUser && currentUser._id === comment.userId ? (
              <button onClick={handleEdit} className="mt-2">
                Edit
              </button>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}
