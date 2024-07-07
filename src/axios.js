import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { handleRefershTokenService } from "./services/userService";
import { logOut } from "./redux-toolkit/userSlice";
import { toast } from "react-toastify";
import store from "./redux-toolkit/store";

let isRefreshing = false;
let refreshSubscribers = [];

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export const axiosJWT = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

const subscribeTokenRefresh = async (cb) => {
  refreshSubscribers.push(cb);
  console.log("run subscribeTokenRefresh");
};

const onRefreshed = async (token) => {
  refreshSubscribers.forEach((cb) => cb(token));
  console.log("run onRefreshed");
  refreshSubscribers = [];
};

const refreshToken = async () => {
  isRefreshing = true;
  try {
    const refresh_token = localStorage.getItem("refresh_token");
    const res = await handleRefershTokenService(refresh_token);
    localStorage.setItem("access_token", res.access_token);
    isRefreshing = false;
    console.log("run refreshToken");
    onRefreshed(res.access_token);
  } catch (error) {
    isRefreshing = false;
    console.error("Failed to refresh token", error);
    store.dispatch(logOut());
    toast.error("Phiên đăng nhập đã hết hạn");
  }
};

axiosJWT.interceptors.request.use(
  async (config) => {
    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");

    if (!access_token || !refresh_token) {
      store.dispatch(logOut());
      toast.error("Phiên đăng nhập đã hết hạn");
      return Promise.reject("No tokens available");
    }

    const currentTime = new Date();
    const decoded = jwtDecode(access_token);
    const decodedRefreshToken = jwtDecode(refresh_token);

    if (decoded?.exp < currentTime.getTime() / 1000) {
      if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
        if (!isRefreshing) {
          refreshToken();
        }
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((token) => {
            config.headers["Authorization"] = `Bearer ${token}`;
            resolve(config);
          });
        });
      } else {
        store.dispatch(logOut());
        toast.error("Phiên đăng nhập đã hết hạn");
        return Promise.reject("Refresh token expired");
      }
    } else {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// axiosJWT.interceptors.request.use(
//   async (config) => {
//     let access_token = localStorage.getItem("access_token");
//     let refresh_token = localStorage.getItem("refresh_token");

//     if (!access_token || !refresh_token) {
//       store.dispatch(logOut());
//       toast.error("Phiên đăng nhập đã hết hạn");
//       return Promise.reject("No tokens available");
//     }

//     const currentTime = new Date();
//     const decoded = jwtDecode(access_token);
//     const decodedRefreshToken = jwtDecode(refresh_token);
//     if (decoded?.exp < currentTime.getTime() / 1000) {
//       if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
//         const res = await handleRefershTokenService(refresh_token);
//         localStorage.setItem("access_token", res.access_token);
//         config.headers["Authorization"] = `Bearer ${res.access_token}`;
//       } else {
//         store.dispatch(logOut());
//         toast.error("Phiên bản đăng nhập đã hết hạn");
//         return Promise.reject("Refresh token expired");
//       }
//     } else {
//       config.headers["Authorization"] = `Bearer ${access_token}`;
//     }
//     return config;
//   },
//   (err) => {
//     return Promise.reject(err);
//   }
// );

axiosJWT.interceptors.response.use((response) => {
  return response.data;
});

instance.interceptors.response.use((response) => {
  return response.data;
});

export default instance;
