export const addUser = async (username, email, password) => {
  try {
    const response = await fetch("http://localhost/users/register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });

    const data = await response.json();
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
    console.log(data);

    setUser(data.user);
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async (user) => {
  try {
    const response = await fetch("http://localhost/users/getallusers", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
    });

    const data = await response.json();
    return data.users;
  } catch (error) {
    console.log(error);
  }
};
