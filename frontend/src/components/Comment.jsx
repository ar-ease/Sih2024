import moment from "moment";
import axios from "axios";
import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { set } from "date-fns";
import { useState } from "react";

export default function Comment({ comment }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`/api/user/${comment.userId}`);
        const data = res.data;
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [comment]);
  console.log(user);
  return (
    <div>
      <div className="flex space-x-4">
        <Avatar className="mt-1">
          <AvatarImage src={user?.profilePicture} />
          <AvatarFallback>{user?.username}</AvatarFallback>
        </Avatar>
        <div className="bg-gray-100 dark:bg-neutral-800 p-3 rounded-lg flex-1">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold">
              {user ? `@${user?.username}` : "anonymus user"}
            </h3>

            <span className="text-xs text-neutral-500">
              {moment(comment.createdAt).fromNow()}
            </span>
          </div>
          <p className="text-sm mt-1 text-neutral-800 dark:text-neutral-200">
            {comment.content}
          </p>
        </div>
      </div>
    </div>
  );
}
