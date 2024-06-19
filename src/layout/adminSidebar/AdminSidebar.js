import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleChangePage } from "../../redux-toolkit/paginationSlice";
import { Link, useLocation } from "react-router-dom";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DescriptionIcon from "@mui/icons-material/Description";
import Person4Icon from "@mui/icons-material/Person4";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import BarChartIcon from "@mui/icons-material/BarChart";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import "./adminSidebar.scss";
import { path } from "../../utils";

const MENU = [
  {
    id: "default",
    value: "Tổng quan",
    icon: BusinessCenterIcon,
    path: path.OVERVIEW_ADMIN,
  },
  {
    id: "product-parent",
    value: "Quản lý sản phẩm",
    icon: ShoppingCartIcon,
    children: [
      {
        id: "product",
        value: "Sản phẩm",
        path: path.PRODUCT_ADMIN,
      },
      {
        id: "product-type",
        value: "Loại sản phẩm",
        path: path.PRODUCT_TYPE_ADMIN,
      },
      {
        id: "product-size",
        value: "Kích cỡ theo loại sản phẩm",
        path: path.PRODUCT_SIZE_ADMIN,
      },
      {
        id: "product-brand",
        value: "Thương hiệu",
        path: path.PRODUCT_BRAND_ADMIN,
      },
    ],
  },
  {
    id: "order-parent",
    value: "Quản lý đơn hàng",
    icon: DescriptionIcon,
    children: [
      {
        id: "order-waiting",
        value: "Đợi xác nhận",
        path: path.ORDER_WAITING_ADMIN,
      },
      {
        id: "order-delivery",
        value: "Đang giao",
        path: path.ORDER_DELIVERY_ADMIN,
      },
      {
        id: "order-done",
        value: "Hoàn tất",
        path: path.ORDER_DONE_ADMIN,
      },
      {
        id: "order-canceled",
        value: "Đã hủy",
        path: path.ORDER_CANCELED_ADMIN,
      },
    ],
  },
  {
    id: "user",
    value: "Quản lý người dùng",
    icon: Person4Icon,
    path: path.USER_ADMIN,
  },
  {
    id: "voucher",
    value: "Quản lý voucher",
    icon: LocalOfferIcon,
    path: path.VOUCHER_ADMIN,
  },
  {
    id: "revenue",
    value: "Báo cáo doanh thu",
    icon: BarChartIcon,
    path: path.REVENUE_ADMIN,
  },
];

function AdminSidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const crumbs = location.pathname.split("/");
  const [selectedItem, setSelectedItem] = useState(crumbs[2] || "default");
  const [selectedProductItem, setSelectedProductItem] = useState(false);
  const [selectedOrderItem, setSelectedOrderItem] = useState(false);

  // useEffect(() => {
  //   const crumb = crumbs.find(
  //     (item) =>
  //       item === "product" ||
  //       item === "product-type" ||
  //       item === "product-size" ||
  //       item === "product-brand"
  //   );
  //   if (crumb) {
  //     setSelectedProductItem(true);
  //   }
  // }, [crumbs]);

  const handleClickMenuItem = (id, path) => {
    dispatch(handleChangePage(1));
    navigate(path);
    setSelectedItem(id);
  };

  const handleClickProductItem = () => {
    setSelectedProductItem(!selectedProductItem);
  };

  const handleClickOrderItem = () => {
    setSelectedOrderItem(!selectedOrderItem);
  };

  return (
    <div className="admin-sidebar-container">
      <div className="menu">
        {MENU.map((item) => {
          const Icon = item.icon;
          var Component = "div";
          var selectedSubItem = null;
          var props = {
            onClick: () => handleClickMenuItem(item.id, item.path),
          };
          if (item.id === "product-parent") {
            Component = "button";
            selectedSubItem = selectedProductItem;
            props = { ...props, onClick: handleClickProductItem };
          } else if (item.id === "order-parent") {
            Component = "button";
            selectedSubItem = selectedOrderItem;
            props = { ...props, onClick: handleClickOrderItem };
          }
          return (
            <div key={item.id}>
              <Component
                to={item.path}
                className={`menu-item-container ${
                  selectedItem === item.id ? "selected" : ""
                }`}
                onClick={props.onClick}
              >
                <div className="menu-item">
                  <Icon className="icon" />
                  <h3 className="text">{item.value}</h3>
                  {item.children && (
                    <KeyboardArrowDownIcon sx={{ fontSize: "3rem" }} />
                  )}
                </div>
              </Component>

              {item.children && selectedSubItem
                ? item.children.map((subItem) => {
                    return (
                      <div
                        // to={subItem.path}
                        key={subItem.id}
                        className={`sub-menu-item-container ${
                          selectedItem === subItem.id ? "selected" : ""
                        }`}
                        onClick={() =>
                          handleClickMenuItem(subItem.id, subItem.path)
                        }
                      >
                        <h3 className="text">{subItem.value}</h3>
                      </div>
                    );
                  })
                : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminSidebar;
