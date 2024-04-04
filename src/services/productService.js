import axios from "../axios";

let handleGetAllProductTypeService = (limit, page, name, pagination) => {
  return axios.get(
    `/api/product-type/get-all-product-type?limit=${limit}&page=${page}&name=${name}&pagination=${pagination}`
  );
};
let handleCreateProductTypeService = (data) => {
  return axios.post(`/api/product-type/create-product-type`, data);
};

let handleUpdateProductTypeService = (data) => {
  return axios.put(`/api/product-type/update-product-type`, data);
};

let handleDeleteProductTypeService = (id) => {
  return axios.delete(`/api/product-type/delete-product-type?id=${id}`);
};

let handleGetAllBrandService = (limit, page, name, pagination) => {
  return axios.get(
    `/api/brand/get-all-brand?limit=${limit}&page=${page}&name=${name}&pagination=${pagination}`
  );
};
let handleCreateBrandService = (data) => {
  return axios.post(`/api/brand/create-brand`, data);
};

let handleUpdateBrandService = (data) => {
  return axios.put(`/api/brand/update-brand`, data);
};

let handleDeleteBrandService = (id) => {
  return axios.delete(`/api/brand/delete-brand?id=${id}`);
};

let handleGetAllSizeService = (limit, page, name) => {
  return axios.get(
    `/api/size/get-all-size?limit=${limit}&page=${page}&name=${name}`
  );
};
let handleCreateSizeService = (data) => {
  return axios.post(`/api/size/create-size`, data);
};

let handleUpdateSizeService = (data) => {
  return axios.put(`/api/size/update-size`, data);
};

let handleDeleteSizeService = (id) => {
  return axios.delete(`/api/size/delete-size?id=${id}`);
};

let handleGetAllProductService = (limit, page, name) => {
  return axios.get(
    `/api/product/get-all-product?limit=${limit}&page=${page}&name=${encodeURIComponent(
      name
    )}`
  );
};
let handleCreateProductService = (data) => {
  return axios.post(`/api/product/create-product`, data);
};

let handleUpdateProductService = (data) => {
  return axios.put(`/api/product/update-product`, data);
};

let handleDeleteProductService = (id) => {
  return axios.delete(`/api/product/delete-product?id=${id}`);
};
let handleGetProductService = (productId) => {
  return axios.get(`/api/product/get-product?productId=${productId}`);
};

let handleGetAllProductSizeService = (productId, limit, page) => {
  return axios.get(
    `/api/product-size/get-all-product-size?productId=${productId}&limit=${limit}&page=${page}`
  );
};

let handleGetAllProductOfTheProductType = (
  productTypeId,
  limit,
  page,
  sort,
  filter
) => {
  return axios.get(
    `/api/product/get-all-product-of-the-product-type?productTypeId=${productTypeId}&limit=${limit}&page=${page}&sort=${sort}&filter=${filter}`
  );
};

let handleGetAllSizeOfTheProductType = (productTypeId) => {
  return axios.get(
    `/api/size/get-all-size-product-type?productTypeId=${productTypeId}`
  );
};

let handleCreateProductSizeService = (data) => {
  return axios.post(`/api/product-size/create-product-size`, data);
};

let handleDeleteProductSizeService = (id) => {
  return axios.delete(`/api/product-size/delete-product-size?id=${id}`);
};

let handleUpdateProductSizeService = (data) => {
  return axios.put(`/api/product-size/update-product-size`, data);
};

let handleCreateNewVoucher = (data) => {
  return axios.post(`/api/voucher/create-voucher`, data);
};

let handleUpdateVoucherService = (data) => {
  return axios.put(`/api/voucher/update-voucher`, data);
};

let handleDeleteVoucher = (id) => {
  return axios.delete(`/api/voucher/delete-voucher?id=${id}`);
};
let handleGetAllVoucher = (limit, page, pagination) => {
  return axios.get(
    `/api/voucher/get-all-voucher?limit=${limit}&page=${page}&pagination=${pagination}`
  );
};

let hadnleAddProductToCart = (data) => {
  return axios.post(`/api/cart/add-product-to-cart`, data);
};

let handleGetAllProductCart = (cartId) => {
  return axios.get(`/api/cart/get-all-product-cart?cartId=${cartId}`);
};

let handleUpdateProductCartService = (data) => {
  return axios.put("/api/cart/update-product-cart", data);
};

let handleDeleteProductCartService = (cartId, productId, sizeId) => {
  return axios.delete(
    `/api/cart/delete-product-cart?cartId=${cartId}&productId=${productId}&sizeId=${sizeId}`
  );
};

let handleGetAllVoucherUserService = () => {
  return axios.get(`/api/voucher/get-all-voucher-user`);
};

