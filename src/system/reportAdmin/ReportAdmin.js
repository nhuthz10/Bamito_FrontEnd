import React from "react";
import "../admin.scss";
import GridData from "../../components/gridData";

function ReportAdmin() {
  const tableColumns = [
    {
      label: "STT",
      key: "",
      style: { borderTopLeftRadius: 15, paddingLeft: "2rem" },
    },
    { label: "TÊN SẢN PHẨM", key: "name", style: { width: 350 } },
    { label: "KÍCH CỠ", key: "sizeName" },
    { label: "GIÁ", key: "price" },
    { label: "GIẢM GIÁ", key: "discount" },
    { label: "SỐ LƯỢNG", key: "quantity" },
    { label: "TỔNG TIỀN", key: "totalPrice" },
    { label: "NGÀY MUA", key: "time", style: { borderTopRightRadius: 15 } },
  ];

  return (
    <GridData
      tableColumns={tableColumns}
      headerString="Báo cáo doanh thu"
      gridType="report-admin"
    />
  );
}

export default ReportAdmin;
