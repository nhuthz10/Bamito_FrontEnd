import axios from "../axios";
import { axiosJWT } from "../axios";

let handleLoginService = (email, password) => {
  return axios.post("/api/user/login", { email: email, password: password });
};

let handleRefershTokenService = async (refresh_token) => {
  return await axios.post(
    `/api/user/refresh-token`,
    {},
    {
      headers: {
        Authorization: `Bearer ${refresh_token}`,
      },
    }
  );
};

let handleGetUserAfterLoginService = async (userId) => {
  return await axiosJWT.get(`/api/user/get-user-infor?userId=${userId}`);
};

let handleRegisterService = (data) => {
  return axios.post("/api/user/register", data);
};

let handleCreateANewUserService = (data) => {
  return axiosJWT.post("/api/user/create-user", data);
};

let handleSendOptService = (email) => {
  return axios.post("/api/user/send-otp-code", { email: email });
};

let handleChangePasswordService = (data) => {
  return axios.put("/api/user/change-password", data);
};

let handleGetInforUserService = (id) => {
  return axiosJWT.get(`/api/user/get-user?id=${id}`);
};

let handleUpdateUser = (data) => {
  return axiosJWT.put("/api/user/update-user", data);
};

let handleChangePasswordProfile = (data) => {
  return axiosJWT.put("/api/user/change-password-profile", data);
};

let handleGetAllUserService = (limit, page, name) => {
  return axiosJWT.get(
    `/api/user/get-all-user?limit=${limit}&page=${page}&name=${name}`
  );
};

let handleDeleteService = (id) => {
  return axiosJWT.delete(`/api/user/delete-user?id=${id}`);
};

let handleGetAllRoleService = () => {
  return axiosJWT.get(`/api/user/get-all-role`);
};

let handleCreateFavourite = (data) => {
  return axiosJWT.post("/api/favourite/create-favourite", data);
};

let handleDeleteFavourite = (userId, productId) => {
  return axiosJWT.delete(
    `/api/favourite/delete-favourite?userId=${userId}&productId=${productId}`
  );
};

let handleGetAllFavourite = (userId) => {
  return axiosJWT.get(`/api/favourite/get-all-favourite?userId=${userId}`);
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
  handleRefershTokenService,
  handleGetUserAfterLoginService,
};
