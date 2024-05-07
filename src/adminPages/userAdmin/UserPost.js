import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { Button, TextField, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useLocation, useNavigate } from "react-router-dom";
import { loadingAdmin } from "../../redux-toolkit/adminSlice";
import { path as path_constant, regex } from "../../utils";
import {
  handleCreateANewUserService,
  handleUpdateUser,
} from "../../services/userService";
import "../admin.scss";
import { useDispatch } from "react-redux";

function UserPost() {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { state, pathname } = useLocation();
  const { data, rolesData } = state || {};
  const path = pathname.split("/");
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setValue("username", data.userName);
      setValue("email", data.email);
      setValue("phone", data.phoneNumber);
      setValue("address", data.deliveryAddressData?.address);
      setValue("roleId", data.roleData?.roleId);
    }
  }, [data, setValue]);

  const onSubmit = async (dataSubmit) => {
    if (path[3] === "create") {
      try {
        dispatch(loadingAdmin(true));
        let access_token = localStorage.getItem("access_token");
        let res = await handleCreateANewUserService(
          {
            email: dataSubmit.email,
            userName: dataSubmit.username,
            password: dataSubmit.password,
            phoneNumber: dataSubmit.phone,
            address: dataSubmit.address,
            roleId: dataSubmit.roleId,
          },
          access_token
        );
        if (res && res.errCode === 0) {
          toast.success("Thêm khách hàng thành công");
          setValue("username", "");
          setValue("email", "");
          setValue("phone", "");
          setValue("address", "");
          setValue("roleId", "");
          setValue("password", "");

          navigate(`/admin/${path_constant.USER_ADMIN}`);
        }
      } catch (err) {
        if (err?.response?.data?.errCode === 2) {
          toast.error("Email người dùng đã tồn tại");
        } else if (err?.response?.data?.errCode === 3) {
          toast.error("Số điện thoại người dùng đã tồn tại");
        } else {
          toast.error(err?.response?.data?.message);
        }
      } finally {
        dispatch(loadingAdmin(false));
      }
    } else if (path[3] === "edit") {
      try {
        dispatch(loadingAdmin(true));
        let access_token = localStorage.getItem("access_token");
        let res = await handleUpdateUser(
          {
            id: data.id,
            email: dataSubmit.email,
            userName: dataSubmit.username,
            password: dataSubmit.password,
            phoneNumber: dataSubmit.phone,
            address: dataSubmit.address,
            roleId: dataSubmit.roleId,
          },
          access_token
        );
        if (res && res.errCode === 0) {
          toast.success("Cập nhật thông tin người dùng thành công");
          navigate(`/admin/${path_constant.USER_ADMIN}`);
        }
      } catch (err) {
        if (err?.response?.data?.errCode === 2) {
          toast.error("Người dùng không tồn tại");
        } else if (err?.response?.data?.errCode === 3) {
          toast.error("Email đã tồn tại");
        } else if (err?.response?.data?.errCode === 4) {
          toast.error("Tên người dùng đã tồn tại");
        } else if (err?.response?.data?.errCode === 5) {
          toast.error("SĐT người dùng đã tồn tại");
        } else {
          toast.error(err?.response?.data?.message);
        }
      } finally {
        dispatch(loadingAdmin(true));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="Modal-Add">
      <h2 className="header-text">
        {path[3] === "create" ? "Thêm người dùng" : "Sửa thông tin người dùng"}
      </h2>
      <div className="modal-add-input">
        <p className="label">Tên</p>
        <Controller
          control={control}
          name="username"
          rules={{
            required: "Nhập tên người dùng",
            pattern: {
              value: regex.USERNAME,
              message: "Tên người dùng không hợp lệ",
            },
          }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              error={errors.username ? true : false}
              variant="filled"
              hiddenLabel
              inputProps={{ className: "text-field-text" }}
              className="text-field"
            />
          )}
        />
        {errors.username && (
          <p className="error-message">{errors.username.message}</p>
        )}
      </div>
      <div className="modal-add-input">
        <p className="label">Email</p>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Nhập email người dùng",
            pattern: {
              value: regex.EMAIL,
              message: "Email người dùng không hợp lệ",
            },
          }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              error={errors.email ? true : false}
              variant="filled"
              hiddenLabel
              inputProps={{ className: "text-field-text" }}
              className="text-field"
            />
          )}
        />
        {errors.email && (
          <p className="error-message">{errors.email.message}</p>
        )}
      </div>
      <div className="modal-add-input">
        <p className="label">Quyền hạn</p>
        <Controller
          control={control}
          name="roleId"
          rules={{
            required: "Chọn quyền hạn người dùng",
          }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              error={errors.roleId ? true : false}
              select
              variant="filled"
              hiddenLabel
              inputProps={{ className: "text-field-text" }}
              SelectProps={{
                IconComponent: () => (
                  <ArrowDropDownIcon
                    style={{
                      fontSize: "3.5rem",
                    }}
                  />
                ),
              }}
              className="text-field"
            >
              {rolesData &&
                rolesData.length > 0 &&
                rolesData.map((option) => (
                  <MenuItem
                    key={option.roleId}
                    value={option.roleId}
                    style={{
                      fontSize: "var(--text-fontSize)",
                    }}
                  >
                    {option.roleId === "R1" ? "Quản trị viên" : "Khách hàng"}
                  </MenuItem>
                ))}
            </TextField>
          )}
        />
        {errors.roleId && (
          <p className="error-message">{errors.roleId.message}</p>
        )}
      </div>
      <div className="modal-add-input">
        <p className="label">Mật khẩu</p>
        <Controller
          control={control}
          name="password"
          rules={{
            ...(path[3] === "create"
              ? { required: "Nhập mật khẩu người dùng" }
              : {}),
            minLength: {
              value: 8,
              message: "Tối thiểu 8 ký tự",
            },
          }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              error={errors.password ? true : false}
              variant="filled"
              hiddenLabel
              inputProps={{ className: "text-field-text" }}
              className="text-field"
            />
          )}
        />
        {errors.password && (
          <p className="error-message">{errors.password.message}</p>
        )}
      </div>
      <div className="modal-add-input">
        <p className="label">Số điện thoại</p>
        <Controller
          control={control}
          name="phone"
          rules={{
            required:
              path[3] === "create" ? "Nhập số điện thoại người dùng" : null,
            pattern: {
              value: regex.PHONE,
              message: "Số điện thoại không hợp lệ",
            },
          }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              error={errors.phone ? true : false}
              variant="filled"
              hiddenLabel
              inputProps={{ className: "text-field-text" }}
              className="text-field"
            />
          )}
        />
        {errors.phone && (
          <p className="error-message">{errors.phone.message}</p>
        )}
      </div>
      <div className="modal-add-input">
        <p className="label">Địa chỉ</p>
        <Controller
          control={control}
          name="address"
          rules={{
            required: path[3] === "create" ? "Nhập địa chỉ người dùng" : null,
          }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              error={errors.address ? true : false}
              variant="filled"
              hiddenLabel
              inputProps={{ className: "text-field-text" }}
              className="text-field"
            />
          )}
        />
        {errors.address && (
          <p className="error-message">{errors.address.message}</p>
        )}
      </div>

      <Button type="submit" variant="contained" className="btn">
        {path[3] === "create" ? "Thêm" : "Cập nhật"}
      </Button>
    </form>
  );
}

export default UserPost;
