import axios from "../axios";
import { axiosJWT } from "../axios";

let handleLoginService = (email, password) => {
  return axios.post(
    "/api/user/login",
    { email: email, password: password },
    {
      withCredentials: true,
    }
  );
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

let handleGetUserAfterLoginService = async (access_token, userId) => {
  return await axios.get(`/api/user/get-user-infor?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

let handleRegisterService = (data) => {
  return axios.post("/api/user/register", data);
};

let handleCreateANewUserService = (data, access_token) => {
  return axiosJWT.post("/api/user/create-user", data, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

let handleSendOptService = (email) => {
  return axios.post("/api/user/send-otp-code", { email: email });
};

let handleChangePasswordService = (data) => {
  return axios.put("/api/user/change-password", data);
};

let handleGetInforUserService = (id, access_token) => {
  return axiosJWT.get(`/api/user/get-user?id=${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

let handleUpdateUser = (data, access_token) => {
  return axiosJWT.put("/api/user/update-user", data, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

let handleChangePasswordProfile = (data, access_token) => {
  return axiosJWT.put("/api/user/change-password-profile", data, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

let handleGetAllUserService = (limit, page, name, access_token) => {
  return axiosJWT.get(
    `/api/user/get-all-user?limit=${limit}&page=${page}&name=${name}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
};

let handleDeleteService = (id, access_token) => {
  return axiosJWT.delete(`/api/user/delete-user?id=${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

let handleGetAllRoleService = (access_token) => {
  return axiosJWT.get(`/api/user/get-all-role`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
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
  handleRefershTokenService,
  handleGetUserAfterLoginService,
};
