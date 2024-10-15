import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { set } from "date-fns";

export default function DashPost() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  console.log(currentUser._id);
  console.log(userPosts);

  useEffect(() => {
    try {
      const fetchPosts = async () => {
        const res = await axios.post(
          `/api/post/getposts?userId=${currentUser._id}`
        );
        console.log(res);
        setUserPosts(res.data.posts);
      };
      if (currentUser.isAdmin) {
        fetchPosts();
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentUser._id]);
  return (
    <div className="">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <div className="w-full">
          <Table className="">
            <TableCaption>List of all posts</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">Date updated(MM/DD/YYYY)</TableHead>
                <TableHead>Post Image</TableHead>
                <TableHead>Post title</TableHead>
                <TableHead>Catagory</TableHead>
                <TableHead className="text-end">Actions</TableHead>
              </TableRow>
            </TableHeader>
            {userPosts.map((post) => (
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 ibject-cover bg-gray-50"
                      />
                    </Link>
                  </TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.category}</TableCell>

                  <TableCell>
                    <Link
                      className="text-blue-600 hover:underline"
                      to={`/update-post/${post.slug}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </TableCell>
                  <TableCell className="font-medium hover:underline">
                    <span className="text-red-600 ">Delete</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>{" "}
        </div>
      ) : (
        <div> No Posts</div>
      )}
    </div>
  );
}
