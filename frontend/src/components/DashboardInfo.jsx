import { Button } from "@/components/ui/button";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Card, CardHeader, CardContent } from "@/components/ui/card"; // ShadCN Card Component
import { useNavigate } from "react-router-dom";

export default function DashboardInfo() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/user/getusers?limit=5");
        if (res.status === 200) {
          setUsers(res.data.users);
          setTotalUsers(res.data.totalUsers);
          setLastMonthUsers(res.data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/api/post/getposts?limit=5");
        if (res.status === 200) {
          setPosts(res.data.posts);
          setTotalPosts(res.data.totalPosts);
          setLastMonthPosts(res.data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await axios.get("/api/comment/getcomments?limit=5");
        if (res.status === 200) {
          setComments(res.data.comments);
          setTotalComments(res.data.totalComments);
          setLastMonthComments(res.data.lastMonthComments);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  console.log("consoling", lastMonthPosts);

  return (
    <div className="p-6 mt-20">
      {/* Dashboard Header */}
      <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>
      {/* User Info */}
      {currentUser && (
        <p className="text-md mb-4">
          Welcome, <strong>{currentUser.username}</strong>!
        </p>
      )}
      {/* Dashboard Grid */}
      <div className="flex flex-wrap justify-center items-center">
        {/* Users Section */}
        <div className="sm:w-1/3 p-4 mx-auto">
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <h2 className="text-lg font-bold">Recent Users</h2>
                  <p>Total Users: {totalUsers}</p>
                </div>
                <div>
                  <Button
                    onClick={() => navigate("/dashboard?tab=users")}
                    variant="secondary"
                    className="btn btn-primary"
                  >
                    View All
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-2">
                {users.map((user) => (
                  <li
                    key={user.id}
                    className="border border-slate-400 dark:border-slate-800 rounded-md p-2  shadow-sm text-sm "
                  >
                    {user.username}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Posts Section */}
        <div className="sm:w-1/3 p-4 mx-auto">
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <h2 className="text-lg font-bold">Recent Posts</h2>
                  <p>Total Posts: {totalPosts}</p>
                </div>
                <div>
                  <Button
                    onClick={() => navigate("/dashboard?tab=posts")}
                    variant="secondary"
                    className="btn btn-primary"
                  >
                    View All
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className=" flex flex-col gap-2 ">
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="border border-slate-400 dark:border-slate-800 rounded-md p-2  shadow-sm text-sm "
                  >
                    {post.title}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Comments Section */}
        <div className="sm:w-1/3 p-4 mx-auto">
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <h2 className="text-lg font-bold">Recent Comments</h2>
                  <p>Total Comments: {totalComments}</p>
                </div>
                <div>
                  <Button
                    onClick={() => navigate("/dashboard?tab=comments")}
                    variant="secondary"
                    className="btn btn-primary"
                  >
                    View All
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-2">
                {comments.map((comment) => (
                  <li
                    key={comment.id}
                    className="border border-slate-400 dark:border-slate-800 rounded-md p-2  shadow-sm text-sm "
                  >
                    {comment.content}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Last Month Stats */}
        <div className="sm:w-1/3 p-4 mx-auto">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-bold">Last Month Stats</h2>
            </CardHeader>
            <CardContent>
              <ul>
                <li>Users: {lastMonthUsers}</li>
                <li>Posts: {lastMonthPosts}</li>
                <li>Comments: {lastMonthComments}</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
