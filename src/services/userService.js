import axios from "../axios";

let handleLoginService = (email, password) => {
  return axios.post("/api/user/login", { email: email, password: password });
};
let handleRegisterService = (data) => {
  return axios.post("/api/user/register", data);
};
let handleCreateANewUserService = (data) => {
  return axios.post("/api/user/create-user", data);
};
let handleSendOptService = (email) => {
  return axios.post("/api/user/send-otp-code", { email: email });
};

let handleChangePasswordService = (data) => {
  return axios.put("/api/user/change-password", data);
};

let handleGetInforUserService = (id) => {
  return axios.get(`/api/user/get-user?id=${id}`);
};

let handleUpdateUser = (data) => {
  return axios.put("/api/user/update-user", data);
};

let handleChangePasswordProfile = (data) => {
  return axios.put("/api/user/change-password-profile", data);
};

let handleGetAllUserService = (limit, page, name) => {
  return axios.get(
    `/api/user/get-all-user?limit=${limit}&page=${page}&name=${name}`
  );
};

let handleDeleteService = (id) => {
  return axios.delete(`/api/user/delete-user?id=${id}`);
};

let handleGetAllRoleService = () => {
  return axios.get(`/api/user/get-all-role`);
};

let handleCreateFavourite = (data) => {
  return axios.post("/api/favourite/create-favourite", data);
};

let handleDeleteFavourite = (userId, productId) => {
  return axios.delete(
    `/api/favourite/delete-favourite?userId=${userId}&productId=${productId}`
  );
};

let handleGetAllFavourite = (userId) => {
  return axios.get(`/api/favourite/get-all-favourite?userId=${userId}`);
};

let handleCreatCart = (data) => {
  return axios.post("/api/cart/create-cart", data);
};

export {
  handleLoginService,
  handleRegisterService,
  handleCreateANewUserService,
  handleSendOptService,
  handleChangePasswordService,
  handleGetInforUserService,
  handleUpdateUser,
  handleChangePasswordProfile,
  handleGetAllUserService,
  handleDeleteService,
  handleGetAllRoleService,
  handleCreateFavourite,
  handleDeleteFavourite,
  handleGetAllFavourite,
  handleCreatCart,
};
