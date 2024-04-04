import React from "react";
import AdminHeader from "../adminHeader/AdminHeader";
import AdminSidebar from "../adminSidebar/AdminSidebar";
import Loading from "../../components/Loading/Loading";
import { useSelector } from "react-redux";
import "./adminLayout.scss";

function AdminLayout({ children }) {
  const isLoading = useSelector((state) => state.admin.isLoading);
  return (
    <Loading loading={isLoading}>
      <div className="admin-layout-container">
        <AdminHeader />
        <div className="content">
          <AdminSidebar />
          <div className="children">{children}</div>
        </div>
      </div>
    </Loading>
  );
}

export default AdminLayout;
