import axios from "../axios";
import { axiosJWT } from "../axios";

let handleGetAllProductTypeService = (limit, page, name, pagination) => {
  return axios.get(
    `/api/product-type/get-all-product-type?limit=${limit}&page=${page}&name=${name}&pagination=${pagination}`
  );
};

let handleCreateProductTypeService = (data) => {
  return axiosJWT.post(`/api/product-type/create-product-type`, data);
};

let handleUpdateProductTypeService = (data) => {
  return axiosJWT.put(`/api/product-type/update-product-type`, data);
};

let handleDeleteProductTypeService = (id) => {
  return axiosJWT.delete(`/api/product-type/delete-product-type?id=${id}`);
};

let handleGetAllBrandService = (limit, page, name, pagination) => {
  return axios.get(
    `/api/brand/get-all-brand?limit=${limit}&page=${page}&name=${name}&pagination=${pagination}`
  );
};

let handleCreateBrandService = (data) => {
  return axiosJWT.post(`/api/brand/create-brand`, data);
};

let handleUpdateBrandService = (data) => {
  return axiosJWT.put(`/api/brand/update-brand`, data);
};

let handleDeleteBrandService = (id) => {
  return axiosJWT.delete(`/api/brand/delete-brand?id=${id}`);
};

let handleGetAllSizeService = (limit, page, name) => {
  return axiosJWT.get(
    `/api/size/get-all-size?limit=${limit}&page=${page}&name=${name}`
  );
};

let handleCreateSizeService = (data) => {
  return axiosJWT.post(`/api/size/create-size`, data);
};

let handleUpdateSizeService = (data) => {
  return axiosJWT.put(`/api/size/update-size`, data);
};

let handleDeleteSizeService = (id) => {
  return axiosJWT.delete(`/api/size/delete-size?id=${id}`);
};

let handleGetAllProductService = (limit, page, name) => {
  return axios.get(
    `/api/product/get-all-product?limit=${limit}&page=${page}&name=${encodeURIComponent(
      name
    )}`
  );
};

let handleCreateProductService = (data) => {
  return axiosJWT.post(`/api/product/create-product`, data);
};

let handleUpdateProductService = (data) => {
  return axiosJWT.put(`/api/product/update-product`, data);
};

let handleDeleteProductService = (id) => {
  return axiosJWT.delete(`/api/product/delete-product?id=${id}`);
};
let handleGetProductService = (productId) => {
  return axios.get(`/api/product/get-product?productId=${productId}`);
};

let handleGetAllProductSizeService = (productId, limit, page) => {
  return axiosJWT.get(
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
  return axiosJWT.get(
    `/api/size/get-all-size-product-type?productTypeId=${productTypeId}`
  );
};

let handleCreateProductSizeService = (data) => {
  return axiosJWT.post(`/api/product-size/create-product-size`, data);
};

let handleDeleteProductSizeService = (id) => {
  return axiosJWT.delete(`/api/product-size/delete-product-size?id=${id}`);
};

let handleUpdateProductSizeService = (data) => {
  return axiosJWT.put(`/api/product-size/update-product-size`, data);
};

let handleCreateNewVoucher = (data) => {
  return axiosJWT.post(`/api/voucher/create-voucher`, data);
};

let handleUpdateVoucherService = (data) => {
  return axiosJWT.put(`/api/voucher/update-voucher`, data);
};

let handleDeleteVoucher = (id) => {
  return axiosJWT.delete(`/api/voucher/delete-voucher?id=${id}`);
};
let handleGetAllVoucher = (limit, page, pagination) => {
  return axiosJWT.get(
    `/api/voucher/get-all-voucher?limit=${limit}&page=${page}&pagination=${pagination}`
  );
};

let handleGetAllVoucherUserService = () => {
  return axiosJWT.get(`/api/voucher/get-all-voucher-user`);
};

let handleGetAllProductFeedback = (userId) => {
  return axiosJWT.get(`/api/product/get-product-feedback?userId=${userId}`);
};

let handleCreateFeedbackService = (data) => {
  return axiosJWT.post(`/api/feedback/create-feedback`, data);
};

let handleAllFeedbackService = (productId) => {
  return axios.get(`/api/feedback/get-all-feedback?productId=${productId}`);
};

let handleUpdateFeedbackService = (data) => {
  return axiosJWT.put(`/api/feedback/update-feedback`, data);
};

let handleDeleteFeedbackService = (id, userId) => {
  return axiosJWT.delete(
    `/api/feedback/delete-feedback?feedbackId=${id}&userId=${userId}`
  );
};

let handleGetAllProductSaleOffService = (limit, page) => {
  return axios.get(
    `/api/product/get-product-sale-off?limit=${limit}&page=${page}`
  );
};

let handleGetAllProductFavorute = (limit, page, userId) => {
  return axiosJWT.get(
    `/api/product/get-product-favourite?userId=${userId}&limit=${limit}&page=${page}`
  );
};

let handleGetProductName = (productId) => {
  return axios.get(`/api/product/get-product-name?productId=${productId}`);
};

export {
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
  handleGetAllVoucherUserService,
  handleGetAllProductFeedback,
  handleCreateFeedbackService,
  handleAllFeedbackService,
  handleUpdateFeedbackService,
  handleDeleteFeedbackService,
  handleGetAllProductSaleOffService,
  handleGetAllProductFavorute,
  handleGetProductName,
};
