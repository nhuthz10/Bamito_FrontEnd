import React from "react";
import { toast } from "react-toastify";
import "../admin.scss";
import { handleDeleteBrandService } from "../../services/productService";
import {
  fetchAllBrandRedux,
  loadingAdmin,
} from "../../redux-toolkit/adminSlice";
import { useDispatch } from "react-redux";
import GridData from "../../components/gridData";
import { LIMIT } from "../../utils";
import { useSelector } from "react-redux";

function BrandAdmin() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.pagination.page);

  const handleDeleteBrand = async (brand) => {
    try {
      dispatch(loadingAdmin(true));
      let res = await handleDeleteBrandService(brand.id);
      if (res && res.errCode === 0) {
        await dispatch(
          fetchAllBrandRedux({
            limit: LIMIT,
            page: page,
            pagination: true,
          })
        );
        toast.success("Xóa thương hiệu thành công");
      }
    } catch (err) {
      if (err.response.data.errCode === 2) {
        toast.error("Thương hiệu không tồn tại");
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
    { label: "MÃ THƯƠNG HIỆU", key: "brandId" },
    { label: "TÊN THƯƠNG HIỆU", key: "brandName" },
    { label: "", key: "", style: { borderTopRightRadius: 15 } },
  ];

  return (
    <GridData
      headerString="Quản lý thương hiệu"
      handleDelete={handleDeleteBrand}
      tableColumns={tableColumns}
      gridType={"product-brand"}
    />
  );
}

export default BrandAdmin;
