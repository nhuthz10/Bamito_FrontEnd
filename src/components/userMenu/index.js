import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleChangePage } from "../../redux-toolkit/paginationSlice";
import "./userMenu.scss";

const UserMenu = ({ attrs, handleLogOut, menu, roleId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let handleClickItem = (to) => {
    dispatch(handleChangePage(1));
    navigate(to);
  };

  return (
    <div className="userMenu" tabIndex="-1" {...attrs}>
      {menu.map((item, index) => {
        let line = false;
        if (index === menu.length - 1) {
          line = true;
        }
        if (item.type && item.type === "LOGOUT") {
          return (
            <div key={index}>
              {line && (
                <hr
                  style={{
                    height: 1,
                  }}
                />
              )}
              <div className="userMenuItem" onClick={handleLogOut}>
                <item.icon className="icon" />
                <p className="text">{item.text}</p>
              </div>
            </div>
          );
        } else if (roleId === "R1") {
          return (
            <div key={index}>
              {line && (
                <hr
                  style={{
                    height: 1,
                  }}
                />
              )}
              <div
                onClick={() => handleClickItem(item.to)}
                className="userMenuItem"
              >
                <item.icon className="icon" />
                <p className="text">{item.text}</p>
              </div>
            </div>
          );
        } else if (item.type !== "ADMIN" && roleId === "R2") {
          return (
            <div key={index}>
              {line && (
                <hr
                  style={{
                    height: 1,
                  }}
                />
              )}
              <div
                onClick={() => handleClickItem(item.to)}
                className="userMenuItem"
              >
                <item.icon className="icon" />
                <p className="text">{item.text}</p>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default UserMenu;
