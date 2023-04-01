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

export const signupUser = async (data) => {
  try {
    let res = await fetch(
      "https://lazy-rose-dhole-cap.cyclic.app/user/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    res = await res.json();
    alert(res.message);
    if (res.message === "User has register Successfully !") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updatepassword = async (data) => {
  try {
    let res = await fetch(
      "https://lazy-rose-dhole-cap.cyclic.app/user/updatepassword",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "token":localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      }
    );
    res = await res.json();
    console.log(res);
    alert(res.message);
    if (res.message === "Password updated successfully") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const updateProfilePictureandName = async (data) => {
  try {
    let res = await fetch(
      "https://lazy-rose-dhole-cap.cyclic.app/user/profileupdate",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "token":localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      }
    );
    res = await res.json();
    console.log(res);
    if (res.message === 'Profile updated successfully') {
      alert("Profile Updated Sucessfully please login again to see the changes!")
      return true;
    } else {
      alert(res.message);
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const loginUser = (data) => async (dispatch) => {
  dispatch(authLoginLoad());
  try {
    let res = await fetch(
      "https://lazy-rose-dhole-cap.cyclic.app/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    res = await res.json();
    console.log(res);
    if (res.message === "Login successful") {
      dispatch(authLoginSucc(res));
      localStorage.setItem("token", res.token);
      localStorage.setItem("userres", JSON.stringify(res));
      return true;
    } else {
      dispatch(authLoginFail());
      alert(res.message);
      return false;
    }
  } catch (error) {
    dispatch(authLoginFail());
    return false;
  }
};

export const useralreadylogin = (res) => async (dispatch) => {
  try {
    dispatch(authLoginSucc(res));
    return true
  } catch (error) {
    return false
  }
}

export const logout = () => async (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("userres");
  localStorage.removeItem("term_condition");
  dispatch(authLoginFail());
}

