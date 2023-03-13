import { getTokenFromCookie, writeCookie } from "../common";

// export const writeCookie = (key, value, days = 365) => {
//   let date = new Date();
//   date.setDate(date.getDate() + days);

//   const cookie = (document.cookie =
//     key + "=" + value + "; expires=" + date.toGMTString() + "; path=/");
//   console.log("cookie: ", cookie);

//   return cookie;
// };

export const addUser = async (username, email, password) => {
  try {
    // makes request to our register route in our API 
    const response = await fetch("http://localhost/users/register", {
      method: "POST", // HTTP method our route is expecting.  
      // Double check routes file if your unsure
      mode: "cors", // cors added so our API server can except the request
      headers: {
        "Content-Type": "application/json",
      }, // Tells our server I'm sending you JSON in the body of the request
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
      //body of our request the names of the keys must match the model in order for 
      //register to work
    });

    // store response in a varible called data so we can perform front actions on the new users
    // information that was sent in the response from out API
    const data = await response.json()
    console.log("data: ", data);
  } catch (error) {
    console.log(error);
  }
};


export const loginUser = async (username, password, setUser) => {
  try {
    const response = await fetch("http://localhost/users/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();
    console.log(data)
    console.log(data.user.token);
    // setting setUser prop to the user object that has been sent back in the 
    // response from our API
    // data.user = {
    //   username: "user",
    //   email: "email"
    //   token: "token"
    // }
    setUser(data.user);
    // call the writeCookie function to set the cookie in the browser

    writeCookie("jwt_token", data.user.token, 7);
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    const token = getTokenFromCookie("jwt_token");
    // getAllusers is a projected endpoint so we need to get the token from the cookie to pass into the Authorization header below
    const response = await fetch("http://localhost/users/getallusers", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log("getallusers data: ", data);
    return data.users;
  } catch (error) {
    console.log(error);
  }
};

export const authCheck = async (jwtToken) => {
  try {
    const response = await fetch("http://localhost/users/authcheck", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        // we pass the token we got from the cookie
        // _ = to space
        // Bearer_ is best practice way of 
        // sending a token the authorization header of the request
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const data = await response.json();
    data.user.token = jwtToken;
    return data;
  } catch (error) {
    console.log(error);
  }
};
