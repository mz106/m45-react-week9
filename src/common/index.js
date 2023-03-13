export const writeCookie = (key, value, days = 365) => {
  //key is the name of the cookie
  //value is the token value
  // days how long the cookie will last for
  // get date time object
  let date = new Date();
  // set the date to a week from when the cookie has been made
  date.setDate(date.getDate() + days);

  const cookie = (document.cookie =
    key + "=" + value + "; expires=" + date.toGMTString() + "; path=/");
  console.log("cookie: ", cookie);

  return cookie;
};

export const getTokenFromCookie = (cookieName) => {
  // find cookie with the name "jwt_token"
  const expression = new RegExp(`(?<=${cookieName}=)[^;]*`);
  console.log(expression);

  try {
    // perform regex expression using the .match method to try and find the cookie 
    // with the name jwt_token in out browser
    const cookie = document.cookie.match(expression)[0]; // will raise type error if cookie not found
    console.log(cookie);
    return cookie;
  } catch {
    // if no cookie is found or doesn't match the cookie name
    console.log("Cookie not found");
  }
};

// module.exports = { writeCookie };
