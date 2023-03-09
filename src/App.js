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

  useEffect(() => {
    if (document.cookie) {
      let token = getTokenFromCookie("jwt_token");

      if (token === false) {
        setUser({
          username: null,
          email: null,
          token: null,
        });
      } else {
        loginInWithToken(token, setUser);
      }
    }
  }, []);

  const loginInWithToken = async (token) => {
    const persistantUser = await authCheck(token);

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
      <UserWrapper user={user} setUser={setUser} />
      <>
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
