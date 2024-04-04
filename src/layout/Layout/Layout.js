import React from "react";
import { useLocation } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

import styles from "./Layout.module.scss";
import Loading from "../../components/Loading/Loading";
import { useSelector } from "react-redux";
const Layout = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const loading = useSelector((state) => state.product.isLoading);

  return (
    <Loading loading={loading}>
      <div className={styles.wrapper}>
        <Header />
        {!isHome ? <Breadcrumb /> : null}
        <div className={styles.children}>{children}</div>
        <Footer />
      </div>
    </Loading>
  );
};

export default Layout;
