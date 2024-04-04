import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";
import {
  faChevronDown,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

import { toast } from "react-toastify";
import logo from "../../assets/logo1.png";
import styles from "./Header.module.scss";
import { logOut } from "../../redux-toolkit/userSlice";
import avatarDefault from "../../assets/default-avatar.png";
import { handleGetAllProductTypeService } from "../../services/productService";
import UserMenu from "../../components/userMenu";
import Search from "../../components/Search/Search";
import {
  handleChangePage,
  handleResetPagination,
} from "../../redux-toolkit/paginationSlice";
import { USER_MENU } from "../../utils/menu";

const ProductTypesMenu = () => {
  const [productTypes, setProductTypes] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let getAllProductType = async () => {
    try {
      let res = await handleGetAllProductTypeService();
      if (res && res.errCode === 0) {
        setProductTypes(res?.data);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };
  useEffect(() => {
    getAllProductType();
  }, []);

  const handleChangProductType = (productTypeId) => {
    dispatch(handleChangePage(1));
    dispatch(handleResetPagination(true));
    navigate(`/product/${productTypeId}`);
  };

  return (
    <>
      {productTypes.map((item, index) => {
        return (
          <div
            key={index}
            className={styles.productTypeWrapper}
            onClick={() => handleChangProductType(item.productTypeId)}
          >
            <p>{item.productTypeName}</p>
          </div>
        );
      })}
    </>
  );
};

function Header() {
  const [isTippyOn, setIsTippyOn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useSelector((state) => state.user.login);
  const avatarUser = useSelector((state) => state.user.userInfo?.avatar);
  const roleId = useSelector((state) => state.user.userInfo?.roleData?.roleId);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  let handleClickSaleOff = () => {
    dispatch(handleChangePage(1));
    dispatch(handleResetPagination(true));
    navigate("/product/sale-off");
  };

  return (
    <div className={styles.container}>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>

      <Tippy
        onShow={() => {
          setIsTippyOn(true);
        }}
        onHide={() => {
          setIsTippyOn(false);
        }}
        placement="bottom"
        interactive
        delay={[0, 500]}
        offset={[0, 3]}
        render={(attrs) => (
          <div className={styles.dropdownMenu} tabIndex="-1" {...attrs}>
            <ProductTypesMenu />
          </div>
        )}
      >
        <div className={`${styles.dropdownProduct} `}>
          <span
            className={`${styles.text} ${isTippyOn ? styles.isTippyOn : null}`}
          >
            SẢN PHẨM
          </span>
          <FontAwesomeIcon
            className={`${styles.icon} ${isTippyOn ? styles.isTippyOn : null}`}
            icon={faChevronDown}
          />
        </div>
      </Tippy>

      <div
        onClick={handleClickSaleOff}
        className={`${styles.text} ${styles.textHover}`}
      >
        SALE OFF
      </div>

      <Search></Search>

      {login ? (
        <div className={styles.actions}>
          <Tippy
            interactive
            placement="bottom-end"
            delay={[0, 300]}
            render={(attrs) => (
              <UserMenu
                attrs={attrs}
                handleLogOut={handleLogOut}
                menu={USER_MENU}
                roleId={roleId}
              />
            )}
          >
            <button className={styles.actionBtn}>
              <img
                src={avatarUser ? avatarUser : avatarDefault}
                alt="avt"
                className={styles.actionAvatar}
                style={{ border: "1px solid var(--primary-color)" }}
              />
            </button>
          </Tippy>
        </div>
      ) : (
        <div className={styles.actions}>
          <Link to="/login" className={styles.loginBtn}>
            <FontAwesomeIcon icon={faRightToBracket} />
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
