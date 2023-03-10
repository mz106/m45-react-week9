import { useState } from "react";

import "./App.css";
import UserWrapper from "./components/userWrapper/UserWrapper";

import { getAllUsers } from "./utils";

function App() {
  const [user, setUser] = useState({
    username: null,
    email: null,
    token: null,
  });

  const [users, setUsers] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    setUsers(await getAllUsers());
  };

  return (
    <div className="app-wrapper">
      <h1>Awesome App!</h1>
      <UserWrapper user={user} setUser={setUser} />
      <>
        {user.token ? (
          <p>{user.username} is logged in</p>
        ) : (
          <p>Not logged in</p>
        )}
      </>

      <form onSubmit={(e) => submitHandler(e)}>
        <button type="submit">Get All Users</button>
      </form>

      {users
        ? users.map((user, index) => <p key={user.id}>{user.username}</p>)
        : null}
    </div>
  );
}

export default App;
