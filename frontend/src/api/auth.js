import axios from "axios";

export const signup = async (email, password) => {
  try{
  const res = await axios.post(
    "/auth/signup",
    { email, password },
    { withCredentials: true }
  );
  return res.data.accessToken;}
  catch(err){
    throw new Error(err.response?.data?.message||"User already exists");
  }
};


export const login = async (email, password) => {
  try{
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
}catch(err){
  throw new Error(err.response?.data?.message || "Invalid credentials");
}
};


export const verifyEmail = async (token) => {
  const res = await axios.post("/auth/verify-email", { token });
  return res.data;
};