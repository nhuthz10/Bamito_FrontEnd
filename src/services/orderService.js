import axios from "../axios";

import { axiosJWT } from "../axios";

let handleCreateNewOrderService = (data) => {
  return axiosJWT.post("/api/order/create-order", data);
};

let handleGetAllOrderService = (userId, status, limit, page) => {
  return axiosJWT.get(
    `/api/order/get-all-order?userId=${userId}&status=${status}&limit=${limit}&page=${page}`
  );
};

let handleGetOrderDetailService = (orderId, userId) => {
  return axiosJWT.get(
    `/api/order/get-order-detail?orderId=${orderId}&userId=${userId}`
  );
};

let handleCancleOrderService = (data) => {
  return axiosJWT.put(`/api/order/cancle-order`, data);
};

let handleDeliveringOrderService = (data) => {
  return axiosJWT.put(`/api/order/delivering-order`, data);
};

let handleSucceedOrderService = (data) => {
  return axiosJWT.put(`/api/order/succeed-order`, data);
};

let handleDeleteOrderService = (orderId) => {
  return axiosJWT.delete(`/api/order/delete-order?orderId=${orderId}`);
};

let handleGetAllOrderAdmin = (status, limit, page) => {
  return axiosJWT.get(
    `/api/order/get-all-order-admin?status=${status}&limit=${limit}&page=${page}`
  );
};

let handleGetAllOrderStatistics = () => {
  return axiosJWT.get(`/api/order/order-statistics`);
};

let handleGetAllProductReport = (timeStart, timeEnd, limit, page) => {
  return axiosJWT.get(
    `/api/order/order-report?timeStart=${timeStart}&timeEnd=${timeEnd}&limit=${limit}&page=${page}`
  );
};

let handleGetPaypalClientId = () => {
  return axios.get("/api/product/get-paypal-id");
};

let handlePaymentByVnPayService = (data) => {
  return axiosJWT.post(`/api/order/create_payment_url`, data);
};

export {
  handleGetAllOrderStatistics,
  handleCreateNewOrderService,
  handleGetAllOrderService,
  handleGetOrderDetailService,
  handleCancleOrderService,
  handleDeliveringOrderService,
  handleGetAllOrderAdmin,
  handleSucceedOrderService,
  handleDeleteOrderService,
  handleGetAllProductReport,
  handleGetPaypalClientId,
  handlePaymentByVnPayService,
};
