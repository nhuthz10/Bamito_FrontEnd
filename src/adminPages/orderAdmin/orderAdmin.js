import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import "../admin.scss";
import GridData from "../../components/gridData";

function OrderAdmin() {
  const location = useLocation();
  const path = location.pathname.split("/");
  var headerString = null;
  var orderStatus = null;
  if (path[2] === "order-waiting") {
    headerString = "Xác nhận đơn hàng";
    orderStatus = 1;
  } else if (path[2] === "order-delivery") {
    headerString = "Đơn hàng đang giao";
    orderStatus = 2;
  } else if (path[2] === "order-done") {
    headerString = "Đơn hàng đã giao";
    orderStatus = 3;
  } else if (path[2] === "order-canceled") {
    headerString = "Đơn hàng đã hủy";
    orderStatus = 0;
  }

  const tableColumns = [
    {
      label: "STT",
      key: "",
      style: { borderTopLeftRadius: 15, paddingLeft: "2rem" },
    },
    { label: "MÃ ĐƠN HÀNG", key: "orderId" },
    { label: "NGÀY ĐẶT", key: "createdAt" },
    { label: "TỔNG TIỀN", key: "totalPrice" },
    { label: "", key: "", style: { borderTopRightRadius: 15 } },
  ];

  return (
    <GridData
      headerString={headerString}
      orderStatus={orderStatus}
      tableColumns={tableColumns}
      gridType={"order-admin"}
    />
  );
}

export default OrderAdmin;
