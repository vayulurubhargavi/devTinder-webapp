import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../store/RequestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  console.log(requests, "--requests");
  const fetchRequests = async () => {
    try {
      const requests = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log(requests?.data?.data, "Received Requests");
      dispatch(addRequests(requests?.data?.data));
    } catch (err) {
      console.log("Error fetching requests:", err);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log("Error rejecting request:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) {
    return (
      <div className="text-center my-10">
        <h1 className="text-center text-white text-3xl">No Requests Found</h1>
      </div>
    );
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-center text-white text-3xl">Requests</h1>
      {requests.map((request) => {
        const { firstName, lastName, age, gender, about, photourl } =
          request.fromUserId;
        console.log(request, "requests");
        return (
          <div className="flex justify-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto">
            <div>
              <img
                alt="photo"
                src={photourl}
                className="rounded-full w-20 h-20"
              />
            </div>
            <div className="text-left mx-4 flex-1/2">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && (
                <p>{"Age: " + age + "," + "Gender: " + gender}</p>
              )}
              <p>{about}</p>
            </div>{" "}
            <div className="flex items-center ">
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
