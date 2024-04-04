import React, { useEffect } from "react";
import { toast } from "react-toastify";
import "../admin.scss";
import { handleDeleteVoucher } from "../../services/productService";
import {
  fetchAllVoucherRedux,
  loadingAdmin,
} from "../../redux-toolkit/adminSlice";
import { useDispatch } from "react-redux";
import GridData from "../../components/gridData";

function VoucherAdmin() {
  const dispatch = useDispatch();

  const handleDelete = async (voucher) => {
    try {
      dispatch(loadingAdmin(true));
      let res = await handleDeleteVoucher(voucher.id);
      if (res && res.errCode === 0) {
        await dispatch(fetchAllVoucherRedux());
        toast.success("Xóa voucher thành công");
      }
    } catch (err) {
      if (err?.response?.data?.errCode === 2) {
        toast.error("Voucher không tồn tại");
      } else {
        toast.error(err?.response?.data?.message);
      }
    } finally {
      dispatch(loadingAdmin(false));
    }
  };

  const tableColumns = [
    {
      label: "STT",
      key: "",
      style: { borderTopLeftRadius: 15, paddingLeft: "2rem" },
    },
    { label: "MÃ VOUCHER", key: "voucherId" },
    { label: "NGÀY BẮT ĐẦU", key: "timeStart" },
    { label: "NGÀY KẾT THÚC", key: "timeEnd" },
    { label: "MỨC GIẢM", key: "voucherPrice" },
    { label: "SỐ LƯỢNG", key: "quantity" },
    { label: "", key: "", style: { borderTopRightRadius: 15 } },
  ];

  return (
    <GridData
      headerString="Quản lý voucher"
      handleDelete={handleDelete}
      tableColumns={tableColumns}
      gridType="voucher"
    />
  );
}

export default VoucherAdmin;
