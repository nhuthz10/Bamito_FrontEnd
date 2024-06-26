import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";
import {
  faChevronDown,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { toast } from "react-toastify";
import logo from "../../assets/logo1.png";
import "./Header.scss";
import { logOut } from "../../redux-toolkit/userSlice";
import avatarDefault from "../../assets/default-avatar.png";
import { handleGetAllProductTypeService } from "../../services/productService";
import UserMenu from "../../components/userMenu";
import Search from "../../components/Search/Search";
import { handleChangePage } from "../../redux-toolkit/paginationSlice";
import { USER_MENU } from "../../utils/menu";
import TippyCart from "../../components/TippyCart/TippyCart";

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
    navigate(`/product/${productTypeId}`);
  };

  return (
    <>
      {productTypes.map((item, index) => {
        return (
          <div
            key={index}
            className="product-type-wrapper"
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
  const productCountInCart = useSelector((state) => state.cart?.totalProduct);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const handleClickCart = () => {
    navigate("/user/cart");
  };

  let handleClickSaleOff = () => {
    dispatch(handleChangePage(1));
    navigate("/product/sale-off");
  };

  return (
    <div className="header-container">
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
          <div className="drop-down-menu" tabIndex="-1" {...attrs}>
            <ProductTypesMenu />
          </div>
        )}
      >
        <div className="drop-down-product">
          <span className={`text ${isTippyOn ? "is-tippy-on" : null}`}>
            SẢN PHẨM
          </span>
          <FontAwesomeIcon
            className={`icon ${isTippyOn ? "is-tippy-on" : null}`}
            icon={faChevronDown}
          />
        </div>
      </Tippy>

      <div onClick={handleClickSaleOff} className="btn-sale-off">
        SALE OFF
      </div>

      <Search></Search>

      <div className="header-wrap-cart-actions">
        {login ? (
          <Tippy
            placement="bottom-end"
            interactive
            delay={[0, 100]}
            offset={[-26, 5]}
            render={(attrs) => (
              <div
                className="drop-down-menu"
                tabIndex="-1"
                {...attrs}
                style={{ width: 550, borderRadius: 5 }}
              >
                <TippyCart></TippyCart>
              </div>
            )}
          >
            <div className="header-cart" onClick={handleClickCart}>
              <ShoppingCartOutlinedIcon className="header-cart-icon"></ShoppingCartOutlinedIcon>
              <span className="header-cart-notification">
                {productCountInCart}
              </span>
            </div>
          </Tippy>
        ) : null}

        {login ? (
          <div className="header-actions">
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
              <button className="header-action-btn">
                <img
                  src={avatarUser ? avatarUser : avatarDefault}
                  alt="avt"
                  className="action-avatar"
                  style={{ border: "1px solid var(--primary-color)" }}
                />
              </button>
            </Tippy>
          </div>
        ) : (
          <div className="header-action-btn">
            <Link to="/login" className="login-btn">
              <FontAwesomeIcon icon={faRightToBracket} />
              Đăng nhập
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
