import React from "react";
import { useLocation } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

import "./Layout.scss";
import Loading from "../../components/Loading/Loading";
import { useSelector } from "react-redux";
const Layout = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const loading = useSelector((state) => state.product.isLoading);

  return (
    <Loading loading={loading}>
      <div className="layout-container">
        <Header />
        {!isHome ? <Breadcrumb /> : null}
        <div className="layout-content">{children}</div>
        <Footer />
      </div>
    </Loading>
  );
};

export default Layout;
