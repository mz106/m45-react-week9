import { useState } from "react";
// import useState
import "./AddUser.css";
// import css file

import { addUser } from "../../utils";
// import addUser from utils

const AddUser = ({ user, setUser }) => {
  // Props are passed down from the parent userWrapper component
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // define our state hooks to store username, email and password values from our form

  // This function is called when our below form has been submitted
  const onRegisterSubmit = async (e) => {
    e.preventDefault();// prevent the page from reloading
    console.log(username, email, password);
    // call addUser function from our utils folder, pass the state variables as aurguments into the function
    await addUser(username, email, password);
  };

  return (
    <div className="adduser-wrapper">
      {/* onSubmit will call the onRegisterSubmit function once the button in the form is clicked  */}
      <form className="add-user-form" onSubmit={onRegisterSubmit}>
        <label>
          Username:
          {/* onChange event will up date the state hook everytime something is typed into the input box */}
          <input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Email:
          {/* onChange event will up date the state hook everytime something is typed into the input box */}
          <input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          {/* onChange event will up date the state hook everytime something is typed into the input box */}
          <input
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {/* button with a type of submit, this run the onSubmit event on the form */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default AddUser;
