import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import PostCard from "@/components/PostCard";
import DashSidebar from "@/components/DashSidebar";

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate(); // Using useNavigate for navigation

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (searchTermUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        searchTerm: searchTermUrl || "",
        sort: sortFromUrl || "desc",
        category: categoryFromUrl || "uncategorized",
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      try {
        const res = await axios.get(`/api/post/getposts?${searchQuery}`);
        if (res.status === 200) {
          setPosts(res.data.posts);
          setLoading(false);
          setShowMore(res.data.posts.length === 9); // Checking actual API response, not data from autoprefixer
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [location.search]);

  const handleSortChange = (value) => {
    setSidebarData({ ...sidebarData, sort: value });
  };

  const handleCategoryChange = (value) => {
    setSidebarData({ ...sidebarData, category: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`); // Correctly using navigate
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    console.log(numberOfPosts);
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await axios.get(`/api/post/getposts?${searchQuery}`);
    if (res.status !== 200) {
      return;
    }
    if (res.status === 200) {
      setPosts([...posts, ...res.data.posts]);
      if (res.data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <div className="md:min-h-screen pt-28 flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r border-slate-600">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label>SearchTerm</label>
            <Input
              type="text"
              name="searchTerm"
              placeholder="Search..."
              id="searchTerm"
              value={sidebarData.searchTerm}
              onChange={(e) =>
                setSidebarData({ ...sidebarData, searchTerm: e.target.value })
              }
              className="w-52"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Sort</label>
            <Select onValueChange={handleSortChange} value={sidebarData.sort}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Newest</SelectItem>
                <SelectItem value="asc">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Category</label>
            <Select
              value={sidebarData.category}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue>
                  {DashSidebar.category ? DashSidebar.category : "Not selected"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="noCategory">No category</SelectItem>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="text-center bg-violet-600">
            Apply filters
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className=" text-3xl font-semibold  text-center pb-7    ">
          Posts Result
        </h1>
        <div className="p-7">
          {!loading &&
            posts.length === 0 && ( // Show "No posts found" only when loading is false and there are no posts
              <p className="text-xl text-gray-500">No posts found</p>
            )}
          {loading && <p className="text-xl text-gray-500">Loading...</p>}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            {posts &&
              posts.length > 0 &&
              posts.map((post) => <PostCard key={post.id} post={post} />)}
          </div>

          {showMore && (
            <Button
              onClick={handleShowMore}
              className="text-center bg-violet-600 w-full"
            >
              Show More
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
