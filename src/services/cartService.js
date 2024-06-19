import { axiosJWT } from "../axios";

let handleCreatCartService = (data) => {
  return axiosJWT.post("/api/cart/create-cart", data);
};

let hadnleAddProductToCart = (data) => {
  return axiosJWT.post(`/api/cart/add-product-to-cart`, data);
};

let handleGetAllProductCart = (userId) => {
  return axiosJWT.get(`/api/cart/get-all-product-cart?userId=${userId}`);
};

let handleUpdateProductCartService = (data) => {
  return axiosJWT.put("/api/cart/update-product-cart", data);
};

let handleDeleteProductCartService = (productId, sizeId, userId) => {
  return axiosJWT.delete(
    `/api/cart/delete-product-cart?productId=${productId}&sizeId=${sizeId}&userId=${userId}`
  );
};

export {
  handleCreatCartService,
  hadnleAddProductToCart,
  handleGetAllProductCart,
  handleUpdateProductCartService,
  handleDeleteProductCartService,
};
