import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { BASE_URL } from "../utils/constants";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photourl, setPhotourl] = useState(user.photourl);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [showError, setShowError] = useState(false);

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, photourl, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setInterval(() => {
        setShowToast(false);
      }, 3000);
      setShowError(false);
    } catch (err) {
      console.log(err);
      setShowError(true);
      setError(err?.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10 ">
        <div className="flex justify-center mx-10">
          <div className="card card-border bg-base-300 w-96 ">
            <div className="card-body">
              <h2 className="card-title justify-center ">Edit Profile</h2>
              <div className="label">
                <span className="label-text">FirstName:</span>
              </div>
              <label className="input validator">
                <input
                  type="firstName"
                  placeholder="Enter your firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <div className="label">
                <span className="label-text">LastName:</span>
              </div>
              <label className="input validator">
                <input
                  type="lastName"
                  placeholder="Enter you lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
              <div className="label">
                <span className="label-text">photo URL:</span>
              </div>
              <label className="input validator">
                <input
                  type="photourl"
                  placeholder="Enter your photo URL"
                  value={photourl}
                  onChange={(e) => setPhotourl(e.target.value)}
                />
              </label>
              <div className="label">
                <span className="label-text">Age:</span>
              </div>
              <label className="input validator">
                <input
                  type="age"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
              <div className="label">
                <span className="label-text">Gender:</span>
              </div>
              <label className="input validator">
                <input
                  type="gender"
                  placeholder="Enter your gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>
              <div className="label">
                <span className="label-text">About:</span>
              </div>
              <label className="input validator">
                <input
                  type="about"
                  placeholder="Enter your about"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>

              <div className="card-actions justify-center ">
                {showError && <p className="text-red-500 m-1">{error}</p>}
                <button className="btn btn-primary flex " onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, age, gender, photourl, about }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile was saveed successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
