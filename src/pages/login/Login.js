import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  logIn,
  updateFavourites,
  updateCartId,
} from "../../redux-toolkit/userSlice";
import {
  handleLoginService,
  handleCreatCart,
} from "../../services/userService";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { path } from "../../utils";
import { faCheck, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { handleGetUserAfterLoginService } from "../../services/userService";
import image from "../../assets/loginImage.png";
import logo from "../../assets/logo.png";
import styles from "./Login.module.scss";
import { regex } from "../../utils";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [check, setCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCheck = () => {
    setCheck(!check);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      let res = await handleLoginService(data.email, data.password);
      if (res && res.errCode === 0) {
        localStorage.setItem("access_token", res?.access_token);
        localStorage.setItem("refresh_token", res?.refresh_token);

        if (res?.access_token) {
          const decoded = jwtDecode(res?.access_token);
          if (decoded?.id) {
            let useInfor = await handleGetUserAfterLoginService(
              res?.access_token,
              decoded?.id
            );
            if (useInfor?.errCode === 0) {
              dispatch(logIn(useInfor?.user));
              dispatch(updateFavourites(useInfor?.favourites));
              let cartId = await handleCreatCart({
                userId: useInfor?.user?.id,
              });
              dispatch(updateCartId(cartId?.data));
              toast.success("Đăng nhập thành công");
              navigate("/");
            }
          }
        }
      }
    } catch (err) {
      if (err?.response?.data?.errCode === 4) {
        toast.error("Email hoặc mật khẩu không chính xác");
      } else if (err?.response?.data?.errCode === 2) {
        toast.error("Email hoặc mật khẩu không chính xác");
      } else if (err?.response?.data?.errCode === 3) {
        toast.error("Email hoặc mật khẩu không chính xác");
      } else {
        toast.error(err?.response?.data?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Loading loading={isLoading}>
      <div className={styles.page}>
        <div className={styles.container}>
          <img className={styles.imgLogin} src={image} alt="img" />
          <div className={styles.loginForm}>
            <Link to="/" className={styles.nameWrapper}>
              <img src={logo} alt="logo"></img>
              <h1 className={styles.name}>BAMITO</h1>
            </Link>
            <h1 style={{ marginTop: "3rem" }}>XIN CHÀO BẠN 👋</h1>
            <p style={{ fontSize: "1.6rem" }}>
              Nhập email và mật khẩu của bạn để trải nghiệm Bamito nhé
            </p>

            <form onSubmit={handleSubmit(onSubmit)} method="POST">
              <div className={styles.form}>
                <div className={styles.inputWrapper}>
                  <label className={styles.text}>Email</label>
                  <div className={`${styles.input}`}>
                    <input
                      className={styles.text}
                      type="text"
                      autoComplete="username"
                      {...register("email", {
                        required: "Nhập email của bạn",
                        pattern: {
                          value: regex.EMAIL,
                          message: "Email không hợp lệ",
                        },
                      })}
                    />
                  </div>
                  {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div className={styles.inputWrapper}>
                  <label className={styles.text}>Mật khẩu</label>
                  <div className={`${styles.input}`}>
                    <input
                      className={styles.text}
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      {...register("password", {
                        required: "Nhập mật khẩu của bạn",
                        minLength: {
                          value: 8,
                          message: "Tối thiểu 8 ký tự",
                        },
                      })}
                    />
                    <button
                      type="button"
                      className={styles.text}
                      onClick={handleShowPassword}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEye : faEyeSlash}
                        style={{ opacity: "0.5 " }}
                      />
                    </button>
                  </div>
                  {errors.password && <p>{errors.password.message}</p>}
                </div>
              </div>

              <div className={styles.actions}>
                <button
                  type="button"
                  className={`${styles.text} ${styles.checkSaveBtnWrapper}`}
                  onClick={handleCheck}
                >
                  <div className={styles.checkSaveBtn}>
                    {check && <FontAwesomeIcon icon={faCheck} />}
                  </div>
                  <span>Lưu đăng nhập</span>
                </button>
                <Link
                  to={path.FORGOT_PASSWORD}
                  type="button"
                  className={`${styles.text} ${styles.forgotPasswordBtn}`}
                >
                  Quên mật khẩu?
                </Link>
              </div>

              <div className={styles.buttonWrapper1}>
                <button
                  type="submit"
                  className={`${styles.text} ${styles.button1}`}
                >
                  Đăng nhập
                </button>
                <Link
                  to="/register"
                  className={`${styles.text} ${styles.button1}`}
                >
                  Đăng ký
                </Link>
              </div>
            </form>

            <p
              className={`${styles.text}`}
              style={{ marginTop: "5rem", textAlign: "center" }}
            >
              Hoặc đăng nhập với
            </p>
            <div className={styles.buttonWrapper2}>
              <button className={`${styles.text} ${styles.button2}`}>
                Facebook
              </button>
              <button className={`${styles.text} ${styles.button2}`}>
                Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </Loading>
  );
}

export default Login;
