import React from "react";
import { toast } from "react-toastify";
import { handleDeleteProductTypeService } from "../../services/productService";
import {
  fetchAllProductTypeRedux,
  loadingAdmin,
} from "../../redux-toolkit/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import "../admin.scss";
import GridData from "../../components/gridData";
import { LIMIT } from "../../utils";
import { handleChangePage } from "../../redux-toolkit/paginationSlice";

function ProductTypeAdmin() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.pagination.page);
  const totalPage = useSelector(
    (state) => state.admin.allProductType?.totalPage
  );

  const handleDeleteProductType = async (productType, isLast) => {
    try {
      dispatch(loadingAdmin(true));
      let res = await handleDeleteProductTypeService(productType.id);
      if (res && res.errCode === 0) {
        dispatch(
          fetchAllProductTypeRedux({
            limit: LIMIT,
            page: totalPage === page && isLast ? page - 1 : page,
            pagination: true,
          })
        );
        if (totalPage === page && isLast) dispatch(handleChangePage(page - 1));
        toast.success("Xóa loại sản phẩm thành công");
      }
    } catch (err) {
      if (err?.response?.data?.errCode === 2) {
        toast.error("Loại sản phẩm không tồn tại");
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
    { label: "MÃ LOẠI SẢN PHẨM", key: "productTypeId" },
    { label: "TÊN LOẠI SẢN PHẨM", key: "productTypeName" },
    { label: "", key: "", style: { borderTopRightRadius: 15 } },
  ];

  return (
    <GridData
      headerString="Quản lý loại sản phẩm"
      handleDelete={handleDeleteProductType}
      tableColumns={tableColumns}
      gridType={"product-type"}
    />
  );
}

export default ProductTypeAdmin;
