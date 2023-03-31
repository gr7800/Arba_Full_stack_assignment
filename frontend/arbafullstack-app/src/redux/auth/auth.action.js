import {
  AUTH_LOG_IN_ERROR,
  AUTH_LOG_IN_LOADING,
  AUTH_LOG_IN_SUCCESS,
} from "./auth.type";
//   import Cookies from "js-cookie";

export const authLoginSucc = (payload) => {
  return {
    type: AUTH_LOG_IN_SUCCESS,
    payload,
  };
};

export const authLoginFail = () => {
  return {
    type: AUTH_LOG_IN_ERROR,
  };
};

export const authLoginLoad = () => {
  return {
    type: AUTH_LOG_IN_LOADING,
  };
};

export const signupProcess = async (data) => {
  try {
    let res = await fetch(
      "https://rich-gray-sea-urchin-cuff.cyclic.app/user/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    res = res.json();
    console.log(res);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
