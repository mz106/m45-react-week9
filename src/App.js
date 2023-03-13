import { useState, useEffect } from "react";

import "./App.css";
import UserWrapper from "./components/userWrapper/UserWrapper";

import { authCheck, getAllUsers } from "./utils";
import { getTokenFromCookie } from "./common";

function App() {
  const [user, setUser] = useState({
    username: null,
    email: null,
    token: null,
  });
  const [users, setUsers] = useState();
  
  // useEffect is run or rerun everytime the page is reloaded
  useEffect(() => {
    // if the browser has a cookie for the website
    if (document.cookie) {
      let token = getTokenFromCookie("jwt_token");
      if (token === false) {
        setUser({
          username: null,
          email: null,
          token: null,
        });
      } else {
        // pass value of the token in and the setUser state hook defined on line 10
        loginInWithToken(token, setUser);
      }
    }
  }, []);

  const loginInWithToken = async (token) => {
    // store return from authCheck function in variable
    const persistantUser = await authCheck(token);
    console.log("ggggggg")
    console.log(persistantUser)

    await setUser(persistantUser.user);
  };

  const logout = (e) => {
    e.preventDefault();
    setUser({
      username: null,
      email: null,
      token: null,
    });
    setUsers(null);
    console.log(document.cookie);
    document.cookie =
      "jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const cookieName = "jwt_token";
    setUsers(await getAllUsers(cookieName));
  };

  return (
    <div className="app-wrapper">
      <h1>Awesome App!</h1>
      {/* setUser is defined as a state hook above in line 15 */}
      <UserWrapper user={user} setUser={setUser} />
      <>
        {/* once a user is logged in display there username in the p tag below */}
        <p>user is {user.username}</p>
      </>
      <>
        {user.token !== null ? (
          <p>{user.username} is logged in</p>
        ) : (
          <p>Not logged in</p>
        )}
      </>
      <form onSubmit={(e) => submitHandler(e)}>
        <button type="submit">getAllUsers</button>
        <button onClick={(e) => logout(e)}>Log out</button>
      </form>
      <>{users ? users.map((user) => <p>{user.username}</p>) : null}</>
    </div>
  );
}

export default App;
