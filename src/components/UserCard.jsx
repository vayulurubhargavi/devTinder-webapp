import React from "react";

const UserCard = ({ user }) => {
  console.log(user.firstName, "---feeeddata");
  //   const { photourl, firstName, lastName, age, gender } = feedData;
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
          <div className="card-actions justify-center mt-2">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
