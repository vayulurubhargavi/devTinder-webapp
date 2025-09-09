import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../store/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      console.log(res);
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log("Error sending request:", err);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-75 shadow-sm ">
        <figure>
          <img src={user.photourl} alt="user-photo" className="w-75 " />
        </figure>
        <div className="card-body">
          <h2 className=" text-center">
            {user.firstName + " " + user.lastName}
          </h2>
          {user.age && user.gender && (
            <p className="text-center">
              {"age:" + user.age + " gender:" + user.gender}
            </p>
          )}
          <p>{user.about}</p>
          <div className="card-actions justify-center mt-2">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", user._id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", user._id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
