import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
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
import { set } from "date-fns";

export default function DashPost() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [popoverOpen, setPopoverOpen] = useState(null);
  const [postIdToDelete, setPostIdToDelete] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (currentUser.isAdmin) {
          const res = await axios.get(
            `/api/post/getposts?userId=${currentUser._id}`
          );
          if (res.status === 200) {
            setUserPosts(res.data.posts);
            setShowMore(res.data.posts.length >= 9);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [currentUser._id, currentUser.isAdmin]);

  const handleShowMore = async () => {
    try {
      const startIndex = userPosts.length;
      const res = await axios.post(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      if (res.status === 200) {
        setUserPosts((prev) => [...prev, ...res.data.posts]);
        setShowMore(res.data.posts.length >= 9);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async () => {
    setPopoverOpen(null);
    try {
      const response = await axios.delete(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`
      );

      if (response.status === 200) {
        // Use response.status instead of statusText
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      } else {
        console.log("Unexpected response:", response);
      }
    } catch (error) {
      console.error(
        "Error deleting post:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="mt-20 pt-3">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <div className="w-full">
          <Table>
            {showMore && (
              <TableCaption
                onClick={handleShowMore}
                className="text-neutral-500 bg-slate-200 py-2 text-md font-semibold cursor-pointer"
              >
                Show more posts
              </TableCaption>
            )}
            <TableHeader>
              <TableRow>
                <TableHead>Date updated(MM/DD/YYYY)</TableHead>
                <TableHead>Post Image</TableHead>
                <TableHead>Post title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="pl-8">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userPosts.map((post) => (
                <TableRow key={post._id}>
                  <TableCell className="font-medium">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-gray-50"
                      />
                    </Link>
                  </TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>
                    <Link
                      className="text-blue-600 hover:underline mr-4"
                      to={`/update-post/${post._id}`}
                    >
                      Edit
                    </Link>
                    <Popover
                      open={popoverOpen === post._id}
                      onOpenChange={(openthis) => {
                        setPopoverOpen(openthis ? post._id : null);
                      }}
                    >
                      <PopoverTrigger asChild>
                        <span
                          onClick={() => {
                            setPostIdToDelete(post._id);
                          }}
                          className="text-red-600 hover:underline cursor-pointer"
                        >
                          Delete
                        </span>
                      </PopoverTrigger>
                      <PopoverContent className="w-60 text-center">
                        <p>Are you sure you want to delete this post?</p>
                        <div className="flex justify-center gap-2 mt-2">
                          <button
                            onClick={handleDeletePost}
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
        <p>No Posts</p>
      )}
    </div>
  );
}
