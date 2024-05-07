import { Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./layout/Layout/Layout";
import Home from "./pages/home/Home";
import ProductRoutes from "./components/productRoutes/ProductRoutes";
import UserRoutes from "./components/userRoutes/UserRoutes";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Error from "./pages/error/Error";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import AdminLayout from "./layout/adminLayout/AdminLayout";
import AdminRoutes from "./components/adminRoutes/AdminRoutes";
import ChangePassword from "./pages/changePassword/ChangePassword";
import { jwtDecode } from "jwt-decode";
import { axiosJWT } from "./axios.js";
import { path } from "./utils";
import { toast } from "react-toastify";
import { logOut } from "./redux-toolkit/userSlice";
import { useDispatch } from "react-redux";
import { handleRefershTokenService } from "./services/userService.js";

function App() {
  const dispatch = useDispatch();

  axiosJWT.interceptors.request.use(
    async (config) => {
      let access_token = localStorage.getItem("access_token");
      let refresh_token = localStorage.getItem("refresh_token");
      const currentTime = new Date();
      const decoded = jwtDecode(access_token);
      const decodedRefreshToken = jwtDecode(refresh_token);
      if (decoded?.exp < currentTime.getTime() / 1000) {
        if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
          const res = await handleRefershTokenService(refresh_token);
          localStorage.setItem("access_token", res.access_token);
          config.headers["Authorization"] = `Bearer ${res.access_token}`;
        } else {
          dispatch(logOut());
          toast.error("Phiên bản đăng nhập đã hết hạn");
        }
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  return (
    <div>
      <Routes>
        <Route
          path={path.ADMIN}
          element={
            <AdminLayout>
              <AdminRoutes />
            </AdminLayout>
          }
        />
        <Route
          path={path.HOME}
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path={path.PRODUCT}
          element={
            <Layout>
              <ProductRoutes />
            </Layout>
          }
        />
        <Route path={path.USER} element={<UserRoutes />} />
        <Route path={path.REGISTER} element={<Register />} />
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={path.CHANGE_PASSWORD} element={<ChangePassword />} />
        <Route path={path.NOT_FOUND} element={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ fontSize: "1.8rem" }}
      />
    </div>
  );
}

export default App;
