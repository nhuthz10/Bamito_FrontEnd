import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux/es/hooks/useSelector";
import "./ModalChangePassword.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { handleChangePasswordProfile } from "../../services/userService";
import { toast } from "react-toastify";

const ModalChangePassword = ({ open, handleCloseModal, setIsOpen }) => {
  const [checkPassword, setCheckPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const userId = useSelector((state) => state.user.userInfo.id);

  const handleChangePassword = async (data) => {
    setCheckPassword(false);
    try {
      let access_token = localStorage.getItem("access_token");
      let res = await handleChangePasswordProfile(
        {
          id: userId,
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
        access_token
      );
      if (res && res.errCode === 0) {
        toast.success("Thay đổi mật khẩu thành công");
        setValue("currentPassword", "");
        setValue("newPassword", "");
        setValue("comfirmPassword", "");
        setIsOpen(false);
      }
    } catch (err) {
      if (err?.response?.data?.errCode === 1) {
        toast.error("Thiếu tham số bắt buộc");
      } else if (err?.response?.data?.errCode === 2) {
        toast.error("Người dùng không tồn tại");
      } else if (err?.response?.data?.errCode === 3) {
        toast.error("Mật khẩu hiện tại không đúng");
      } else if (err?.response?.data?.errCode === 4) {
        toast.error("Mật khẩu mới trùng với mật khẩu hiện tại của bạn");
      } else {
        toast.error(err?.response?.data?.message);
      }
    }
  };

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <div className="modal-content">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="modal-close-icon"
          onClick={handleCloseModal}
        ></FontAwesomeIcon>

        <h3
          style={{
            fontSize: "var(--title-fontSize)",
            textAlign: "center",
            margin: "10px 0",
          }}
        >
          Thay đổi mật khẩu
        </h3>

        <div className="textbox">
          <div className="wrap-input">
            <p>Nhập mật khẩu hiện tại</p>
            <input
              className="changepassword-textbox"
              type="password"
              {...register("currentPassword", {
                required: "Nhập mật khẩu hiện tại của bạn",
              })}
            />
            {errors.currentPassword && (
              <p className="error">{errors.currentPassword.message}</p>
            )}
          </div>
          <div className="wrap-input">
            <p>Nhập mật khẩu mới</p>
            <input
              className="changepassword-textbox"
              type="password"
              {...register("newPassword", {
                required: "Nhập mật khẩu mới của bạn",
                minLength: {
                  value: 8,
                  message: "Tối thiểu 8 ký tự",
                },
              })}
            />
            {errors.newPassword && (
              <p className="error">{errors.newPassword.message}</p>
            )}
          </div>
          <div className="wrap-input">
            <p>Nhập lại mật khẩu mới</p>
            <input
              className="changepassword-textbox"
              type="password"
              {...register("comfirmPassword", {
                required: "Nhập lại mật khẩu mới của bạn",
                validate: {
                  isCheckPass: (value) => {
                    if (getValues("newPassword") !== value) {
                      return "Mật khẩu không trùng khớp";
                    }
                  },
                },
              })}
            />
            {errors.comfirmPassword && (
              <p className="error">{errors.comfirmPassword.message}</p>
            )}
          </div>
        </div>

        <div className="submit_btn">
          <button onClick={handleSubmit(handleChangePassword)}>Cập nhật</button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalChangePassword;
