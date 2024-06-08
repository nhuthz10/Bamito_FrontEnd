import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { toast } from "react-toastify";
import { handleRegisterService } from "../../services/userService";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import image from "../../assets/loginImage.png";
import logo from "../../assets/logo.png";
import { regex } from "../../utils";

const Input = ({
  errors,
  register,
  label,
  type,
  name,
  validation,
  autocomplete,
  err,
  value,
  onChange,
  checkpassword,
}) => {
  if (register) {
    var props = {
      ...register(name, validation),
      autoComplete: autocomplete,
    };
  } else {
    props = {
      autoComplete: autocomplete,
      onChange: onChange,
      err: err,
      checkpassword: checkpassword,
    };
  }

  return (
    <div className="register-input-wrapper">
      <label className="register-input-lable">{label}</label>
      <div className="register-input">
        <input
          style={{ fontSize: "var(--text-fontSize)" }}
          type={type}
          {...props}
          value={value}
        />
      </div>
      {errors && <ErrorMessage errors={errors} name={name} as="p" />}
      {props.checkpassword === false && <p>{props.err}</p>}
    </div>
  );
};

function Register() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [firstClickRegister, setFirstClickRegister] = useState(false);

  const navigate = useNavigate();

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    if (firstClickRegister) {
      password === confirmPassword && password !== ""
        ? setCheckPassword(true)
        : setCheckPassword(false);
    }
  }, [confirmPassword, firstClickRegister, password]);

  const handleCheckPassword = (e) => {
    password === confirmPassword && password !== ""
      ? setCheckPassword(true)
      : setCheckPassword(false);
    setFirstClickRegister(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (checkPassword) {
      setIsLoading(true);
      try {
        let res = await handleRegisterService({
          email: data.email,
          userName: data.userName,
          password: data.password,
          roleId: "R2",
        });

        if (res && res.errCode === 0) {
          toast.success(
            "Vui lòng kiểm tra email của bạn. Để kịch hoạt tài khoản"
          );
        }
        navigate("/login");
      } catch (err) {
        if (err.response.data.errCode === 2) {
          toast.error("Email của bạn đã tồn tại");
        } else {
          toast.error(err.response.data.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Loading loading={isLoading}>
      <div className="register-container">
        <div className="register-content">
          <div className="register-content-left">
            <Link to="/" className="logo-wrapper">
              <img src={logo} alt="logo"></img>
              <h1 className="logo-name">BAMITO</h1>
            </Link>

            <form method="POST" onSubmit={handleSubmit(onSubmit)}>
              <div className="register-form">
                <Input
                  register={register}
                  errors={errors}
                  label="Tên của bạn"
                  type="text"
                  name="userName"
                  validation={{
                    required: "Nhập tên của bạn",
                    maxLength: {
                      value: 35,
                      message: "Tối đa 35 ký tự",
                    },
                    pattern: {
                      value: regex.USERNAME,
                      message: "Tên không hợp lệ",
                    },
                  }}
                ></Input>
                <Input
                  register={register}
                  errors={errors}
                  label="Email"
                  type="text"
                  name="email"
                  validation={{
                    required: "Nhập email của bạn",
                    pattern: {
                      value: regex.EMAIL,
                      message: "Email không hợp lệ",
                    },
                  }}
                  autocomplete="username"
                ></Input>
                <Input
                  register={register}
                  errors={errors}
                  label="Mật khẩu"
                  type="password"
                  name="password"
                  validation={{
                    required: "Nhập mật khẩu của bạn",
                    minLength: {
                      value: 8,
                      message: "Tối thiểu 8 ký tự",
                    },
                    onChange: handlePassword,
                  }}
                  autocomplete="new-password"
                  value={password}
                ></Input>
                <Input
                  label="Xác nhận mật khẩu"
                  type="password"
                  autocomplete="new-password"
                  err="Xác nhận lại mật khẩu"
                  onChange={handleConfirmPassword}
                  value={confirmPassword}
                  checkpassword={checkPassword}
                ></Input>
              </div>
              <div
                className="register-actions"
                style={{ justifyContent: "flex-end" }}
              >
                <Link to="/login" className="link-had-account">
                  Đã có tài khoản!
                </Link>
              </div>
              <div className="wrapper-button-register">
                <button
                  type="submit"
                  className="button-register"
                  onClick={handleCheckPassword}
                >
                  Đăng ký
                </button>
              </div>
            </form>
          </div>
          <div className="register-content-right">
            <img src={image} alt="img"></img>
          </div>
        </div>
      </div>
    </Loading>
  );
}

export default Register;
