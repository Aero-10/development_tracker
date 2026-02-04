import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
});

let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      const refreshRes = await axios.post("/auth/refresh", {}, { withCredentials: true });
      setAccessToken(refreshRes.data.accessToken);
      err.config.headers.Authorization = `Bearer ${refreshRes.data.accessToken}`;
      return axios(err.config);
    }
    return Promise.reject(err);
  }
);

export default api;