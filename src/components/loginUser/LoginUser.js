import { useState } from "react";
import "./LoginUser.css";

import { loginUser } from "../../utils";
//The code here is near enough identical to the addUser componet apart from wording

const LoginUser = ({user, setUser}) => {
  // state is passed from parent userWrapper.js
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);
    //setUser prop passed into loginUser
    await loginUser(username, password, setUser);
  };

  return (
    <div className="loginuser-wrapper">
      <form className="login-user-form" onSubmit={onLoginSubmit}>
        <label>
          Username:
          <input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginUser;
