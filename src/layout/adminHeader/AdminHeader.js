import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import Tippy from "@tippyjs/react/headless";

import "./adminHeader.scss";
import logo from "../../assets/logo.png";
import avt from "../../assets/default-avatar.png";
import { path } from "../../utils";
import UserMenu from "../../components/userMenu";
import { USER_MENU } from "../../utils/menu";
import { logOut } from "../../redux-toolkit/userSlice";

function AdminHeader() {
  const avatar = useSelector((state) => state.user.userInfo.avatar);
  const userName = useSelector((state) => state.user.userInfo.userName);
  const roleId = useSelector((state) => state.user.userInfo?.roleData?.roleId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOut());
    navigate('/')
  };

  return (
    <div className="admin-header-container">
      <Link to={path.HOME}>
        <img src={logo} alt="bamito" className="logo"></img>
      </Link>
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
        <div className="admin-info">
          <h2 className="admin-name">{userName}</h2>
          <img
            src={avatar ? avatar : avt}
            alt="admin"
            className="admin-avatar"
          />
        </div>
      </Tippy>
    </div>
  );
}

export default AdminHeader;
