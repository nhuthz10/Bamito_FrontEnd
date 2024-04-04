import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProductRedux,
  fetchAllBrandRedux,
  fetchAllProductTypeRedux,
  loadingAdmin,
} from "../../redux-toolkit/adminSlice";
import { handleDeleteProductService } from "../../services/productService";
import "../admin.scss";
import GridData from "../../components/gridData";
import { LIMIT } from "../../utils";

function ProductAdmin() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.pagination.page);

  const handleDeleteProduct = async (product) => {
    try {
      dispatch(loadingAdmin(true));
      let res = await handleDeleteProductService(product.id);
      if (res && res.errCode === 0) {
        await dispatch(fetchAllProductRedux({ limit: LIMIT, page: page }));
        await dispatch(
          fetchAllBrandRedux({
            pagination: false,
          })
        );
        await dispatch(
          fetchAllProductTypeRedux({
            pagination: false,
          })
        );
        toast.success("Xóa sản phẩm thành công");
      }
    } catch (err) {
      if (err.response.data.errCode === 2) {
        toast.error("Sản phẩm không tồn tại");
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
    { label: "MÃ SẢN PHẨM", key: "productId" },
    { label: "TÊN SẢN PHẨM", key: "name" },
    { label: "LOẠI SẢN PHẨM", key: "productTypeData" },
    { label: "ĐƠN GIÁ", key: "price" },
    { label: "GIẢM GIÁ", key: "discount" },
    { label: "", key: "", style: { borderTopRightRadius: 15 } },
  ];

  return (
    <GridData
      tableColumns={tableColumns}
      handleDelete={handleDeleteProduct}
      headerString="Quản lý sản phẩm"
      gridType="product"
    />
  );
}

export default ProductAdmin;
