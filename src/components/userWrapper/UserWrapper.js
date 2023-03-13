import React from "react";
import "./UserWrapper.css";

import AddUser from "../addUser/AddUser";
import LoginUser from "../loginUser/LoginUser";

// Parent componet for AddUser and LoginUser
const UserWrapper = ({ user, setUser }) => {
  // user and setUser are passed as props into userWrapper from the parent app.js
  return (
    <div className="user-wrapper">
      {/* props are passed into the child components, these originate from app.js */}
      <AddUser user={user} setUser={setUser} />
      <LoginUser user={user} setUser={setUser} />
    </div>
  );
};

export default UserWrapper;