let handleGetPaypalClientId = () => {
  return axios.get("/api/product/get-paypal-id");
};

let handleCreateNewOrderService = (data) => {
  return axios.post("/api/order/create-order", data);
};

let handleGetAllOrderService = (userId, status, limit, page) => {
  return axios.get(
    `/api/order/get-all-order?userId=${userId}&status=${status}&limit=${limit}&page=${page}`
  );
};

let handleGetOrderDetailService = (orderId) => {
  return axios.get(`/api/order/get-order-detail?orderId=${orderId}`);
};

let handleCancleOrderService = (data) => {
  return axios.put(`/api/order/cancle-order`, data);
};

let handleDeliveringOrderService = (orderId) => {
  return axios.put(`/api/order/delivering-order?orderId=${orderId}`);
};

let handleSucceedOrderService = (orderId) => {
  return axios.put(`/api/order/succeed-order?orderId=${orderId}`);
};

let handleDeleteOrderService = (orderId) => {
  return axios.delete(`/api/order/delete-order?orderId=${orderId}`);
};

let handleGetAllOrderAdmin = (status, limit, page) => {
  return axios.get(
    `/api/order/get-all-order-admin?status=${status}&limit=${limit}&page=${page}`
  );
};

let handleGetAllOrderStatistics = () => {
  return axios.get(`/api/order/order-statistics`);
};

let handleGetAllProductFeedback = (userId) => {
  return axios.get(`/api/product/get-product-feedback?userId=${userId}`);
};

let handleCreateFeedbackService = (data) => {
  return axios.post(`/api/feedback/create-feedback`, data);
};

let handleAllFeedbackService = (productId) => {
  return axios.get(`/api/feedback/get-all-feedback?productId=${productId}`);
};

let handleUpdateFeedbackService = (data) => {
  return axios.put(`/api/feedback/update-feedback`, data);
};

let handleDeleteFeedbackService = (id) => {
  return axios.delete(`/api/feedback/delete-feedback?id=${id}`);
};

let handleGetAllProductSaleOffService = (limit, page) => {
  return axios.get(
    `/api/product/get-product-sale-off?limit=${limit}&page=${page}`
  );
};

let handleGetAllProductReport = (timeStart, timeEnd, limit, page) => {
  return axios.get(
    `/api/order/order-report?timeStart=${timeStart}&timeEnd=${timeEnd}&limit=${limit}&page=${page}`
  );
};

let handleGetAllProductFavorute = (limit, page, userId) => {
  return axios.get(
    `/api/product/get-product-favourite?userId=${userId}&limit=${limit}&page=${page}`
  );
};

let handleGetProductName = (productId) => {
  return axios.get(`/api/product/get-product-name?productId=${productId}`);
};

let handlePaymentByVnPayService = (data) => {
  return axios.post(`/api/order/create_payment_url`, data);
};

export {
  handlePaymentByVnPayService,
  handleGetAllOrderStatistics,
  handleGetAllProductTypeService,
  handleCreateProductTypeService,
  handleUpdateProductTypeService,
  handleDeleteProductTypeService,
  handleGetAllBrandService,
  handleCreateBrandService,
  handleUpdateBrandService,
  handleDeleteBrandService,
  handleGetAllSizeService,
  handleCreateSizeService,
  handleUpdateSizeService,
  handleDeleteSizeService,
  handleGetAllProductService,
  handleCreateProductService,
  handleUpdateProductService,
  handleDeleteProductService,
  handleGetProductService,
  handleGetAllProductSizeService,
  handleGetAllSizeOfTheProductType,
  handleCreateProductSizeService,
  handleDeleteProductSizeService,
  handleUpdateProductSizeService,
  handleGetAllProductOfTheProductType,
  handleCreateNewVoucher,
  handleUpdateVoucherService,
  handleDeleteVoucher,
  handleGetAllVoucher,
  hadnleAddProductToCart,
  handleGetAllProductCart,
  handleUpdateProductCartService,
  handleDeleteProductCartService,
  handleGetAllVoucherUserService,
  handleGetPaypalClientId,
  handleCreateNewOrderService,
  handleGetAllOrderService,
  handleGetOrderDetailService,
  handleCancleOrderService,
  handleDeliveringOrderService,
  handleGetAllOrderAdmin,
  handleSucceedOrderService,
  handleDeleteOrderService,
  handleGetAllProductFeedback,
  handleCreateFeedbackService,
  handleAllFeedbackService,
  handleUpdateFeedbackService,
  handleDeleteFeedbackService,
  handleGetAllProductSaleOffService,
  handleGetAllProductReport,
  handleGetAllProductFavorute,
  handleGetProductName,
};
