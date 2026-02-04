import axios from "axios";

export const signup = async (email, password) => {
  const res = await axios.post(
    "/auth/signup",
    { email, password },
    { withCredentials: true }
  );
  return res.data.accessToken;
};


export const login = async (email, password) => {
  const res = await axios.post(
    "/auth/login",
    {
      email,
      password,
      deviceFingerprint: navigator.userAgent
    },
    { withCredentials: true }
  );
  return res.data.accessToken;
};
