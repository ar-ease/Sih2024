import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "@/redux/user/userSlice";
import axios from "axios";

const DeleteAccountComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false); // Control popover state
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleDeleteUser = async () => {
    setShowModal(false);

    try {
      dispatch(deleteUserStart());
      const res = await axios.delete(`/api/user/delete/${currentUser._id}`);

      if (res.statusText !== "OK") {
        dispatch(deleteUserFailure(res?.data?.message));
      } else {
        dispatch(deleteUserSuccess(res.data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div>
      <div className="text-red-400 ">
        {/* Trigger for Popover */}
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <span
              className="cursor-pointer"
              onClick={() => setPopoverOpen(true)}
            >
              Delete Account
            </span>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-4 text-center">
            <p>Are you sure you want to delete your account?</p>
            <button
              onClick={() => {
                setShowModal(true);
                setPopoverOpen(false); // Close the popover when modal opens
              }} // This opens the modal
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
            >
              Confirm
            </button>
          </PopoverContent>
        </Popover>
      </div>

      {/* Modal that appears when showModal is true */}
      {showModal && (
        <div className="modal-container">
          <div className="modal">
            <h2 className="text-xl font-bold">Delete Account</h2>
            <p>Are you absolutely sure you want to delete your account?</p>
            <div className="mt-4">
              <button
                onClick={() => {
                  setShowModal(false);
                }}
                className="mr-4 bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccountComponent;
