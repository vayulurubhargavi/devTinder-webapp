import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../store/connectionsSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const Connections = useSelector((store) => store.connections);
  console.log(Connections, "--connections");
  const fetchConnections = async () => {
    // Logic to fetch connections from the server
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!Connections) return;

  if (Connections.length === 0) {
    return (
      <div className="text-center my-10">
        <h1 className="text-center text-white text-3xl">
          No Connections Found
        </h1>
      </div>
    );
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-center text-white text-3xl">Connections</h1>
      {Connections.map((connection) => {
        const { firstName, lastName, age, gender, about, photourl } =
          connection;

        console.log(connection, "connection");
        return (
          <div className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2">
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
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
