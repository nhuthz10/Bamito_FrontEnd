import React from "react";
import { Route, Routes } from "react-router-dom";
import SaleOff from "../../pages/saleOff/SaleOff";
import Product from "../../pages/product/Product";
import ProductDetail from "../../pages/productDetail/ProductDetail";
import Error from "../../pages/error/Error";
import Search from "../../pages/search/Search";

function ProductRoutes() {
  return (
    <Routes>
      <Route path="sale-off" element={<SaleOff />} />
      <Route path="search" element={<Search />} />
      <Route path=":productTypeId" element={<Product />} />
      <Route path=":productTypeId/:productId" element={<ProductDetail />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default ProductRoutes;
