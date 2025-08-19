import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { addFeed } from "../store/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";

const Feed = () => {
  const feedData = useSelector((store) => store.feed);

  const dispatch = useDispatch();
  const fetchFeed = async () => {
    if (feedData) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    feedData && (
      <div>
        <UserCard user={feedData[0]} />
      </div>
    )
  );
};

export default Feed;
