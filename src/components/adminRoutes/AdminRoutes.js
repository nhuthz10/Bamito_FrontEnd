import React from "react";
import { Route, Routes } from "react-router-dom";

import Error from "../../pages/error/Error";
import OverView from "../../adminPages/orverView/OverView";
import { path } from "../../utils";
import UserAdmin from "../../adminPages/userAdmin/userAdmin";
import SizeAdmin from "../../adminPages/sizeAdmin/sizeAdmin";
import ProductTypeAdmin from "../../adminPages/productTypeAdmin/productTypeAdmin";
import BrandAdmin from "../../adminPages/brandAdmin/brandAdmin";
import ProductAdmin from "../../adminPages/productAdmin/productAdmin";
import UserPost from "../../adminPages/userAdmin/UserPost";
import ProductTypePost from "../../adminPages/productTypeAdmin/ProductTypePost";
import SizePost from "../../adminPages/sizeAdmin/SizePost";
import BrandPost from "../../adminPages/brandAdmin/brandPost";
import ProductPost from "../../adminPages/productAdmin/ProductPost";
import ProductSizeAdmin from "../../adminPages/productAdmin/productSizeAdmin";
import ProductSizePost from "../../adminPages/productAdmin/ProductSizePost";
import VoucherAdmin from "../../adminPages/voucherAdmin/VoucherAdmin";
import VoucherPost from "../../adminPages/voucherAdmin/VoucherPost";
import OrderAdmin from "../../adminPages/orderAdmin/orderAdmin";
import OrderPost from "../../adminPages/orderAdmin/orderPost";
import ReportAdmin from "../../adminPages/reportAdmin/ReportAdmin";

function AdminRoutes() {
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
