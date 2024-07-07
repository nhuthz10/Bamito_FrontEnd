import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Error from "../../pages/error/Error";
import OverView from "../../system/orverView/OverView";
import { path } from "../../utils";
import UserAdmin from "../../system/userAdmin/userAdmin";
import SizeAdmin from "../../system/sizeAdmin/sizeAdmin";
import ProductTypeAdmin from "../../system/productTypeAdmin/productTypeAdmin";
import BrandAdmin from "../../system/brandAdmin/brandAdmin";
import ProductAdmin from "../../system/productAdmin/productAdmin";
import UserPost from "../../system/userAdmin/UserPost";
import ProductTypePost from "../../system/productTypeAdmin/ProductTypePost";
import SizePost from "../../system/sizeAdmin/SizePost";
import BrandPost from "../../system/brandAdmin/brandPost";
import ProductPost from "../../system/productAdmin/ProductPost";
import ProductSizeAdmin from "../../system/productAdmin/productSizeAdmin";
import ProductSizePost from "../../system/productAdmin/ProductSizePost";
import VoucherAdmin from "../../system/voucherAdmin/VoucherAdmin";
import VoucherPost from "../../system/voucherAdmin/VoucherPost";
import OrderAdmin from "../../system/orderAdmin/orderAdmin";
import OrderPost from "../../system/orderAdmin/orderPost";
import ReportAdmin from "../../system/reportAdmin/ReportAdmin";
import { useSelector } from "react-redux";

function AdminRoutes() {
  const navigate = useNavigate();
  const login = useSelector((state) => state.user.login);
  useEffect(() => {
    if (!login) {
      navigate(path.HOME);
    }
  }, [login, navigate]);
  return (
    <Routes>
      <Route path={path.OVERVIEW_ADMIN} element={<OverView />} />
      <Route path={path.PRODUCT_ADMIN} element={<ProductAdmin />} />
      <Route path={path.PRODUCT_TYPE_ADMIN} element={<ProductTypeAdmin />} />
      <Route path={path.PRODUCT_BRAND_ADMIN} element={<BrandAdmin />} />
      <Route path={path.PRODUCT_SIZE_ADMIN} element={<SizeAdmin />} />
      <Route path={path.USER_ADMIN} element={<UserAdmin />} />
      <Route path={path.VOUCHER_ADMIN} element={<VoucherAdmin />} />
      <Route path={path.REVENUE_ADMIN} element={<ReportAdmin />} />
      <Route path={path.ORDER_WAITING_ADMIN} element={<OrderAdmin />} />
      <Route path={path.ORDER_DELIVERY_ADMIN} element={<OrderAdmin />} />
      <Route path={path.ORDER_DONE_ADMIN} element={<OrderAdmin />} />
      <Route path={path.ORDER_CANCELED_ADMIN} element={<OrderAdmin />} />
      <Route path={path.ORDER_DETAIL} element={<OrderPost />} />
      <Route
        path={`${path.USER_ADMIN}/${path.POST_ADMIN}`}
        element={<UserPost />}
      />
      <Route
        path={`${path.USER_ADMIN}/${path.PUT_ADMIN}`}
        element={<UserPost />}
      />
      <Route
        path={`${path.PRODUCT_TYPE_ADMIN}/${path.POST_ADMIN}`}
        element={<ProductTypePost />}
      />
      <Route
        path={`${path.PRODUCT_TYPE_ADMIN}/${path.PUT_ADMIN}`}
        element={<ProductTypePost />}
      />
      <Route
        path={`${path.PRODUCT_SIZE_ADMIN}/${path.POST_ADMIN}`}
        element={<SizePost />}
      />
      <Route
        path={`${path.PRODUCT_SIZE_ADMIN}/${path.PUT_ADMIN}`}
        element={<SizePost />}
      />
      <Route
        path={`${path.PRODUCT_BRAND_ADMIN}/${path.POST_ADMIN}`}
        element={<BrandPost />}
      />
      <Route
        path={`${path.PRODUCT_BRAND_ADMIN}/${path.PUT_ADMIN}`}
        element={<BrandPost />}
      />
      <Route
        path={`${path.PRODUCT_ADMIN}/${path.POST_ADMIN}`}
        element={<ProductPost />}
      />
      <Route
        path={`${path.PRODUCT_ADMIN}/${path.PUT_ADMIN}`}
        element={<ProductPost />}
      />
      <Route
        path={`${path.PRODUCT_ADMIN}/${path.PRODUCT_PRODUCTSIZE_ADMIN}`}
        element={<ProductSizeAdmin />}
      />
      <Route
        path={`${path.PRODUCT_ADMIN}/${path.PRODUCT_PRODUCTSIZE_ADMIN}/${path.POST_ADMIN}`}
        element={<ProductSizePost />}
      />
      <Route
        path={`${path.PRODUCT_ADMIN}/${path.PRODUCT_PRODUCTSIZE_ADMIN}/${path.PUT_ADMIN}`}
        element={<ProductSizePost />}
      />
      <Route
        path={`${path.VOUCHER_ADMIN}/${path.POST_ADMIN}`}
        element={<VoucherPost />}
      />
      <Route
        path={`${path.VOUCHER_ADMIN}/${path.PUT_ADMIN}`}
        element={<VoucherPost />}
      />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default AdminRoutes;
