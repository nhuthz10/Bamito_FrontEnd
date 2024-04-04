import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import {
  handleGetAllProductTypeService,
  handleGetProductName,
} from "../../services/productService";
import {
  handleChangePage,
  handleResetPagination,
} from "../../redux-toolkit/paginationSlice";
import { useDispatch } from "react-redux";

import "./breadcrumb.scss";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { handleFilterProduct } from "../../redux-toolkit/productSlice";

function Breadcrumb() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [productTypes, setProductTypes] = useState([]);
  const [productName, setProductName] = useState("");
  let currentLink = "";
  const crumbs = location.pathname.split("/");
  let name = crumbs.find((crumb) => crumb === "product" || crumb === "user");
  let checkHome = false;
  let searchText = useSelector((state) => state.search.searchText);

  useEffect(() => {
    let getAllProductType = async () => {
      try {
        let res = await handleGetAllProductTypeService("", "", "", false);
        if (res && res.errCode === 0) {
          setProductTypes(res?.data);
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
      }
    };
    getAllProductType();
  }, []);

  useEffect(() => {
    let getProductName = async () => {
      let res = await handleGetProductName(crumbs[3]);
      if (res && res.errCode === 0) {
        setProductName(res?.data?.name);
      }
    };
    if (crumbs[3]) {
      getProductName();
    }
  }, [crumbs]);

  const handleClickCrumb = () => {
    dispatch(handleChangePage(1));
    dispatch(handleResetPagination(true));
    dispatch(handleFilterProduct({ brandId: [], price: [0, 10000000] }));
  };

  const displayCrumbs = crumbs.map((crumb, index) => {
    if (crumb === name) return null;
    if (crumb === "" && !checkHome) {
      checkHome = true;
      crumb = "Trang chủ";
      currentLink = "/";
    } else {
      if (crumb === "") return null;
      if (crumb === crumbs[2]) currentLink = `/${name}/${crumb}`;
      if (crumb === crumbs[3]) {
        currentLink = `/${name}/${crumbs[2]}/${crumb}`;
        crumb = productName ? productName : crumb;
      }
      if (crumb === "sale-off") crumb = "Sale Off";
      else if (crumb === "search") crumb = `Tìm kiếm [${searchText}]`;
      else if (crumb === "cart") crumb = "Giỏ hàng";
      else if (crumb === "profile") crumb = "Thông tin người dùng";
      else if (crumb === "orders") crumb = "Lịch sử đơn hàng";
      else if (crumb === "feedback") crumb = "Đánh giá sản phẩm";
      else if (crumb === "favourite") crumb = "Sản phẩm yêu thích";
    }
    productTypes.forEach((productType) => {
      if (productType.productTypeId === crumb) {
        crumb = productType.productTypeName;
      }
    });

    return (
      <div key={index} style={{ display: "flex" }}>
        <Link className="text" to={currentLink} onClick={handleClickCrumb}>
          <span>{crumb}</span>
        </Link>
        {index !== crumbs.length - 1 && (
          <FontAwesomeIcon className="text" icon={faAngleRight} />
        )}
      </div>
    );
  });

  return <div className="breadcrumbsWrapper">{displayCrumbs}</div>;
}

export default Breadcrumb;
