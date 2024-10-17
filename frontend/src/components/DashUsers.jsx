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

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [popoverOpen, setPopoverOpen] = useState(null);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (currentUser.isAdmin) {
          const res = await axios.get(`/api/user/getusers`);
          if (res.status === 200) {
            setUsers(res.data.users);
            setShowMore(res.data.users.length >= 9);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [currentUser._id, currentUser.isAdmin]);

  const handleShowMore = async () => {
    try {
      const startIndex = users.length;
      const res = await axios.post(
        `/api/user/getusers?startIndex=${startIndex}`
      );
      if (res.status === 200) {
        setUsers((prev) => [...prev, ...res.data.users]);
        setShowMore(res.data.users.length >= 9);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    console.log("delete user");
    try {
      const res = await axios.delete(`/api/user/delete/${userIdToDelete}`);
      if (res.statusText !== "OK") {
        console.log(res.data.message);
      } else {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setUserIdToDelete(null);
        setPopoverOpen(null);
      }
    } catch (error) {
      console.log(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="mt-3">
      {currentUser.isAdmin && users.length > 0 ? (
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
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className="w-10 h-10 object-cover rounded-full "
                    />
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.isAdmin ? (
                      <Check className="text-blue-700" />
                    ) : (
                      <CircleX />
                    )}
                  </TableCell>
                  <TableCell>
                    <Popover
                      open={popoverOpen === user._id}
                      onOpenChange={(openthis) => {
                        setPopoverOpen(openthis ? user._id : null);
                      }}
                    >
                      <PopoverTrigger asChild>
                        <span
                          onClick={() => {
                            setUserIdToDelete(user._id);
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
                            onClick={handleDeleteUser}
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
