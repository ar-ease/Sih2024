import { Check, CircleX } from "lucide-react";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DashCommets() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [popoverOpen, setPopoverOpen] = useState(null);
  const [commentIdToDelete, setCommentIdToDelete] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (currentUser.isAdmin) {
          const res = await axios.get(`/api/comment/getcomments`);
          if (res.status === 200) {
            setComments(res.data.comments);
            setShowMore(res.data.comments.length >= 9);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, [currentUser._id, currentUser.isAdmin]);

  const handleShowMore = async () => {
    try {
      const startIndex = comments.length;
      const res = await axios.post(
        `/api/comment/getcomments?startIndex=${startIndex}`
      );
      if (res.status === 200) {
        setComments((prev) => [...prev, ...res.data.comments]);
        setShowMore(res.data.comments.length >= 9);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async () => {
    try {
      const res = await axios.delete(
        `/api/comment/delete/${commentIdToDelete}`
      );
      if (res.statusText !== "OK") {
        console.log(res.data.message);
      } else {
        setComments((prev) =>
          prev.filter((user) => user._id !== userIdToDelete)
        );
        setCommentIdToDelete(null);
        setPopoverOpen(null);
      }
    } catch (error) {
      console.log(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="mt-3">
      {currentUser.isAdmin && comments.length > 0 ? (
        <div className="w-full">
          <Table className>
            {showMore && (
              <TableCaption
                onClick={handleShowMore}
                className="text-neutral-500 bg-slate-200 py-2 text-md font-semibold cursor-pointer"
              >
                Show more posts
              </TableCaption>
            )}
            <TableHeader>
              <TableRow className="w-full">
                <TableHead className="w-1/5">
                  Date Created (MM/DD/YYYY)
                </TableHead>

                <TableHead className="w-1/5">User Image</TableHead>
                <TableHead className="w-1/5">Username</TableHead>
                <TableHead className="w-1/5">Email</TableHead>
                <TableHead className="w-1/5">Admin</TableHead>
                <TableHead className="w-1/5 pr-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comments.map((comment) => (
                <TableRow key={comment._id}>
                  <TableCell className="font-medium">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <img
                      src={comment.profilePicture}
                      alt={comment.username}
                      className="w-10 h-10 object-cover rounded-full "
                    />
                  </TableCell>
                  <TableCell>{comment.username}</TableCell>
                  <TableCell>{comment.email}</TableCell>
                  <TableCell>
                    {comment.isAdmin ? (
                      <Check className="text-blue-700" />
                    ) : (
                      <CircleX />
                    )}
                  </TableCell>
                  <TableCell>
                    <Popover
                      open={popoverOpen === comment._id}
                      onOpenChange={(openthis) => {
                        setPopoverOpen(openthis ? comment._id : null);
                      }}
                    >
                      <PopoverTrigger asChild>
                        <span
                          onClick={() => {
                            setUserIdToDelete(comment._id);
                          }}
                          className="text-red-600 hover:underline cursor-pointer "
                        >
                          Delete
                        </span>
                      </PopoverTrigger>
                      <PopoverContent className="w-60 text-center">
                        <p>Are you sure you want to delete the user?</p>
                        <div className="flex justify-center gap-2 mt-2">
                          <button
                            onClick={handleDeleteComment}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setPopoverOpen(null)}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p>NO USERS YET</p>
      )}
    </div>
  );
}
