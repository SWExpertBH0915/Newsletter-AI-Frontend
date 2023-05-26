import axios from "axios";

const API_URL = process.env.REACT_APP_BASEURL + "/auth/";

const register = (
  username,
  email,
  password,
  roles,
  subscriptionId,
  subscriptionStatus
) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    roles,
    subscriptionId,
    subscriptionStatus
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("subscription");
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register,
  login,
  logout
};
