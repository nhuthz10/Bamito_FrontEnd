import { Route, Routes } from "react-router-dom";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./layout/Layout/Layout";
import Home from "./pages/home/Home";
import ProductRoutes from "./routers/productRoutes/ProductRoutes.js";
import UserRoutes from "./routers/userRoutes/UserRoutes.js";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Error from "./pages/error/Error";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import AdminLayout from "./layout/adminLayout/AdminLayout";
import AdminRoutes from "./routers/adminRoutes/AdminRoutes.js";
import ChangePassword from "./pages/changePassword/ChangePassword";
import { path } from "./utils";

function App() {
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
