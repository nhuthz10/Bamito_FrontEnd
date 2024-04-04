import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { useForm, Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  handleGetInforUserService,
  handleUpdateUser,
} from "../../services/userService";
import dayjs from "dayjs";
import defaultAvt from "../../assets/default-avatar.png";
import ModalChangePassword from "./ModalChangePassword";
import "./profile.scss";
import { regex } from "../../utils";
import { updateAvatar } from "../../redux-toolkit/userSlice";
import { useDispatch } from "react-redux";
import { loadingProduct } from "../../redux-toolkit/productSlice";

function Profile() {
  const [avatar, setAvatar] = useState(defaultAvt);
  const [fileAvatar, setFileAvatar] = useState(null);
  const [oldFileAvatar, setOldFileAvatar] = useState(null);
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.userInfo?.id);
  const roleId = useSelector((state) => state.user.userInfo?.roleData?.roleId);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  let getInforUser = async () => {
    dispatch(loadingProduct(true));
    try {
      let res = await handleGetInforUserService(userId);
      if (res && res.errCode === 0) {
        setName(res?.data?.userName);
        setValue("email", res?.data?.email);
        setValue("userName", res?.data?.userName);
        setValue("phone", res?.data?.phoneNumber);
        res?.data?.deliveryAddressData?.length > 0
          ? setValue("address", res?.data?.deliveryAddressData[0])
          : setValue("address", "");
        if (res?.data?.birthday)
          setValue("birth", dayjs(new Date(+res?.data?.birthday)));
        if (res?.data?.avatar) {
          setAvatar(res?.data?.avatar);
          dispatch(updateAvatar(res?.data?.avatar));
        }
      }
    } catch (err) {
      if (err?.response?.data?.errCode === 1) {
        toast.error("Thiếu tham số bắt buộc");
      } else if (err?.response?.data?.errCode === 2) {
        toast.error("Người dùng không tồn tại");
      } else {
        toast.error(err?.response?.data?.message);
      }
    } finally {
      dispatch(loadingProduct(false));
    }
  };

  useEffect(() => {
    if (userId) getInforUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleCloseModalChangePassword = () => {
    setIsOpen(!isOpen);
  };

  const handleChangeAvatar = async (e) => {
    let file = e.target.files[0];
    setFileAvatar(file);
    if (file) {
      let objUrl = URL.createObjectURL(file);
      setAvatar(objUrl);
    }
  };

  const onSubmit = async (data) => {
    dispatch(loadingProduct(true));
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("userName", data.userName);
      formData.append("roleId", roleId);
      formData.append("id", userId);
      formData.append("phoneNumber", data.phone);
      formData.append("address", data.address);
      formData.append("birthday", data.birth.$d.getTime());

      if (fileAvatar && fileAvatar !== oldFileAvatar) {
        formData.append("avatar", fileAvatar);
      }
      let res = await handleUpdateUser(formData);
      if (res && res.errCode === 0) {
        setOldFileAvatar(fileAvatar);
        getInforUser();
        toast.success("Cập nhật thành công");
      }
    } catch (err) {
      if (err?.response?.data?.errCode === 1) {
        toast.error("Thiếu tham số bắt buộc");
      } else if (err?.response?.data?.errCode === 2) {
        toast.error("User không tồn tại");
      } else if (err?.response?.data?.errCode === 3) {
        toast.error("Email đã tồn tại");
      } else if (err?.response?.data?.errCode === 4) {
        toast.error("Tên người dùng đã tồn tại");
      } else if (err?.response?.data?.errCode === 5) {
        toast.error("Số điện thoại đã tồn tại");
      } else {
        toast.error(err?.response?.data?.message);
      }
    } finally {
      dispatch(loadingProduct(true));
    }
  };

  return (
    <div className="user-page">
      <div className="user-container">
        <div className="username">
          <div className="img-round">
            <img src={avatar} alt="avt" id="image" />
            <label htmlFor="image-upload">
              <FontAwesomeIcon className="upload-icon" icon={faSquarePlus} />
            </label>
            <input
              type="file"
              id="image-upload"
              onChange={(e) => handleChangeAvatar(e)}
            />
          </div>

          <h1 style={{ marginLeft: "4rem" }}>{name}</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} /*method="POST"*/>
          <div className="btn-pageuser">
            <button
              className="btn-change"
              onClick={() => {
                setIsOpen(true);
              }}
              type="button"
            >
              <i className="fa-solid fa-wrench"></i>
              Đổi mật khẩu
            </button>

            <button
              className="btn-change"
              style={{ marginLeft: "2rem" }}
              type="submit"
            >
              <i className="fa-solid fa-wrench"></i>
              Cập nhật
            </button>
          </div>

          <div className="user-info-container">
            <div className="user-info-element">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="user-info-input"
                id="email"
                readOnly
                {...register("email", {
                  required: "Nhập email của bạn",
                  pattern: {
                    value: regex.EMAIL,
                    message: "Email không hợp lệ",
                  },
                })}
              ></input>
              {errors.email && (
                <p className="user-info-error">{errors.email.message}</p>
              )}
            </div>
            <div className="user-info-element">
              <label htmlFor="userName">Họ và tên</label>
              <input
                type="text"
                className="user-info-input"
                id="userName"
                {...register("userName", {
                  required: "Nhập tên của bạn",
                  pattern: {
                    value: regex.USERNAME,
                    message: "Tên không hợp lệ",
                  },
                })}
              />
              {errors.userName && (
                <p className="user-info-error">{errors.userName.message}</p>
              )}
            </div>
            <div className="user-info-element">
              <label htmlFor="phone">Số điện thoại</label>
              <input
                className="user-info-input"
                id="phone"
                {...register("phone", {
                  required: "Nhập số điện thoại của bạn",
                  pattern: {
                    value: regex.PHONE,
                    message: "Số điện thoại không hợp lệ",
                  },
                })}
              />
              {errors.phone && (
                <p className="user-info-error">{errors.phone.message}</p>
              )}
            </div>
            <div className="user-info-element">
              <label htmlFor="address">Địa chỉ</label>
              <div className="user-info-address">
                <input
                  type="text"
                  className="user-info-input"
                  id="address"
                  {...register("address", {
                    required: "Nhập địa chỉ của bạn",
                  })}
                />
              </div>
              {errors.address && (
                <p className="user-info-error">{errors.address.message}</p>
              )}
            </div>
            <div className="user-info-element">
              <label htmlFor="birth">Ngày sinh</label>
              <Controller
                render={({ field: { onChange, onBlur, value, ref } }) => {
                  return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        className="date-picker"
                        id="birth"
                        {...register("birth", {
                          required: "Chọn ngày sinh của bạn",
                        })}
                        format="DD/MM/YYYY"
                        maxDate={dayjs(new Date())}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value ? value : null}
                      />
                    </LocalizationProvider>
                  );
                }}
                control={control}
                name="birth"
                rules={{
                  required: "Chọn ngày sinh của bạn",
                }}
              />
              {errors.birth && (
                <p className="user-info-error">{errors.birth.message}</p>
              )}
            </div>
          </div>
        </form>
      </div>
      <ModalChangePassword
        open={isOpen}
        setIsOpen={setIsOpen}
        handleCloseModal={handleCloseModalChangePassword}
      ></ModalChangePassword>
    </div>
  );
}
export default Profile;
