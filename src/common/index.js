export const writeCookie = (key, value, days = 365) => {
  // key is what we want the name of the cookie to be in this "jwt_token"
  // value in this case is our jwt token returned in the response of our back-end API  
  // but the value can be anything we want it to be
  // days is how long we want the cookie to last for, the default is 365 if no parameter is passed when the
  // function is called
  
  let date = new Date();
  // Create a date time object
  date.setDate(date.getDate() + days);
  // Set the date to a week from when the cookie has been made using the date time object

  // Use the document mode to set the cookie in the browser using the key, value and days 
  // the format is important along with the semi colons
  const cookie = (document.cookie =
    key + "=" + value + "; expires=" + date.toGMTString() + "; path=/");
  console.log("cookie: ", cookie);

  // return the cookie value once it's been created above
  return cookie;
};

export const getTokenFromCookie = (cookieName) => {
  // A regular expression (shortened as regex or regexp; 
  // sometimes referred to as rational expression) is a sequence of characters that specifies 
  // a match pattern in text.
  
  // In this case we are using a regular expression to try find the a cookie name with the cookie with name we 
  // have passed to the function, in this case the cookie name we are trying to find is jwt_token
  const expression = new RegExp(`(?<=${cookieName}=)[^;]*`);
  console.log(expression);
  try {
    // Use the .match method to try and find a cookie using the regex expression on line 30
    const cookie = document.cookie.match(expression)[0]; // will raise type error if cookie not found
    console.log(cookie);
    // return the cookie from the browser if .match finds a cookie with the correct name
    return cookie;
  } catch {
    // if line 34 raises a type error, the below will log in the console and the function will stop
    console.log("Cookie not found");
  }
};

// module.exports = { writeCookie };
